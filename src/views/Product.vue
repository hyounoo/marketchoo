<template>
  <v-card class="product-item mx-auto theme--light" elevation="0" max-width="100%" tile>
    <!-- <v-img
      lazy-src="https://picsum.photos/seed/picsum/12/6"
      src="https://picsum.photos/seed/picsum/1200/600"
      max-width="100%"
      max-height="600"
    ></v-img> -->
    <v-row>

    <v-img
      :lazy-src="imgItem"
      :src="imgItem"
      max-width="100%"
      max-height="600"
    ></v-img>
    </v-row>

    <v-row class="mt-4 mb-4" justify="space-between" no-gutters>
      <v-card-text class="col-xs-12 col-lg-10">
        <h2 class="text-h6 primary--text">리얼진짜 정.공.법. 선크림</h2>
        <p>적폐의 자외선으로부터 적폐의 자외선으로부터 적폐의 자외선으로부터 민생을 지켜드립니다!</p>
        <v-row align="center" class="mx-0 mt-0 mb-1">
          <v-rating
            :value="3.5"
            color="amber"
            size="16"
            dense
            half-increments
            readonly
          ></v-rating>

          <div class="grey--text text-caption mt-1 ml-2"><strong>3.5</strong> (4건)</div>
        </v-row>
      </v-card-text>

      <v-card-actions class="col-xs-12 col-lg-2">

        <v-dialog
          v-model="dialog"
          scrollable
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              class="col-xs-8"
              color="primary"
              style="min-width: auto !important;"
              block depressed tile>
              <v-icon left>mdi-shopping</v-icon>
              바로구매
            </v-btn>
          </template>
          <v-card>
            <v-card-title>상품 배송 받기</v-card-title>
            <v-divider></v-divider>
            <v-card-text style="margin-top: 20px;max-height: 70vh;">
              <p>마켓추의 상품을 배달해 드립니다.</p>
              <p>마음껏 공유해주세요!</p>

              <v-alert class="mb-2" color="#2A3B4D" dark icon="mdi-firework" dense>
                https://marketchoo.com/product/243
              </v-alert>
              <div>
                <v-btn elevation="0" color="primary" block large>
                  <v-icon class="mr-1">mdi-content-copy</v-icon>
                  주소 복사하기
                </v-btn>
              </div>
              <div>
                <v-btn>페이스북 공유하기</v-btn>
                <v-btn>카카오톡 공유하기</v-btn>
              </div>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-btn icon x-large>
          <!-- Before - 좋아요 -->
          <v-icon>mdi-heart</v-icon>

          <!-- After - 좋아요 -->
          <!-- <v-icon color="red">mdi-heart</v-icon> -->
        </v-btn>
      </v-card-actions>
    </v-row>

    <!-- 상세정보 -->
    <div v-if="productInfo">
      <div id="productDetail" v-if="post">
        <h3 class="text-h6">상세정보</h3>
        <!-- <h3 class="text-h6">{{ post.title }}</h3> -->
        <v-divider class="mb-3"></v-divider>

        <!-- Admin에서 등록한 Youtube URL Embed -->
        <div class="contents-youtube">
          <!-- 등록된 youtube URL 갯수만큼 .wrap-iframe에 감싸서 노출 -->
          <div class="wrap-iframe">
            <iframe
              src="https://www.youtube.com/embed/PeJSII7H3IM"
              frameborder="0"
              width="100%"
              allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture" 
              allowfullscreen>
            </iframe>
          </div>

          <div class="wrap-iframe">
            <iframe
              src="https://www.youtube.com/embed/QMIhj_pBQ7Q?start=2240"
              frameborder="0"
              width="100%"
              allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture" 
              allowfullscreen>
            </iframe>
          </div>
        </div>

        <!-- Admin에서 등록한 HTML 컨텐츠(wsywig 에디터에서 작성된 HTML태그?) -->
        <div class="contents-html">
          {{ post.content }}
          <div style="text-align: center;"><img src="@/assets/img/temp/airport1.png" alt=""></div>
          <div style="text-align: center;"><img src="@/assets/img/temp/airport2.png" alt=""></div>
          <div style="text-align: center;"><img src="@/assets/img/temp/airport3.png" alt=""></div>
          <div style="text-align: center;"><img src="@/assets/img/temp/airport4.png" alt=""></div>
          <div style="text-align: center;"><img src="@/assets/img/temp/airport5.png" alt=""></div>
          <div style="text-align: center;"><img src="@/assets/img/temp/airport6.png" alt=""></div>
          <div style="text-align: center;"><img src="@/assets/img/temp/airport7.png" alt=""></div>
          <div style="text-align: center;"><img src="@/assets/img/temp/airport8.png" alt=""></div>
          <p><br></p>
          <p style="font-size: 12px;color: blue;">추미애 후보님을 자랑하고, 자원봉사단 추풍당당을 자랑하고, 수많은 추미애 후보 지지자분들을 자랑합니다.</p>
          <p><br></p>
          <p>#추미애가옳았다</p>
          <p>#정공법추미애</p>
          <p>#사람이높은세상</p>
          <p>#사람을높이는나라</p>
        </div>

        <!-- 코멘트 -->
        <div id="productReview">
          <div class="contents-comment">
            <v-row align="center" justify="center" class="mx-0 mt-0 mb-1">
              <v-rating
                :value="3.5"
                color="#ffbb18"
                size="22"
                dense
                half-increments
                readonly
              ></v-rating>
              <div class="ml-2"><strong>3.5</strong> / <span>5</span></div>
            </v-row>
            <div class="count text-center">(고객리뷰 <strong>4</strong>건)</div>
          </div>

          <v-list class="comment-list" three-line>
            <template v-for="(comment, index) in comments">
              <v-list-item :key="comment.number">
                <v-list-item-content :key="index">
                  <div class="wrap-button">
                    <!-- [Dev] 자신의 댓글인 경우 -->
                    <v-btn color="primary" depressed tile small>
                      <v-icon left>mdi-comment-edit</v-icon>수정
                    </v-btn>
                    <v-btn color="primary" depressed tile small>
                      <v-icon left>mdi-comment-remove</v-icon>삭제
                    </v-btn>

                    <!-- [Dev] 자신의 댓글인 아닌 경우 -->
                    <!-- <v-btn color="primary" depressed tile small>
                      <v-icon left>mdi-comment-question</v-icon>신고
                    </v-btn> -->
                  </div>
                  <v-rating :value="comment.rate" color="#ffbb18" size="16" dense readonly></v-rating>
                  <div class="comment-text">{{ comment.text }}</div>
                  <div class="bottom">
                    <span class="comment-user">{{ comment.user }}</span>
                    <span> / </span>
                    <span class="comment-date">{{ comment.date }}</span>
                  </div>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list>
        </div>


        <div class="comment-write">
          <div class="text-center">이 상품을 평가해 주세요.</div>
          <v-rating
            class="text-center"
            :value="3.5"
            color="#ffbb18"
            size="40"
            dense
            half-increments
          ></v-rating>
          <v-textarea
            name="textarea네임"
            label="상품에 대한 평가를 자유롭게 작성해주세요."
            filled
            auto-grow
            rows="2"
            row-height="26"
            counter 
            maxlength="150"
            :append-outer-icon="'mdi-pencil'"
            @click:clear="clearComment"
            @click:append-outer="sendComment"
          ></v-textarea>
        </div>

        <!-- recent comments limit 3 -->
        <!-- <div v-show="recentComments.length" id="productReview" class="comments">
          <h3 class="text-h6">고객리뷰</h3>
          <v-divider class="mb-3"></v-divider>
          <div v-for="comment in recentComments" :key="comment.id" class="comment">
            <p>{{ comment.userName }}</p>
            <span>{{ comment.createdOn | formatDate }}</span>
            <p>{{ comment.content }}</p>
          </div>
        </div> -->
      </div>
    </div>
    <!-- 고객리뷰 -->
    <div v-else>
      <div v-show="postComments.length" class="comments">
        <h3 class="text-h6">고객리뷰</h3>
        <v-divider class="mb-3"></v-divider>
        <div v-for="comment in postComments" :key="comment.id" class="comment">
          <p>{{ comment.userName }}</p>
          <span>{{ comment.createdOn | formatDate }}</span>
          <p>{{ comment.content }}</p>
        </div>
      </div>
    </div>
    <!-- <v-row style="position: sticky;top: 56px;"> -->
    <v-row class="mb-1" style="position: sticky;bottom: 0;">
      <v-tabs background-color="indigo" fixed-tabs dark>
        <v-tab href="#productDetail" @click="() => this.productInfo = true">상세정보</v-tab>
        <v-tab href="#productReview" @click="() => this.productInfo = false">고객리뷰</v-tab>
      </v-tabs>
    </v-row>
  </v-card>
</template>
  

<script>
import imgItem from "@/assets/img/@item.jpg";
import { postsCollection, commentsCollection } from '@/firebase'
import { mapState } from 'vuex'
import moment from 'moment'
import CommentModal from '@/components/CommentModal'

export default {
  components: {
    //
  },
  data: () => ({
    productInfo: true,    
    loading: false,
    error: null,
    post: {},
    // recentComments: [],
    postComments: [],

    imgItem,
    // for Dialog
    dialogm1: '',
    dialog: false,

    // 코멘트 관련
    iconIndex: 0,
    icons: [
      'mdi-emoticon',
      'mdi-emoticon-cool',
      'mdi-emoticon-dead',
      'mdi-emoticon-excited',
      'mdi-emoticon-happy',
      'mdi-emoticon-neutral',
      'mdi-emoticon-sad',
      'mdi-emoticon-tongue',
    ],
    commentContent: '테스트 코멘트',
    comments: [
      {
        number: 'cn-2345',
        user: '홍길동3',
        date: '2021-09-03 15:30:15',
        text: `Ali Connors &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
        rate: 4.5,
      },
      {
        number: 'cn-2344',
        user: '홍길동4',
        date: '2021-09-03 15:30:14',
        text: `to Alex, Scott, Jennifer &mdash; Wish I could come, but I'm out of town this weekend.`,
        rate: 3.5,
      },
      {
        number: 'cn-2343',
        user: '홍길동1',
        date: '2021-09-03 15:30:13',
        text: 'Sandra Adams &mdash; Do you have Paris recommendations? Have you ever been?',
        rate: 5,
      },
      {
        number: 'cn-2342',
        user: '홍길동5',
        date: '2021-09-03 15:30:12',
        text: 'Trevor Hansen &mdash; Have any ideas about what we should get Heidi for her birthday?',
        rate: 2.5,
      },
    ],
  }),
  async created() {
    // fetch the data when the view is created and the data is
    // already being observed
    // this.fetchData()
    await this.fetchData()
  },
  watch: {
    // call again the method if the route changes
    '$route': 'fetchData'
  },
  computed: {
    
  },
  methods: {
    // 코멘트 관련
    sendComment () {
      this.resetIcon()
      this.clearComment()
    },
    resetIcon () {
      this.iconIndex = 0
    },
    clearComment () {
      this.commentContent = '';
    },

    async fetchData() {
      this.error = this.post = null;
      this.loading = true;
      const fetchedId = this.$route.params.id;
      this.id = this.$route.params.id;
      
      const post = await postsCollection.doc(this.id).get();
      console.log('post: ', post.data())
      this.post = post.data();

      // const recentComments = await commentsCollection.where('postId', '==', this.id).get();

      // recentComments.forEach(doc => {
      //   let comment = doc.data()
      //   comment.id = doc.id
      //   this.recentComments.push(comment)
      // })

      const comments = await commentsCollection.where('postId', '==', this.id).get();

      comments.forEach(doc => {
        let comment = doc.data()
        comment.id = doc.id
        this.postComments.push(comment)
      })

      this.loading = false
    },
    test1: () => {

    },
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