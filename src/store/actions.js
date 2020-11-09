export default {
  // ctx:{commit, state}
  addCart({ commit, state }, payload) {
    // actions是可以返回一个promise的
    return new Promise((resolve, reject) => {
      let haveIndex = state.cartList.findIndex(element => element.iid == payload.obj.iid)
      if (haveIndex >= 0) {
        commit("addCounter", haveIndex)
        resolve("数量+1")
      } else {
        commit("cartListPush", payload.obj)
        resolve("新的商品")
      }
    })

  }
}