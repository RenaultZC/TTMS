import Vue from'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const state={
  user:{},
  login:true,
  ticket:{}
};
const mutations = {
  setUser(state,option){
    if(option){
      state.user = option;
      state.login = false;
    }else{
      state.user = {};
      state.login = true;
      state.ticket = {};
    }
  },
  setTicket(option){
    state.ticket = option;
  }
};
const getters = {

};
const actions = {

};
export default new Vuex.Store(
  {
    state:state,
    mutations:mutations
  }
);
