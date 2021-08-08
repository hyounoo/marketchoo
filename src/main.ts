import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { auth } from './firebase'
import { firestorePlugin } from 'vuefire'

Vue.config.productionTip = false
Vue.use(firestorePlugin)

let app: Vue
auth.onAuthStateChanged((user) => {
  if (user) {
    store.dispatch('fetchUserProfile', user)
  }
  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App)
    }).$mount('#app')
  }
})
