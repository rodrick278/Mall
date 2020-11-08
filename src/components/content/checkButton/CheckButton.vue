<template>
  <div class="check-button" :class="{ check: isCheck }">
    <img src="~/assets/img/cart/tick.svg" alt="" v-show="isCheck"/>
    <img src="" alt="" v-show="!isCheck"/>
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    isCheck: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.check-button {
  border-radius: 50%;
  border: 2px solid #ccc;
}
.check {
  background-color: #ff8198;
  border-color: #ff8198;
}
</style>