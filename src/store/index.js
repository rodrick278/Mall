import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartList: []
  },
  mutations: {
    addCart(state, payload) {
      let haveIndex = state.cartList.findIndex(element => element.iid == payload.obj.iid)
      if (haveIndex >= 0) {
        state.cartList[haveIndex].count++
      } else {
        payload.obj.count = 0
        state.cartList.push(payload.obj)
      }

    }
  },
  actions: {
  },
  modules: {
  }
})
