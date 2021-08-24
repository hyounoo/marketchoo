<template>
  <!-- 상품 아이템 영역 -->
  <div class="wrap-items" v-if="posts.length">
    <Item 
      v-for="post in posts" 
      :key="post.id"
      v-bind:id="post.id"
      v-bind:title="post.title"
      v-bind:content="post.content"
      v-bind:likes="post.likes"
    >
    </Item>
  </div>
  <div class="wrap-items" v-else>
    <p class="no-results">There are currently no posts</p>
  </div>
</template>

<script>
import { commentsCollection } from '@/firebase'
import { mapState } from 'vuex'
import Item from "@/components/Item";
import moment from 'moment'
import CommentModal from '@/components/CommentModal'

export default {
  components: {
    Item,
  },
  data: () => ({
    post: {
        content: ''
      },
      showCommentModal: false,
      selectedPost: {},
      showPostModal: false,
      fullPost: {},
      postComments: []
  }),
  computed: {
    ...mapState(['userProfile', 'posts'])
  },
  methods: {
    createPost() {
      this.$store.dispatch('createPost', { content: this.post.content })
      this.post.content = ''
    },
    toggleCommentModal(post) {
      this.showCommentModal = !this.showCommentModal

      // if opening modal set selectedPost, else clear
      if (this.showCommentModal) {
        this.selectedPost = post
      } else {
        this.selectedPost = {}
      }
    },
    likePost(id, likesCount) {
      this.$store.dispatch('likePost', { id, likesCount })
    },
    async viewPost(post) {
      const docs = await commentsCollection.where('postId', '==', post.id).get()

      docs.forEach(doc => {
        let comment = doc.data()
        comment.id = doc.id
        this.postComments.push(comment)
      })

      this.fullPost = post
      this.showPostModal = true
    },
    closePostModal() {
      this.postComments = []
      this.showPostModal = false
    }
  },
  filters: {
    formatDate(val) {
      if (!val) { return '-' }

      let date = val.toDate()
      return moment(date).fromNow()
    },
    trimLength(val) {
      if (val.length < 200) { return val }
      return `${val.substring(0, 200)}...`
    }
  }
}
</script>

<style>

</style>