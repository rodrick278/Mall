<template>
  <div id="category">
    <!-- 头部 -->
    <nav-bar class="nav-bar">
      <template #center>
        <div>商品分类</div>
      </template>
    </nav-bar>
    <!--  整个下部 -->
    <div class="content">
      <!-- 左侧分类栏 -->
      <scroll class="leftContent" ref="scrollLeft">
        <tab-menu :categories="categories" @selectItem="selectItem"></tab-menu>
      </scroll>
      <!-- 右侧详情 -->
      <scroll
        class="leftContent"
        ref="scroll"
        @scroll="scrollPos"
        :probeType="3"
      >
        <div>
          <tab-content-category
            :subcategories="showSubcategory"
            @imgLoadOver="imgLoadOver"
          ></tab-content-category>
          <tab-control
            :titles="['综合', '新品', '销量']"
            @tabClick="tabClick"
          ></tab-control>
          <tab-content-detail
            :category-detail="showCategoryDetail"
          ></tab-content-detail>
        </div>
      </scroll>
      <back-top @click.native="btClick" v-show="isShow"></back-top>
    </div>
  </div>
</template>

<script>
import TabMenu from "./childComps/TabMenu";
import TabContentCategory from "./childComps/TabContentCategory";
import TabContentDetail from "./childComps/TabContentDetail";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import Scroll from "components/common/scroll/Scroll";

import {
  getCategory,
  getSubcategory,
  getCategoryDetail,
} from "network/category";

import { backTopMixin } from "common/mixin";

export default {
  name: "Category",
  data() {
    return {
      categories: [],
      categoryData: {},
      currentIndex: -1,
      currentType: "pop",
      saveY: 0,
    };
  },
  mixins: [backTopMixin],
  components: {
    NavBar,
    TabMenu,
    TabContentCategory,
    Scroll,
    TabControl,
    TabContentDetail,
  },
  created() {
    // 1.请求分类数据
    this._getCategory();
  },
  mounted() {
    this.$bus.$on("itemImgLoad", this.imgLoadOver);
  },
  computed: {
    showSubcategory() {
      if (this.currentIndex === -1) return {};
      return this.categoryData[this.currentIndex].subcategories;
    },
    showCategoryDetail() {
      if (this.currentIndex === -1) return [];
      return this.categoryData[this.currentIndex].categoryDetail[
        this.currentType
      ];
    },
  },
  activated() {
    this.$refs.scroll.refresh();
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getCurrentY();
  },
  methods: {
    selectItem(index) {
      this._getSubcategories(index);
    },
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
    },
    imgLoadOver() {
      this.$nextTick(() => {
        this.$refs.scroll.refresh();
      });
    },
    scrollPos(pos) {
      // 判断 back-top 是否显示
      this.isShow = Math.abs(pos.y) > 500;
    },

    /***
     * 请求数据
     */
    _getCategory() {
      getCategory().then((res) => {
        // 1.获取分类数据
        this.categories = res.data.category.list;
        this.$nextTick(() => {
          this.$refs.scrollLeft.refresh();
        });
        // 2.初始化每个类别的子数据
        for (let i = 0; i < this.categories.length; i++) {
          this.categoryData[i] = {
            subcategories: {},
            categoryDetail: {
              pop: [],
              new: [],
              sell: [],
            },
          };
        }
        // 3.请求第一个分类的数据
        this._getSubcategories(0);
      });
    },
    _getSubcategories(index) {
      this.currentIndex = index;
      const mailKey = this.categories[index].maitKey;
      getSubcategory(mailKey).then((res) => {
        this.categoryData[index].subcategories = res.data;
        this.categoryData = { ...this.categoryData };
        this._getCategoryDetail("pop");
        this._getCategoryDetail("sell");
        this._getCategoryDetail("new");
      });
    },
    _getCategoryDetail(type) {
      // 1.获取请求的miniWallkey
      const miniWallkey = this.categories[this.currentIndex].miniWallkey;
      // 2.发送请求,传入miniWallkey和type
      getCategoryDetail(miniWallkey, type).then((res) => {
        // 3.将获取的数据保存下来
        this.categoryData[this.currentIndex].categoryDetail[type] = res;
        this.categoryData = { ...this.categoryData };
      });
    },
  },
};
</script>

<style scoped>
#category {
  height: 100vh;
}

.nav-bar {
  background-color: var(--color-tint);
  font-weight: 700;
  color: #fff;
}

.content {
  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 49px;
  /* height: 100vh; */
  display: flex;
}

.leftContent {
  height: calc(100vh - 44px - 50px);
  overflow: hidden;
}
</style>