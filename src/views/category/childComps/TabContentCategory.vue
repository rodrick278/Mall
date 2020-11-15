<template>
  <div id="tab-content-category">
    <van-grid :column-num="3">
      <van-grid-item v-for="(item, index) in subcategories.list" :key="index">
        <a :href="item.link">
          <van-image :src="item.image" @load="imgLoad" />
          <div class="item-text">{{ item.title }}</div>
        </a>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
export default {
  name: "TabContentCategory",
  data() {
    return {
      count: 0,
    };
  },
  props: {
    subcategories: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  watch: {
    subcategories() {
      this.count = 0;
    },
  },
  methods: {
    imgLoad() {
      if (++this.count == this.subcategories.list.length) {
        this.$emit("imgLoadOver");
      }
    },
  },
};
</script>

<style scoped>
#tab-content-category {
  width: calc(100vw - 100px);
}

.item-text {
  /* margin-top: 15px; */
  text-align: center;
}
</style>
