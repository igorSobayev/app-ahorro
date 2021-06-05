<template>
  <div id="notifications" class="notifications-container">
    <div class="notifications-container--btn">
      <div class="" @click="openedNotifications = !openedNotifications"><i class="far fa-bell"></i></div>
    </div>
    <div class="notifications-container--notifications" :class="{ 'notifications-container--notifications__opened': openedNotifications }">
      <div class="notifications-corner"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotificationsButton",
  data() {
    return {
      openedNotifications: false,
    };
  },
  mounted() {
    window.addEventListener("click", (e) => {
      if (!document.getElementById("notifications").contains(e.target)) {
        this.openedNotifications = false;
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.notifications-container {
  position: relative;

  &--btn {
    font-size: 20px;
    cursor: pointer;
  }

  &--notifications {
    position: absolute;
    transition: all 0.1s cubic-bezier(0.72, 0.2, 0.27, 1.55);
    width: 220px;
    background-color: $color-10;
    border: 1px solid $color-10;
    height: 350px;
    max-height: 450px;
    top: 32px;
    right: -10px;
    transform: scale(0);
    border-radius: 7px;

    &__opened {
      transform: scale(1);
    }

    .notifications-corner {
      content: "";
      position: absolute;
      width: 0px;
      height: 0px;
      border-width: 6px;
      border-style: solid;
      border-color: transparent transparent $color-10 transparent;
      top: -13px;
      right: 12px;
    }
  }
}
</style>
