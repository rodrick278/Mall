<template>
  <div id="tab-content-detail">
    <goods-list :goods="categoryDetail"></goods-list>
  </div>
</template>

<script>
import GoodsList from "components/content/goods/GoodsList";

export default {
  name: "TabContentDetail",
  components: {
    GoodsList,
  },
  props: {
    categoryDetail: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
#tab-content-detail {
  width: calc(100vw - 100px);
}
</style>
