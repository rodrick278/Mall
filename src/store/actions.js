export default{
  // ctx:{commit, state}
  addCart({ commit, state }, payload) {
    let haveIndex = state.cartList.findIndex(element => element.iid == payload.obj.iid)
    if (haveIndex >= 0) {
      commit("addCounter", haveIndex)
    } else {
      commit("cartListPush", payload.obj)
    }

  }
}