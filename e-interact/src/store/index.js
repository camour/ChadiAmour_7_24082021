import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state(){
    return{
      authentification: (JSON.parse(localStorage.getItem('token'))) ? true : false,
      user:{
        userId: 0,
        userName: '',
        lastName: '',
        firstName: '',
        job: ''
      },
      articlesArray: []
    }
  },
  mutations: {
    ENABLE_AUTHENTIFICATION(state){
      state.authentification = true;
    },
    DISABLE_AUTHENTIFICATION(state){
      state.authentification = false;
    },
    SET_USER(state, payload){
      state.user.userId = payload.userId;
      state.user.userName = payload.userName;
    },
    FILL_ARTICLES_ARRAY(state, payload){
      state.articlesArray = payload;
    }
  },
  actions: {
    setAuthentification({commit}, payload=false){
      if(payload){
        commit('ENABLE_AUTHENTIFICATION');
      }
      else if(!payload){
        commit('DISABLE_AUTHENTIFICATION');
      }
    },
    setUser({commit}, payload){
      if(payload.userId && payload.userName){
        commit('SET_USER', payload);
      }
    },
    fillArticlesArray({commit}, payload = []){
      if(payload){
        commit('FILL_ARTICLES_ARRAY', payload);
      }
    }
  },
  modules: {
  }
})
