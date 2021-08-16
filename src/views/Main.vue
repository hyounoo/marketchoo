<template>
  <main class="wrap-main">
    <!-- 관리자에서 불러온 메인배너(상단) -->
    <div class="wrap-main__banner">
      <a href="#bannerTarget" class="link">
        <v-img
          lazy-src="https://picsum.photos/id/11/12/6.webp?random=1"
          src="https://picsum.photos/id/11/1200/600.webp?random=1"
          max-width="100%"
          max-height="600"
        ></v-img>
      </a>
    </div>

    <!-- Best상품 타이틀 영역 -->
    <div class="wrap-title">
      <div class="left box"></div>
      <h2 class="title-value">Market Choo Best</h2>
      <div class="right box">
        <a href="#더보기" class="more">더보기</a>
      </div>
    </div>

    <!-- 상품 아이템 영역 -->
    <div class="wrap-items">
      <!-- 아래 props들은 UI를 위해 임시로 지정했을뿐 실제로 불필요시 제거해주세요 -->
      <div v-if="posts.length">
        <div v-for="post in posts" :key="post.id" class="post">
          <Item 
            v-bind:id="post.id"
            v-bind:title="post.title"
            v-bind:content="post.content"
            v-bind:likes="post.likes"
            >
          </Item>
        </div>
      </div>
      <div v-else>
        <p class="no-results">There are currently no posts</p>
      </div>
    </div>
  </main>
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