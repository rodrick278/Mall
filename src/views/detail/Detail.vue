<template>
  <div id="detail">
    <!-- 顶部 -->
    <detail-nav-bar
      @titleClick="titleClick"
      ref="detailNavBar"
    ></detail-nav-bar>
    <scroll class="content" ref="scroll" :probeType="3" @scroll="scrollPos">
      <!-- 轮播 -->
      <detail-swiper
        :topImages="topImages"
        @imgLoadEnd="imgLoadRefresh"
        ref="swiperInfo"
      ></detail-swiper>
      <!-- 标题区域 -->
      <detail-base-info :goods="goods"></detail-base-info>
      <!-- 店铺信息 -->
      <detail-shop-info :shop="shop"></detail-shop-info>
      <!-- 下方信息 -->
      <detail-goods-info
        :detailInfo="detailInfo"
        @goodsInfoImgLoadOver="imgLoadRefresh"
      ></detail-goods-info>
      <!-- 参数 -->
      <detail-param-info
        ref="paramInfo"
        :paramInfo="paramInfo"
      ></detail-param-info>
      <!-- 评论 -->
      <detail-comment-info
        ref="commentInfo"
        :commentInfo="commentInfo"
      ></detail-comment-info>
      <!-- 推荐商品 -->
      <goods-list ref="listInfo" :goods="recommendList"></goods-list>
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";

import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";

import { debounce, throttle } from "common/utils";
import { itemListenerMixin } from "common/mixin";

import {
  getDetailnfo,
  getRecommend,
  Goods,
  Shop,
  GoodsParam,
} from "network/detail";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    Scroll,
  },
  data() {
    return {
      iid: "",
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommendList: [],
      themeTopYs: [],
      getThemeTopY: null,
      curIndex: 0,
    };
  },
  mixins: [itemListenerMixin],
  async created() {
    // 获取所有详情数据
    this.iid = this.$route.query.iid;
    const allInfo = (await getDetailnfo(this.iid)).result;
    // console.log(allInfo);
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
    // 下面的详情
    this.detailInfo = allInfo.detailInfo;
    // 参数
    this.paramInfo = new GoodsParam(
      allInfo.itemParams.info,
      allInfo.itemParams.rule
    );
    // 评论信息
    if (allInfo.rate.cRate != 0) {
      this.commentInfo = allInfo.rate.list[0];
    }

    // 获取推荐数据
    const { list } = (await getRecommend()).data;
    this.recommendList = list;
  },
  mounted() {
    // mixin替代
    // const refresh = debounce(this.$refs.scroll?.refresh, 200);
    // this.itemListener = () => {
    //   refresh();
    // };
    // this.$bus.$on("itemImgLoad", this.itemListener);

    // 给 getThemeTopY 赋值
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.paramInfo.$el.offsetTop);
      this.themeTopYs.push(this.$refs.commentInfo.$el.offsetTop);
      this.themeTopYs.push(this.$refs.listInfo.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE);
      console.log(this.themeTopYs);
    }, 500);
  },
  distroyed() {
    // 离开home的时候取消监听，否则detail里也会有这个事件
    this.$bus.$off("itemImgLoad", this.itemListener);
  },
  methods: {
    imgLoadRefresh() {
      this.$refs.scroll.refresh();
      // console.log(this, this.getThemeTopY);
      this.getThemeTopY();
    },
    titleClick(index) {
      let param = "";
      switch (index) {
        case 0:
          param = this.$refs.swiperInfo.$el;
          break;
        case 1:
          param = this.$refs.paramInfo.$el;
          break;
        case 2:
          param = this.$refs.commentInfo.$el;
          break;
        case 3:
          param = this.$refs.listInfo.$el;
          break;

        default:
          break;
      }
      this.$refs.scroll.scrollToElement(param, 400);
    },
    scrollPos(pos) {
      // this.throttleListener(pos);
      // if (Math.abs(pos.y) >= this.themeTopYs[3] - 46) {
      //   // console.log(3);
      //   this.$refs.detailNavBar.curIndex = 3;
      // } else if (Math.abs(pos.y) >= this.themeTopYs[2] - 46) {
      //   // console.log(2);
      //   this.$refs.detailNavBar.curIndex = 2;
      // } else if (Math.abs(pos.y) >= this.themeTopYs[1] - 46) {
      //   // console.log(1);
      //   this.$refs.detailNavBar.curIndex = 1;
      // } else {
      //   // console.log(0);
      //   this.$refs.detailNavBar.curIndex = 0;
      // }

      for (let i = 0; i < this.themeTopYs.length - 1; i++) {
        if (
          this.curIndex !== i &&
          Math.abs(pos.y) >= this.themeTopYs[i]-46 &&
          Math.abs(pos.y) < this.themeTopYs[i + 1]-46
        ) {
          this.curIndex = i;
          this.$refs.detailNavBar.curIndex = this.curIndex;
        }
      }
    },
  },
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