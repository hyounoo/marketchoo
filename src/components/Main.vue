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

    <div class="asdf">
      <h2 class="sub-title">Market Choo Best</h2>
      <a href="#더보기" class="more">더보기</a>
    </div>

    <div class="wrap-items">
      <Item 
        itemName="아이템#1 이름"
        itemDesc="아이템#1 설명설명"
        itemTarget="/product/32">
      </Item>
      <!-- <Item itemName="아이템#25 이름" itemDesc="아이템#25 설명설명"></Item> -->
    </div>
  </main>
</template>

<script>
import Item from "@/components/Item";

export default {
  components: {
    Item,
  },
  data: () => ({
    //
  }),
  methods: {
    //
  },
}
</script>
