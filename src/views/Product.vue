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
            :value="4.5"
            color="amber"
            size="16"
            dense
            half-increments
            readonly
          ></v-rating>

          <div class="grey--text text-caption mt-1 ml-2"><strong>4.5</strong> (413건)</div>
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
    <div id="productDetail">
      <h3 class="text-h6">상세정보</h3>
      <v-divider class="mb-3"></v-divider>
      <div style="margin: 0 0 40px;">내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용</div>
      <div style="margin: 40px 0;">내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용</div>
      <div style="margin: 40px 0;">내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용</div>
      <div style="margin: 40px 0;">내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용</div>
      <div style="margin: 40px 0;">내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용</div>
      <div style="margin: 40px 0;">내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용</div>
      <div style="margin: 40px 0;">내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용</div>
      <div style="margin: 40px 0;">내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용</div>
    </div>

    <!-- 고객리뷰 -->
    <div id="productReview">
      <h3 class="text-h6">고객리뷰</h3>
      <v-divider class="mb-3"></v-divider>
      <div style="margin: 0 0 40px;">내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용</div>
      <div style="margin: 40px 0;">내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용</div>
      <div style="margin: 40px 0;">내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용</div>
      <div style="margin: 40px 0;">내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용</div>
      <div style="margin: 40px 0;">내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용</div>
      <div style="margin: 40px 0;">내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용</div>
      <div style="margin: 40px 0;">내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용</div>
      <div style="margin: 40px 0;">내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용</div>
    </div>

    <!-- <v-row style="position: sticky;top: 56px;"> -->
    <v-row class="mb-1" style="position: sticky;bottom: 0;">
      <v-tabs background-color="indigo" fixed-tabs dark>
        <v-tab href="#productDetail" @click="$vuetify.goTo('#productDetail', {})">상세정보</v-tab>
        <v-tab href="#productReview" @click="$vuetify.goTo('#productReview', {})">고객리뷰</v-tab>
      </v-tabs>
    </v-row>
  </v-card>
</template>
  

<script>
import imgItem from "@/assets/img/@item.jpg";
import { commentsCollection } from '@/firebase'
import { mapState } from 'vuex'
import moment from 'moment'
import CommentModal from '@/components/CommentModal'

export default {
  components: {
    //
  },
  data: () => ({
    imgItem,

    // for Dialog
    dialogm1: '',
    dialog: false,
  }),
  computed: {
    
  },
  methods: {
    test1: () => {

    },
  },
  filters: {
    
  }
}
</script>

<style>

</style>