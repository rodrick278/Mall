import Vue from 'vue'
import Vuex from 'vuex'

import mutations from "./mutations";
import actions from "./actions";

Vue.use(Vuex)

const state = {
  cartList: []
}
const getters = {
  cartLength(state) {
    return state.cartList.length
  },
  cartList(state){
    return state.cartList
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
  }
})
