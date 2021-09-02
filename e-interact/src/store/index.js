import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state(){
    return{
      authentification: (JSON.parse(localStorage.getItem('token'))) ? true : false,
      user:{
        userId: 0,
        userName: (JSON.parse(localStorage.getItem('user'))) ? JSON.parse(localStorage.getItem('user')).userName  : '',
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
    },
    SAVE_ARTICLE_LOCALLY(state, payload){
      state.articlesArray.splice(payload.index, 1, payload.article);
    },
    DELETE_ARTICLE_LOCALLY(state, payload){
      state.articlesArray.splice(payload.index, 1);
    },
    ADD_NEW_ARTICLE(state, payload){
      state.articlesArray.unshift(payload);
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
    },
    saveArticleLocally({commit}, payload){
      if(payload){
        commit('SAVE_ARTICLE_LOCALLY', payload);
      }
    },
    deleteArticleLocally({commit}, payload){
      if(payload){
        commit('DELETE_ARTICLE_LOCALLY', payload);
      }
    },
    addNewArticle({commit}, payload){
      if(payload){
        if(payload.articleId && payload.articleUserName && payload.articleSubject && payload.articleContent && payload.articlePublishingDate){
          commit('ADD_NEW_ARTICLE', payload);
        }
      }
    }
  },
  modules: {
  }
})
