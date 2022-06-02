<template>
  <div class="lateral-menu">
    <div class="lateral-menu--btn">
      <button class="btn btn-primary" @click="openedMenu = !openedMenu"><i class="fas fa-bars"></i></button>
    </div>
    <div class="lateral-menu--content-container" :class="{ 'lateral-menu--content-container__opened': openedMenu }">
      <div class="content-container--velo" @click="openedMenu = !openedMenu"></div>
      <div class="content-container--content">
        <div class="content--logo"><img src="@/assets/logo-full.png" alt=""></div>
        <div class="content--links-container">
          <!-- <div class="link">
            <span @click="openedMenu = !openedMenu"><router-link to="/guides">Guias</router-link></span>
          </div> -->
          <div class="link">
            <span @click="openedMenu = !openedMenu"><router-link to="/profile">Perfil</router-link></span>
          </div>
          <!-- <div class="link">
            <span @click="openedMenu = !openedMenu"><router-link to="/contact">Contacto</router-link></span>
          </div> -->
          <div class="link">
            <span @click="openedMenu = !openedMenu"><span class="btn-logout" @click="logout()">Cerrar sesión</span></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LateralMenu",
  data() {
    return {
      openedMenu: false,
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("user/logout");
    },
  },
};
</script>

<style lang="scss" scoped>
.lateral-menu {
  &--content-container {
    position: absolute;
    width: 100vw;
    top: 0;
    left: -100vw;
    height: 100vh;
    transition: all 0.5s;
    z-index: 9999;

    .content-container--velo {
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0);
      position: absolute;
      top: 0;
      left: -100vw;
      z-index: 9000;
      transition: all 0.5s;
    }

    .content-container--content {
      height: 100vh;
      width: 80vw;
      background-color: white;
      z-index: 9999;
      position: absolute;

      .content--logo {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 60px;
        border-bottom: 1px solid black;
        padding-left: 40px;
      }

      .content--links-container {
        padding-top: 30px;
        display: flex;
        flex-direction: column;
        padding-left: 40px;
        gap: 22px;
        font-size: 20px;

        .link {
          .btn-logout {
            color: $color-5;
            cursor: pointer;
          }
        }
      }
    }

    &__opened {
      left: 0;

      .content-container--velo {
        left: 0;
        background-color: rgba(0, 0, 0, 0.308);
      }
    }
  }
}
</style>
