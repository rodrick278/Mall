<template>
  <div>
    <!-- 顶部 -->
    <detail-nav-bar></detail-nav-bar>
    <!-- 轮播 -->
    <detail-swiper :topImages="topImages"></detail-swiper>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";

import { getDetailnfo } from "network/detail";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
  },
  data() {
    return {
      iid: "",
      topImages: [],
    };
  },
  async created() {
    this.iid = this.$route.query.iid;
    const allInfo = await getDetailnfo(this.iid);
    console.log(allInfo);
    this.topImages = allInfo.result.itemInfo.topImages;
  },
};
</script>

<style scoped>
</style>