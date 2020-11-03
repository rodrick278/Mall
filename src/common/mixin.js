import { debounce } from "common/utils";

export const itemListenerMixin = {
  data() {
    return {
      itemListener: null,
    }
  },
  mounted() {
    // 监听事件总线的图片加载事件
    const refresh = debounce(this.$refs.scroll?.refresh, 200);
    this.homeItemListener = () => {
      // 作用是可以在图片加载后重新计算现在可滚动区域的高度，避免图片还没加载结束就已经算好高度，或者切换类别的时候用上一个类别的高度
      refresh();
    };
    this.$bus.$on("itemImgLoad", this.homeItemListener);
  },
}