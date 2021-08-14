<template>
  <v-hover>
    <template v-slot:default="{ hover }">
      <v-card class="mx-auto" max-width="100%">
        <!-- <v-img
          lazy-src="https://picsum.photos/seed/picsum/12/6"
          src="https://picsum.photos/seed/picsum/1200/600"
          max-width="100%"
          max-height="600"
        ></v-img> -->
        <v-img
          :lazy-src="imgItem"
          :src="imgItem"
          max-width="100%"
          max-height="600"
        ></v-img>

        <v-card-text>
          <h2 class="text-h6 primary--text">{{ itemName }}</h2>
          {{ itemDesc }}
        </v-card-text>

        <v-fade-transition>
          <v-overlay
            v-if="hover"
            absolute
            color="#036358"
          >
            <v-btn :href="itemTarget">상품 상세보기</v-btn>
          </v-overlay>
        </v-fade-transition>
      </v-card>
    </template>
  </v-hover>
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
