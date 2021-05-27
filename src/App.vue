<template>
  <div class="main">
    <div class="header-container"></div>
    <v-app class="body">
      <router-view />
    </v-app>
    <div class="footer-container"></div>
  </div>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    drawer: false,
    group: null,
  }),
  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>

<style lang="scss">
.main {
  height: 100vh;
  max-width: 100vw;
  overflow: hidden;

  .header-container {
    width: 100%;
    height: 50px;
    position: fixed;
    top: 0;
    -webkit-box-shadow: 0px 0px 15px 5px rgba(0, 0, 0, 0.1);
    box-shadow: 0px 0px 15px 5px rgba(0, 0, 0, 0.1);
  }

  .body {
    height: 100%;
    width: 100%;
    padding-top: 60px;
    padding-right: 10px;
    padding-left: 10px;
  }
}
</style>
