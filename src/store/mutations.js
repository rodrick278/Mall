export default {
  // mutations内尽量放置简易的操作 所以做了简单重构
  addCounter(state, payload) {
    state.cartList[payload].count++
  },
  cartListPush(state, payload) {
    payload.count = 1
    payload.checked = false// 默认进入购物车不被选中
    state.cartList.push(payload)
  },
  allCheck(state, payload) {
    for (let item of state.cartList) {
      item.checked = payload.howCheck
    }
  }
}