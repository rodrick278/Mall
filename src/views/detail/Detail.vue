<template>
  <div id="detail">
    <!-- 顶部 -->
    <detail-nav-bar></detail-nav-bar>
    <scroll class="content" ref="scroll">
      <!-- 轮播 -->
      <detail-swiper
        :topImages="topImages"
        @imgLoadEnd="imgLoadEnd"
      ></detail-swiper>
      <!-- 标题区域 -->
      <detail-base-info :goods="goods"></detail-base-info>
      <!-- 店铺信息 -->
      <detail-shop-info :shop="shop"></detail-shop-info>
      <!-- 下方信息 -->
      <detail-goods-info
        :detailInfo="detailInfo"
        @goodsInfoImgLoadOver="goodsInfoImgLoadOver"
      ></detail-goods-info>
      <!-- 参数 -->
      <detail-param-info :paramInfo="paramInfo"></detail-param-info>
      <!-- 评论 -->
      <detail-comment-info :commentInfo="commentInfo"></detail-comment-info>
      <!-- 推荐商品 -->
      <goods-list :goods="recommendList"></goods-list>
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

import { debounce } from "common/utils";

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
      detailItemListener: null,
    };
  },
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
    const refresh = debounce(this.$refs.scroll?.refresh, 200);

    this.detailItemListener = () => {
      refresh();
    };
    this.$bus.$on("itemImgLoad", this.detailItemListener);
  },
  distroyed() {
    // 离开home的时候取消监听，否则detail里也会有这个事件
    this.$bus.$off("itemImgLoad", this.detailItemListener);
  },
  methods: {
    imgLoadEnd() {
      this.$refs.scroll.refresh();
    },
    goodsInfoImgLoadOver() {
      this.$refs.scroll.refresh();
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