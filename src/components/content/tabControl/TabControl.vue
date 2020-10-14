<template>
  <div class="tab-control">
    <div
      v-for="(item, index) in titles"
      :key="item"
      class="tab-control-item"
      :class="{ active: index === curIndex }"
      @click="itemClick(index)"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  data() {
    return {
      curIndex: 0,
    };
  },
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    itemClick(index) {
      this.curIndex=index
    },
  },
};
</script>

<style scoped>
.tab-control {
  display: flex;
  justify-content: space-around;
  padding-top: 10px;
  height: 2.5rem;
  
}

.tab-control-item span {
  font-size: 1rem;
}

.active span {
  color: var(--color-high-text);
  border-bottom: 3px solid var(--color-tint);
  padding: 5px;
}
</style>