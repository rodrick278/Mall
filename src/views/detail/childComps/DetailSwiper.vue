<template>
  <van-swipe
    class="my-swipe"
    :autoplay="3000"
    :stop-propagation="false"
    indicator-color="white"
  >
    <van-swipe-item v-for="(item, index) in topImages" :key="index">
      <img :src="item" @load="loadEnd" />
    </van-swipe-item>
  </van-swipe>
</template>

<script>
import { Swipe, SwipeItem } from "vant";

export default {
  name: "DetailSwiper",
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      isLoad: false,
      topImagesLength: 0,
      curLength: 0,
    };
  },
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
  },
  watch: {
    topImages(newValue) {
      this.topImagesLength = newValue.length;
    },
  },
  methods: {
    loadEnd() {
      if (++this.curLength === this.topImagesLength) {
        this.$emit("imgLoadEnd");
      }
    },
  },
};
</script>

<style scoped>
.my-swipe {
  height: 400px;
}

.my-swipe .van-swipe-item img {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
  width: 100%;
  overflow: hidden;
}
</style>