<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <template #center> 购物车({{ cartLength }}) </template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

import { mapGetters } from "vuex";

export default {
  name: "shopcart",
  components: {
    NavBar,
  },
  computed: {
    // cartLength() {
    //   return this.$store.getters.cartLength;
    // },
    ...mapGetters(["cartLength"]),
  },
};
</script>

<style  scoped>
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  font-size: 20px;
}
</style>