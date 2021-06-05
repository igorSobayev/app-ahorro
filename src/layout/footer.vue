<template>
  <div class="footer-container">
    <div class="item item--operaciones">
      <router-link class="item-link" :class="{ 'item-link--active': actualUrl === '/' }" to="/"><operacionesIcon /></router-link>
    </div>
    <div class="item item--charts">
      <router-link class="item-link" :class="{ 'item-link--active': actualUrl === '/charts' }" to="/charts"><chartsIcon /></router-link>
    </div>
    <div class="item item--patrimony">
      <router-link class="item-link" :class="{ 'item-link--active': actualUrl === '/patrimony' }" to="/patrimony"><patrimonyIcon /></router-link>
    </div>
  </div>
</template>

<script>
import operacionesIcon from "@/assets/icons/operaciones.svg";
import chartsIcon from "@/assets/icons/charts.svg";
import patrimonyIcon from "@/assets/icons/patrimony.svg";

export default {
  name: "Footer",
  components: {
    operacionesIcon,
    chartsIcon,
    patrimonyIcon,
  },
  data() {
    return {};
  },
  computed: {
    actualUrl() {
      return this.$route.path;
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.footer-container {
  position: fixed;
  bottom: 0;
  height: 60px;
  background-color: white;
  width: 100%;
  box-shadow: 0px 0px 15px 5px rgba(0, 0, 0, 0.1);
  z-index: 9;

  display: flex;
  justify-content: space-around;
  align-items: center;

  .item {
    width: 20%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .item-link {
      &--active {
        svg path {
          stroke: $color-4 !important;
        }
      }
    }

    &--charts {
      width: 38px;
      height: 38px;

      .item-link--active {
        fill: $color-4 !important;
      }
    }

    &--patrimony {
      .item-link svg {
        width: 38px !important;
        height: 38px !important;
      }

      .item-link--active {
        fill: $color-4 !important;
      }
    }
  }
}
</style>

<style lang="scss"></style>
