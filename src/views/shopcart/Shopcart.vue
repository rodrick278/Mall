<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <template #center> 购物车({{ cartLength }}) </template>
    </nav-bar>
    <scroll class="content" ref="scroll" :probe-type="1" :pull-up-load="false">
      <cart-list></cart-list>
    </scroll>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import CartList from "./childCopms/CartList";
import CartBottomBar from "./childCopms/CartBottomBar";

import Scroll from "components/common/scroll/Scroll";

import { mapGetters } from "vuex";

export default {
  name: "shopcart",
  components: {
    NavBar,
    CartList,
    Scroll,
    CartBottomBar
  },
  computed: {
    // cartLength() {
    //   return this.$store.getters.cartLength;
    // },
    // 用 mapGetters 替代
    ...mapGetters(["cartLength"]),
  },
  activated() {
    this.$refs.scroll.refresh();
  },
};
</script>

<style  scoped>
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  font-size: 20px;
}
.content {
  height: calc(100vh - 44px - 49px - 50px - 3px);
  overflow: hidden;
}
</style>