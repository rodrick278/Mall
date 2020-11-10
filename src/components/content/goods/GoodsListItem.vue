<template>
  <div class="goods" @click="itemClick">
    <!-- 切换标签时不触发@load事件解决【img标签需要加:key 强制刷新】 -->
    <img v-lazy="imgUrl" alt="" @load="imgLoad" :key="imgUrl"/>
    <div class="goods-info">
      <p>{{ goodsItem.title }}</p>
      <span class="price">{{ goodsItem.price }}</span>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    imgUrl() {
      return this.goodsItem.image || this.goodsItem.show.img
    }
  },
  methods: {
    imgLoad() {
      // 这里使用事件总线$bus $bus和vuex区别在于$bus是用于管理事件的监听 vuex主要管理状态
      this.$bus.$emit("itemImgLoad");
    },
    itemClick() {
      // 跳转到详情页
      this.$router.push({
        path: "/detail",
        query: {
          iid: this.goodsItem.iid,
        },
      });
    },
  },
};
</script>

<style scoped>
.goods {
  padding-bottom: 40px;
  position: relative;
  width: 48vw;
}
.goods img {
  width: 100%;
  height: 100%;
  border-radius: 5px;
}

.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: "";
  position: absolute;
  display: inline-block;
  left: -15px;
  top: 0;
  width: 14px;
  height: 14px;
  background-color: red;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>