export default{
   // mutations内尽量放置简易的操作 所以做了简单重构
   addCounter(state, payload) {
    state.cartList[payload].count++
  },
  cartListPush(state, payload) {
    payload.count = 0
    state.cartList.push(payload)
  }
}