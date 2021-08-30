import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state(){
    return{
      authentification: (JSON.parse(localStorage.getItem('token'))) ? true : false,
      user:{
        id: 0,
        userName: 'Cath_90',
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
    FILL_ARTICLES_ARRAY(state, payload){
      state.articlesArray = payload.articlesArray;
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
    fillArticlesArray({commit}, payload){
      if(payload.articlesArray){
        commit('FILL_ARTICLES_ARRAY', payload);
      }
    }
  },
  modules: {
  }
})
