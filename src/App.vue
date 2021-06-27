<template>
  <div class="main">
    <headerLayout />
    <v-app class="body">
      <div class="main-content-container">
        <keep-alive>
          <router-view />
        </keep-alive>
      </div>
    </v-app>
    <footerLayout v-if="isLogged" />
  </div>
</template>

<script>
import footerLayout from "@/layout/footer";
import headerLayout from "@/layout/header";
import { mapGetters } from "vuex";

export default {
  name: "App",
  components: { footerLayout, headerLayout },
  data: () => ({}),
  mounted() {
    if (this.isLogged) {
      this.$store.dispatch('operaciones/getCategories')
    }
  },
  computed: {
    ...mapGetters(["isLogged"]),
  },
  methods: {
    
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
    // padding-right: 10px;
    // padding-left: 10px;
    padding-bottom: 60px;

    .main-content-container {
      scrollbar-width: none;
      overflow: scroll;
    }
  }
}
</style>
