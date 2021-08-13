<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <!--  -->
      <ul>
        <li><a href="#link1">Link #1</a></li>
        <li><a href="#link2">Link #2</a></li>
        <li><a href="#link3">Link #3</a></li>
      </ul>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <!--  -->
      <h2>heading2</h2>
      <h3>heading3</h3>
      <h4>heading4</h4>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({ drawer: null }),
  name: 'Wireframe',
  components: {
    
  },
}
</script>