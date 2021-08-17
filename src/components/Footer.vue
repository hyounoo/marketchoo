<template>
  <v-footer color="primary lighten-1" padless>
    <v-row justify="center" no-gutters>
      <v-btn href="/" color="white" class="my-2" text rounded>Home</v-btn>
      <v-btn href="/기타메뉴1" color="white" class="my-2" text rounded>기타메뉴1</v-btn>
      <v-btn href="/기타메뉴2" color="white" class="my-2" text rounded>기타메뉴2</v-btn>
      <v-btn href="/기타메뉴3" color="white" class="my-2" text rounded>기타메뉴3</v-btn>

      <v-col class="primary lighten-2 py-4 text-center white--text" cols="12">
        © {{ new Date().getFullYear() }} MARKETCHOO. All Rights Reserved.
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    //
  }),
}
</script>