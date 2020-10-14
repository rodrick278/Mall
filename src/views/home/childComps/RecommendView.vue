<template>
  <div class="recommend">
    <div
      v-for="(item, index) of recommends"
      :key="index"
      class="recommend-item"
    >
      <a :href="item.link">
        <img :src="item.image" alt="" />
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendView",
  props: {
    recommends: {
      type: Array,
      defalut() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.recommend {
  display: flex;
}
.recommend-item {
  flex: 1;
  text-align: center;
  padding: 10px 1vw 20px;
  border-bottom: 8px solid #eee;
}

.recommend-item img {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  margin-bottom: 0.6rem;
}
</style>