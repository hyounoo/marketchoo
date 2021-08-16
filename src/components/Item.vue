<template>
  <v-card class="product-item mx-auto theme--light" max-width="100%">
    <!-- <v-img
      lazy-src="https://picsum.photos/seed/picsum/12/6"
      src="https://picsum.photos/seed/picsum/1200/600"
      max-width="100%"
      max-height="600"
    ></v-img> -->
    <a href="/product/32">
      <v-img
        :lazy-src="imgItem"
        :src="imgItem"
        max-width="100%"
        max-height="600"
      ></v-img>
    </a>

    <div class="product-item__bottom">
      <v-card-text>
        <a href="/product/32" class="product-item__link">
          <h2 class="text-h6 primary--text">{{ itemName }}</h2>
          {{ itemDesc }}
        </a>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn icon x-large>
          <!-- Before - 좋아요 -->
          <v-icon>mdi-heart</v-icon>

          <!-- After - 좋아요 -->
          <!-- <v-icon color="red">mdi-heart</v-icon> -->
        </v-btn>

        <!-- 아래 버튼은 필요할 경우 사용 -->
        <!-- <v-btn icon x-large>
          <v-icon>mdi-bookmark</v-icon>
        </v-btn>
        <v-btn icon x-large>
          <v-icon>mdi-share-variant</v-icon>
        </v-btn> -->
      </v-card-actions>
    </div>
  </v-card>
</template>

<script>
import imgItem from "@/assets/img/@item.jpg";

export default {
  props: [
    'itemName',
    'itemDesc',
    'itemTarget',
  ],
  data: () => ({
    imgItem
  }),
  methods: {
    //
  },
}
</script>
