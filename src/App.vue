<template>
  <div class="main">
    <headerLayout />
    <v-app class="body">
      <div class="main-content-container">
        <router-view />
      </div>
    </v-app>
    <footerLayout />
  </div>
</template>

<script>
import footerLayout from "@/layout/footer";
import headerLayout from "@/layout/header";
export default {
  name: "App",
  components: { footerLayout, headerLayout },
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
  position: relative;

  .body {
    height: 100%;
    width: 100%;
    padding-top: 60px;
    padding-right: 10px;
    padding-left: 10px;
    padding-bottom: 60px;

    .main-content-container {
      scrollbar-width: none;
      overflow: scroll;
    }
  }
}
</style>
