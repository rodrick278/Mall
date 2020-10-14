<template>
  <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
    <van-swipe-item v-for="(item, index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" />
      </a>
    </van-swipe-item>
  </van-swipe>
</template>

<script>
import { Swipe, SwipeItem } from "vant";

export default {
  name: "HomeSwiper",
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
  },
};
</script>

<style scoped>
.my-swipe .van-swipe-item img {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
  width: 100%;
  height: 50vw;
}

/* @media screen and (min-width: 450px) {
  .my-swipe .van-swipe-item img {
    width: 450px;
    height: 225px;
    position: relative;
    left:calc((100vw - 450px) / 2)
  }
} */
</style>