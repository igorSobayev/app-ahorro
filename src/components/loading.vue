<template>
  <div class="loading-circle"><div></div></div>
</template>

<script>
export default {
  name: "Loading",

  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>

.loading-circle {
  display: inline-block;
  transform: translateZ(1px);
}
.loading-circle > div {
  display: inline-block;
  width: 30px;
  height: 30px;
  margin: 8px;
  border-radius: 50%;
  // background: red;
  background-image: url("/assets/icons/dollar.svg");
  animation: loading-circle 2.4s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
@keyframes loading-circle {
  0%,
  100% {
    animation-timing-function: cubic-bezier(0.5, 0, 1, 0.5);
  }
  0% {
    transform: rotateY(0deg);
  }
  50% {
    transform: rotateY(1800deg);
    animation-timing-function: cubic-bezier(0, 0.5, 0.5, 1);
  }
  100% {
    transform: rotateY(3600deg);
  }
}
</style>
