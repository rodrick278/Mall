<template>
  <div class="goods">
    <goods-list-item
      v-for="item of goods"
      :goodsItem="item"
    ></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem";

export default {
  name: "GoodsList",
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    GoodsListItem,
  },
};
</script>

<style scoped>
.goods {
  display: flex;
  flex-wrap: wrap;
  /* justify-content: space-evenly; */
  justify-content: space-around;
}
/* 解决 space-evenly 不兼容的问题 */
.goods:before,
.goods:after {
  content: "";
  display: block;
}
</style>