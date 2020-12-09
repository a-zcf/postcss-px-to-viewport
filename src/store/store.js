import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './types'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    token: null,
    examineId:''
  },
  mutations: {
    [types.LOGIN]: (state, data) => {
      localStorage.token = data
      state.token = data
    },
    [types.EXAMINEID]: (state, data) => {
      localStorage.examineId = data
      state.examineId = data
    },
    [types.LOGOUT]: (state) => {
      localStorage.removeItem('token')
      state.token = null
    }
  }
})
