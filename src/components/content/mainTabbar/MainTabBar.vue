<template>
  <tab-bar class="tab-bar">
    <template v-slot:default>
      <tab-bar-item path="/home">
        <template v-slot:item-icon>
          <!-- html里使用简写路径要加~ -->
          <img src="~assets/img/tabbar/home.svg" alt />
        </template>
        <template v-slot:item-text>
          <div>首页</div>
        </template>
        <template #item-icon-active>
          <img src="~assets/img/tabbar/home_active.svg" alt />
        </template>
      </tab-bar-item>

      <tab-bar-item path="/category">
        <template v-slot:item-icon>
          <img src="~assets/img/tabbar/category.svg" alt />
        </template>
        <template v-slot:item-text>
          <div>分类</div>
        </template>
        <template v-slot:item-icon-active>
          <img src="~assets/img/tabbar/category_active.svg" alt />
        </template>
      </tab-bar-item>

      <tab-bar-item path="/shopcart">
        <template v-slot:item-icon>
          <img src="~assets/img/tabbar/cart.svg" alt />
        </template>
        <template v-slot:item-text>
          <div>购物车</div>
        </template>
        <template v-slot:item-icon-active>
          <img src="~assets/img/tabbar/cart_active.svg" alt />
        </template>
      </tab-bar-item>

      <tab-bar-item path="/profile">
        <template v-slot:item-icon>
          <img src="~assets/img/tabbar/profile.svg" alt />
        </template>
        <template v-slot:item-text>
          <div>我的</div>
        </template>
        <template v-slot:item-icon-active>
          <img src="~assets/img/tabbar/profile_active.svg" alt />
        </template>
      </tab-bar-item>
    </template>
  </tab-bar>
</template>

<script>
import TabBar from "components/common/tabbar/TabBar";
import TabBarItem from "components/common/tabbar/TabBarItem";

export default {
  name: "MainTabBar",
  components: {
    TabBar,
    TabBarItem,
  },
};
</script>

<style scoped>
.tab-bar {
  z-index: 9999;
}
</style>