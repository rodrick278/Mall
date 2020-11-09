<template>
  <div class="cart-bottom-bar">
    <div class="check-content">
      <check-button
        class="check-button"
        :isCheck="isCheckAll"
        @click.native="allCheckClick"
      ></check-button>
      <span>全选</span>
    </div>

    <div class="price">合计：￥{{ totalPrice }}</div>

    <div class="calc" @click="checkClick">去结算({{ checkLength }})</div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";

import { mapGetters } from "vuex";

export default {
  name: "CartBottomBar",
  components: {
    CheckButton,
  },
  computed: {
    ...mapGetters(["cartList", "cartLength"]),
    totalPrice() {
      return this.cartList.reduce((pre, cur) => {
        return pre + (cur.checked ? cur.count * cur.newPrice : 0);
      }, 0);
    },
    checkLength() {
      return this.cartList.filter((item) => {
        return item.checked;
      }).length;
    },
    isCheckAll() {
      return (
        this.cartLength != 0 && this.cartList.every((item) => item.checked)
      );
    },
  },
  methods: {
    allCheckClick() {
      this.$store.commit({
        type: "allCheck",
        howCheck: !this.isCheckAll,
      });
    },
    checkClick(){
      this.$toast.fail({
        message: "施工中🚧...",
      });
    }
  },
};
</script>

<style scoped>
.cart-bottom-bar {
  height: 50px;
  position: relative;
  background-color: #eee;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.check-content {
  display: flex;
  align-items: center;
  width: 20vw;
}
.check-button {
  width: 20px;
  height: 20px;
  margin: 0 5px 0 5px;
}
.price {
  width: 50vw;
  text-align: left;
  margin-left: 10px;
}
.calc {
  width: 30vw;
  margin-right: 10px;
  background-color: #fa441d;
  color: #fff;
  line-height: 40px;
  text-align: center;
  border-radius: 20px;
}
</style>