<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template #center> 购物街 </template>
    </nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControlOut"
      v-show="isTabFixed"
    ></tab-control>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="contentScroll"
      @pullingUp="getMoreInfo"
    >
      <!-- 轮播图 -->
      <home-swiper
        :banners="banners"
        @imgLoadFinish="imgLoadFinish"
      ></home-swiper>
      <!-- 中间推荐信息 -->
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view />
      <!-- 下方信息 -->
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControlIn"
        v-show="!isTabFixed"
      ></tab-control>
      <!-- 滚动商品列表 -->
      <goods-list :goods="showGoods"></goods-list>
      <div class="pullup-tips">
        <div class="after-trigger">
          <span class="pullup-txt">Loading...</span>
        </div>
      </div>
    </scroll>

    <back-top @click.native="btClick" v-show="isShow"></back-top>
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from "common/utils";

export default {
  name: "home",
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      curType: "pop",
      isShow: false,
      tabOffsetTop: 0,
      offsetHeight: 0,
      isTabFixed: false,
      saveY:0,
      homeItemListener: null,
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.curType].list;
    },
  },
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  created() {
    // 1.请求首页的多个数据
    this.getHomeMultidataMethod();
    // 2.请求首页下面的商品
    this.getHomeGoodsMethod("pop");
    this.getHomeGoodsMethod("new");
    this.getHomeGoodsMethod("sell");
  },
  mounted() {
    // 3.监听事件总线的图片加载事件
    const refresh = debounce(this.$refs.scroll?.refresh, 200);
    this.homeItemListener = () => {
      // 作用是可以在图片加载后重新计算现在可滚动区域的高度，避免图片还没加载结束就已经算好高度，或者切换类别的时候用上一个类别的高度
      refresh();
    };
    this.$bus.$on("itemImgLoad", this.homeItemListener);
  },
  activated(){
    this.$refs.scroll.scrollTo(0, this.saveY, 500);
  },
  deactivated() {
    // 离开时保留Y值，回来的时候留在Y
    this.saveY=this.$refs.scroll.getCurrentY()
    // 离开home的时候取消监听，否则detail里也会有这个事件
    this.$bus.$off("itemImgLoad", this.homeItemListener);
  },
  watch: {
    curType(curType) {
      let index = 0;
      switch (curType) {
        case "pop":
          index = 0;
          break;
        case "new":
          index = 1;
          break;
        case "sell":
          index = 2;
          break;
      }
      this.$refs.tabControlOut.curIndex = index;
      this.$refs.tabControlIn.curIndex = index;
    },
  },
  methods: {
    /**
     * 网络请求
     */
    getHomeMultidataMethod() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoodsMethod(type) {
      // 动态拿到page值 然后对当前的page+1
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
      });
    },
    /**
     * 事件监听
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.curType = "pop";
          break;
        case 1:
          this.curType = "new";
          break;
        case 2:
          this.curType = "sell";
          break;
      }
    },
    btClick() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    contentScroll(pos) {
      // 判断 back-top 是否显示
      this.isShow = Math.abs(pos.y) > 500;
      // 判断 tabControl 是否吸顶
      this.isTabFixed = Math.abs(pos.y) > this.tabOffsetTop - this.offsetHeight;
    },
    getMoreInfo() {
      this.getHomeGoodsMethod(this.curType);
      setTimeout(() => {
        this.$refs.scroll.finishPullUp();
        this.$refs.scroll.refresh();
      }, 300);
    },
    imgLoadFinish() {
      // 4. 拿到tabControl的tabOffsetTop
      // 所有的组件都有$el用于获取组件的元素
      this.tabOffsetTop = this.$refs.tabControlIn.$el.offsetTop;
      this.offsetHeight = this.$refs.tabControlIn.$el.offsetHeight;
    },
  },
};
</script>

<style scoped>
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  z-index: 9999;
  /* 由于BSCroll只会滚动限制区域，所以 home-nav 就不用 fixed 来脱离文档流了 */
  /* position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999; */
}

/* 使用BScroll后吸顶会失效 */
/* .tab-control {
  position: sticky;
  top: 44px;
  background-color: #fff;
  z-index: 9999;
} */

.content {
  height: calc(100vh - 95px);
  overflow: hidden;
}

.pullup-tips {
  padding: 20px;
  text-align: center;
  color: #999;
}
</style>