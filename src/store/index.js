import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store =  new Vuex.Store({
  state: {
    repositories: [],
    errorMessage: null,
    user: null,
    currentSort: 'name',
    currentSortDir: 'asc',
    page: {
      current: 1,
      length: 6
    }
  },
  mutations: {
  },
  actions: {},
  getters: {
    getRepositories: ({repositories}) => repositories,
    getCurrentSort: ({currentSort}) => currentSort,
    getCurrentSortDir: ({currentSortDir}) => currentSortDir,
    getCurrentPage: ({page: {current} }) => current,
    getPageLength: ({page: {length } }) => length,
    getErrorMessage: ({errorMessage}) =>errorMessage,
  },
  modules: {

  }
})
export default store