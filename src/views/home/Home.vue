<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template #center> 购物街 </template>
    </nav-bar>
    <!-- 轮播图 -->
    <home-swiper :banners="banners"></home-swiper>
    <!-- 中间推荐信息 -->
    <recommend-view :recommends="recommends"></recommend-view>
    <feature-view />
    <!-- 下方信息 -->
    <tab-control
      class="tab-control"
      :titles="['流行', '新款', '精选']"
    ></tab-control>
    <ul>
      <li>list1</li>
      <li>list2</li>
      <li>list3</li>
      <li>list4</li>
      <li>list5</li>
      <li>list6</li>
      <li>list7</li>
      <li>list8</li>
      <li>list9</li>
      <li>list10</li>
      <li>list10</li>
      <li>list10</li>
      <li>list10</li>
      <li>list10</li>
      <li>list10</li>
      <li>list10</li>
      <li>list10</li>
      <li>list10</li>
      <li>list10</li>
      <li>list10</li>
      <li>list10</li>
      <li>list10</li>
      <li>list10</li>
      <li>list10</li>
      <li>list10</li>
      <li>list10</li>
      <li>list10</li>
      <li>list10</li>
      <li>list10</li>
      <li>list10</li>
      <li>list10</li>
      <li>list10</li>
      <li>list10</li>
      <li>list10</li>
      <li>list10</li>
      <li>list10</li>
      <li>list10</li>
      <li>list10</li>
      <li>list10</li>
      <li>list10</li>
      <li>list10</li>
      <li>list10</li>
      <li>list10</li>
      <li>list10</li>
      <li>list10</li>
      <li>list10</li>
      <li>list10</li>
      <li>list10</li>
      <li>list10</li>
      <li>list10</li>
      <li>list10</li>
      <li>list10</li>
      <li>list10</li>
      <li>list10</li>
      <li>list10</li>
      <li>list10</li>
      <li>list10</li>
      <li>list10</li>
      <li>list10</li>
      <li>list10</li>
      <li>list10</li>
      <li>list10</li>
      <li>list10</li>
      <li>list10</li>
      <li>list10</li>
    </ul>
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";

import { getHomeMultidata } from "network/home.js";

export default {
  name: "home",
  data() {
    return {
      banners: [],
      recommends: [],
    };
  },
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
  },
  created() {
    // 1.请求首页的多个数据
    getHomeMultidata().then((res) => {
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    });
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
  background-color:#fff;
}
</style>