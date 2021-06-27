<template>
  <div class="container-advice-action" :class="{ 'container-advice-action--success': type === 'success', 'container-advice-action--fail': type === 'fail', 'container-advice-action--hidden': !activeAdvice }">
    <div class="advice-action">
      <div class="advice-action--close-btn" @click="activeAdvice = false"><i class="fas fa-times"></i></div>
      <h3>{{ title }}</h3>
      <div class="advice-text" v-html="text" />
    </div>
  </div>
</template>

<script>
export default {
  name: "AdviceAction",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "success",
    },
    title: {
      type: String,
      default: "Success!",
    },
    text: {
      type: String,
      default: "",
    },
    time: {
      type: Number,
      default: 3,
    },
  },
  data() {
    return {
      activeAdvice: this.value,
    };
  },
  watch: {
    value(newOne, oldOne) {
      if (newOne) {
        this.activeAdvice = this.value;
        setTimeout(() => {
          this.activeAdvice = false;
        }, this.time * 1000);
      }
    },
    activeAdvice() {
      this.hangleInput();
    },
  },
  methods: {
    hangleInput(e) {
      this.$emit("input", this.activeAdvice);
    },
  },
};
</script>

<style lang="scss" scoped>
.container-advice-action {
  position: absolute;
  top: -25px;
  width: 90vw;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border: 1px solid $color-10;
  border-radius: 10px;
  background-color: white;
  z-index: 999;
  padding: 15px;
  transition: all 0.4s;

  &--hidden {
    top: -1500px;
  }

  &--success {
    background-color: $color-6;
  }

  &--fail {
    background-color: $color-1;
    color: white;
  }

  .advice-action {
    &--close-btn {
      position: absolute;
      right: 10px;
      top: 0;
      font-size: 22px;
      color: white;
      cursor: pointer;
      padding: 5px;
    }

    h3 {
      font-weight: 600;
    }
    .advice-text {
      font-size: 14px;
    }
  }
}
</style>
