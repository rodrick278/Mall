<template>
  <div class="cart-list" v-if="Object.keys(allCart).length !== 0">
    <cart-list-item
      v-for="(item, index) of allCart"
      :product="item"
      :key="index"
    ></cart-list-item>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CartListItem from "./CartListItem";

export default {
  name: "CartList",
  components: {
    CartListItem,
  },
  computed: {
    ...mapGetters({ allCart: "cartList" }), // 别名
  },
};
</script>

<style scoped>
</style>