<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "@better-scroll/core";
import Pullup from "@better-scroll/pull-up";

BScroll.use(Pullup);

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    // 保证在DOM渲染完毕后初始化better-scroll
    this.$nextTick(() => this._initScroll());
  },
  methods: {
    _initScroll() {
      if (!this.$refs.wrapper) {
        return;
      }
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad,
      });

      this.scroll.on("scroll", (pos) => {
        this.$emit("scroll", pos);
      });

      if (this.pullUpLoad) {
        this.scroll.on("pullingUp", () => {
          this.$emit("pullingUp");
        });
      }
    },
    scrollTo(x, y, time = 300) {
      this.scroll?.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll?.finishPullUp();
    },
    refresh() {
      this.scroll?.refresh();
    },
    getCurrentY(){
      return this.scroll.y
    }
  },
};
</script>

<style scoped>
</style>