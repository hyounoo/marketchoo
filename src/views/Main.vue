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
        <a href="/products" class="more">더보기</a>
      </div>
    </div>

    <!-- 상품 아이템 영역 -->
    <div class="wrap-items" v-if="bestPosts">
      <Item 
        v-for="post in bestPosts" 
        :key="post.id"
        v-bind:id="post.id"
        v-bind:title="post.title"
        v-bind:content="post.content"
        v-bind:likes="post.likes"
        v-bind:comments="post.comments"
      >
      </Item>
    </div>
    <div class="wrap-items" v-else>
      <p class="no-results">There are currently no posts</p>
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
    Item
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
    ...mapState(['userProfile', 'bestPosts'])
  },
  methods: {    
    likePost(id, likesCount) {
      this.$store.dispatch('likePost', { id, likesCount })
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