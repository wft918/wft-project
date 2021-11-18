import Vue from "vue";
import Vuex from "vuex";
import modules from './modules/common'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  getters: {},
  modules: {
    modules
  },
});
