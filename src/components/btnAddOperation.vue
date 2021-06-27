<template>
  <div class="container-add-operacion">
    <router-link class="link" to="/add-operation"><i class="fas fa-plus-circle"></i></router-link>
  </div>
</template>

<script>
export default {
  name: "BtnAddOperation",
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.container-add-operacion {
  position: absolute;
  right: 20px;
  bottom: 150px;
  width: 45px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;

  .link {
    width: 100%;
    height: 100%;
    color: $color-6;

    svg {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
