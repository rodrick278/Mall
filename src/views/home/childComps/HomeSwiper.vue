<template>
  <!-- 
+---------------------------------------+
| 滑动轮播时为什么触发了 click 事件          |
+---------------------------------------+
这种情况通常是由于项目中引入了fastclick库导致的。fastclick的原理是通过 Touch 事件模拟出 click 事件，而 Swipe 内部默认会阻止 touchmove 事件冒泡，干扰了 fastclick 的判断，导致出现这个问题。
将 Swipe 组件的 stop-propagation 属性设置为 false 即可避免该问题。
-->
  <van-swipe
    class="my-swipe"
    :autoplay="3000"
    :stop-propagation="false"
    indicator-color="white"
  >
    <van-swipe-item v-for="(item, index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" @load.stop="imgLoad" />
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
  data() {
    return {
      isLoad: false,
    };
  },
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
  },
  methods: {
    imgLoad() {
      if (!this.isLoad) {
        this.$emit("imgLoadFinish");
        this.isLoad = true;
      }
    },
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