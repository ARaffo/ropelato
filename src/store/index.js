import Vue from 'vue'
import Vuex from 'vuex'
import articulos from "./modules/articulos"
import clientes from "./modules/clientes"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    articulos,
    clientes
  }
})
