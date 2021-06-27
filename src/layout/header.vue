<template>
  <div class="header-container">
    <div class="lateral-menu-container">
      <lateralMenu v-if="isLogged" />
    </div>
    <div class="logo-container">
      <router-link to="/" class="logo">
        <h3>Logo cont</h3>
      </router-link>
    </div>
    <div class="notification-container">
      <notificationsButton v-if="isLogged" />
    </div>
  </div>
</template>

<script>
import lateralMenu from "@/components/lateralMenu";
import notificationsButton from "@/components/notificationsButton";
import { mapGetters } from "vuex";

export default {
  name: "Footer",
  components: { lateralMenu, notificationsButton },
  computed: {
    ...mapGetters(["isLogged", "user"]),
  },
};
</script>

<style lang="scss" scoped>
.header-container {
  width: 100%;
  height: 50px;
  position: fixed;
  top: 0;
  -webkit-box-shadow: 0px 0px 15px 5px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 0px 15px 5px rgba(0, 0, 0, 0.1);
  z-index: 10;

  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  .lateral-menu-container {
    width: 50px;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .logo-container {
    width: 200px;
    height: auto;

    display: flex;
    justify-content: center;
    align-items: center;
    color: $color-6;
  }

  .notification-container {
    width: 50px;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
