<template>
  <div class="container-go-back-btn" @click="goBack"><i class="fas fa-arrow-left"></i></div>
</template>

<script>
export default {
  name: "GoBackBtn",

  data() {
    return {};
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.container-go-back-btn {
  font-size: 24px;
  color: $color-4;
  cursor: pointer;
  padding: 5px;
  display: inline;
}
</style>
