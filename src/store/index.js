import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase/app'
import * as fb from '../firebase'
import router from '../router/index'

Vue.use(Vuex)

// TODO: change this to role based authentication using firestore auth api
const admins = ['hyounoosung@gmail.com', 'good617boy@gmail.com', 'odeng96@gmail.com']

// realtime firebase
fb.postsCollection.orderBy('createdOn', 'desc').onSnapshot(snapshot => {
  let postsArray = []

  snapshot.forEach(doc => {
    let post = doc.data()
    post.id = doc.id

    postsArray.push(post)
  })

  store.commit('setPosts', postsArray)
})

fb.postsCollection.orderBy('likes', 'desc').limit(8).onSnapshot(snapshot => {
  let postsArray = []

  snapshot.forEach(doc => {
    let post = doc.data()
    post.id = doc.id

    postsArray.push(post)
  })

  store.commit('setBestPosts', postsArray)
})

const store = new Vuex.Store({
  state: {
    isAdmin: false,
    userProfile: {},
    posts: [],
    bestPosts: []
  },
  mutations: {
    setIsAdmin(state, val) {
      state.isAdmin = val
    },
    setUserProfile(state, val) {
      state.userProfile = val
    },
    setPerformingRequest(state, val) {
      state.performingRequest = val
    },
    setPosts(state, val) {
      state.posts = val
    },
    setBestPosts(state, val) {
      state.bestPosts = val
    }
  },
  actions: {
    async login({ dispatch }, form) {
      // sign user in
      const { user } = await fb.auth.signInWithEmailAndPassword(form.email, form.password)

      // fetch user profile and set in state
      dispatch('fetchUserProfile', user)
    },
    async signup({ dispatch }, form) {
      // sign user up
      const { user } = await fb.auth.createUserWithEmailAndPassword(form.email, form.password)

      // create user object in userCollections
      await fb.usersCollection.doc(user.uid).set({
        name: form.name,
        title: form.title
      })

      // fetch user profile and set in state
      dispatch('fetchUserProfile', user)
    },
    async googleSignIn({ commit }, form) {
      const provider = new firebase.auth.GoogleAuthProvider()
      provider.addScope('profile');
      provider.addScope('email');
      var result = await fb.auth.signInWithPopup(provider)
      
      // log user out
      // await fb.auth.signOut()      
    },
    async fetchUserProfile({ commit, dispatch }, user) {
      // check isAdmin
      const currentUserEmail = await fb.auth.currentUser.email
      if (admins.includes(currentUserEmail)) {
        commit('setIsAdmin', true)
      }

      // fetch user profile
      const userProfile = await fb.usersCollection.doc(user.uid).get()

      console.log('userProfile.data(): ', userProfile.data())
      if (userProfile.data() !== undefined) {
        // set user profile in state
        commit('setUserProfile', userProfile.data())

        // change route to dashboard
        if (router.currentRoute.path === '/login') {
          router.push('/')
        }
      } else {
        console.log('should create a user')
        // create user object in userCollections
        await fb.usersCollection.doc(user.uid).set({
          name: '',
          title: ''
        })

        // fetch user profile and set in state
        dispatch('fetchUserProfile', user)
      }
    },
    async logout({ commit }) {
      // log user out
      await fb.auth.signOut()

      // clear user data from state
      commit('setUserProfile', {})

      // redirect to login view
      router.push('/login')
    },
    async createPost({ state, commit }, post) {
      // create post in firebase
      await fb.postsCollection.add({
        createdOn: new Date(),
        title: post.title,
        content: post.content,
        userId: fb.auth.currentUser.uid,
        userName: state.userProfile.name,
        comments: 0,
        likes: 0
      })
    },
    async likePost ({ commit }, post) {
      const userId = fb.auth.currentUser.uid
      const docId = `${userId}_${post.id}`

      // check if user has liked post
      const doc = await fb.likesCollection.doc(docId).get()
      if (doc.exists) { return }

      // create post
      await fb.likesCollection.doc(docId).set({
        postId: post.id,
        userId: userId
      })

      // update post likes count
      fb.postsCollection.doc(post.id).update({
        likes: post.likesCount + 1
      })
    },
    async updateProfile({ dispatch }, user) {
      const userId = fb.auth.currentUser.uid
      // update user object
      const userRef = await fb.usersCollection.doc(userId).update({
        name: user.name,
        title: user.title
      })

      dispatch('fetchUserProfile', { uid: userId })

      // update all posts by user
      const postDocs = await fb.postsCollection.where('userId', '==', userId).get()
      postDocs.forEach(doc => {
        fb.postsCollection.doc(doc.id).update({
          userName: user.name
        })
      })

      // update all comments by user
      const commentDocs = await fb.commentsCollection.where('userId', '==', userId).get()
      commentDocs.forEach(doc => {
        fb.commentsCollection.doc(doc.id).update({
          userName: user.name
        })
      })
    }
  }
})

export default store
