<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template #center> 购物街 </template>
    </nav-bar>

    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="contentScroll"
      @pullingUp="getMoreInfo"
    >
      <!-- 轮播图 -->
      <home-swiper :banners="banners"></home-swiper>
      <!-- 中间推荐信息 -->
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view />
      <!-- 下方信息 -->
      <tab-control
        class="tab-control"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
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

import { getHomeMultidata, getHomeGoods } from "network/home.js";

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
    const refresh = this.debounce(this.$refs.scroll?.refresh, 200);
    // this.$bus.$on("itemImgLoad", () => {
    //   // 作用是可以在图片加载后重新计算现在可滚动区域的高度，避免图片还没加载结束就已经算好高度，或者切换类别的时候用上一个类别的高度
    //   this.$refs.scroll?.refresh();
    // });
    this.$bus.$on("itemImgLoad", () => {
      // 作用是可以在图片加载后重新计算现在可滚动区域的高度，避免图片还没加载结束就已经算好高度，或者切换类别的时候用上一个类别的高度
      refresh();
    });
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
    debounce(func, delay = 300) {
      let timer = null;
      return function (...args) {
        if (timer) clearTimeout(timer);

        timer = setTimeout(() => {
          func.apply(this, args);
        }, delay);
      };
    },
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
      this.isShow = Math.abs(pos.y) > 500;
    },
    getMoreInfo() {
      this.getHomeGoodsMethod(this.curType);
      setTimeout(() => {
        this.$refs.scroll.finishPullUp();
        this.$refs.scroll.refresh();
      }, 300);
    },
  },
};
</script>

<style scoped>
#home {
  margin-top: 44px;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;
}
.tab-control {
  position: sticky;
  top: 44px;
  background-color: #fff;
  z-index: 9999;
}

.content {
  height: calc(100vh - 95px);
}

.pullup-tips {
  padding: 20px;
  text-align: center;
  color: #999;
}
</style>