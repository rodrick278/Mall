<template>
  <div>
    <nav-bar>
      <template #left>
        <div class="left">
          <img src="~assets/img/common/back.svg" alt="" @click="goBack" />
        </div>
      </template>
      <template #center>
        <div class="titles">
          <div
            v-for="(item, index) in titles"
            :key="item"
            class="title-item"
            :class="{ active: curIndex === index }"
            @click="itemClick(index)"
          >
            {{ item }}
          </div>
        </div>
      </template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

export default {
  name: "DetailNavBar",
  components: {
    NavBar,
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      curIndex: 0,
    };
  },
  methods: {
    itemClick(index) {
      this.curIndex = index;
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.titles {
  display: flex;
}
.title-item {
  flex: 1;
}
.active {
  color: var(--color-high-text);
}
.left{
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>