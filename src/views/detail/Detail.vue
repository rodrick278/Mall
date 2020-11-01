<template>
  <div id="detail">
    <!-- 顶部 -->
    <detail-nav-bar></detail-nav-bar>
    <scroll class="content" ref="scroll">
      <!-- 轮播 -->
      <detail-swiper :topImages="topImages" @imgLoadEnd="imgLoadEnd"></detail-swiper>
      <!-- 标题区域 -->
      <detail-base-info :goods="goods"></detail-base-info>
      <!-- 店铺信息 -->
      <detail-shop-info :shop="shop"></detail-shop-info>
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";

import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";

import { getDetailnfo, Goods, Shop } from "network/detail";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
  },
  data() {
    return {
      iid: "",
      topImages: [],
      goods: {},
      shop: {},
    };
  },
  async created() {
    this.iid = this.$route.query.iid;
    const allInfo = (await getDetailnfo(this.iid)).result;
    console.log(allInfo);
    // 获取轮播图
    this.topImages = allInfo.itemInfo.topImages;
    // 获取商品信息
    this.goods = new Goods(
      allInfo.itemInfo,
      allInfo.columns,
      allInfo.shopInfo.services
    );
    // 店铺信息
    this.shop = new Shop(allInfo.shopInfo);

  },
  methods:{
    imgLoadEnd(){
      this.$refs.scroll.refresh();
    }
  }
};
</script>

<style scoped>
#detail {
  z-index: 9999;
  position: relative;
  background-color: #fff;
}
.content {
  height: calc(100vh - 44px);
  overflow: hidden;
}
</style>