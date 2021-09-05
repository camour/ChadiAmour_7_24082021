import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state(){
    return{
      authentification: (JSON.parse(localStorage.getItem('token'))) ? true : false,
      user: (JSON.parse(localStorage.getItem('user'))) ? 
      {userId: JSON.parse(localStorage.getItem('user')).userId, userName: JSON.parse(localStorage.getItem('user')).userName, image: JSON.parse(localStorage.getItem('user')).image}
      : {userId: 0, userName: '', image: ''},
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
      state.user.image = payload.image;
    },
    FILL_ARTICLES_ARRAY(state, payload){
      state.articlesArray = payload;
    },
    SAVE_ARTICLE_LOCALLY(state, payload){
      state.articlesArray.splice(payload.articleIndex, 1, payload.article);
    },
    DELETE_ARTICLE_LOCALLY(state, payload){
      state.articlesArray.splice(payload.articleIndex, 1);
    },
    ADD_NEW_ARTICLE(state, payload){
      state.articlesArray.unshift(payload);
    },
    SAVE_COMMENT_LOCALLY(state, payload){
      state.articlesArray[payload.articleIndex].comments.splice(payload.commentIndex, 1, payload.comment);
    },
    DELETE_COMMENT_LOCALLY(state, payload){
      state.articlesArray[payload.articleIndex].comments.splice(payload.commentIndex, 1);
    },
    ADD_NEW_COMMENT(state, payload){
      state.articlesArray[payload.articleIndex].comments.unshift(payload.newCommentToAdd);
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
      if(payload.userId && payload.userName && payload.image){
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
    },
    saveCommentLocally({commit}, payload){
      if((payload.articleIndex >= 0) && (payload.comment) && (payload.commentIndex >= 0)){
        commit('SAVE_COMMENT_LOCALLY', payload);
      }
    },
    deleteCommentLocally({commit}, payload){
      if((payload.articleIndex >= 0) && (payload.commentIndex >= 0)){
        commit('DELETE_COMMENT_LOCALLY', payload);
      }
    },
    addNewComment({commit},  payload){      
      if((payload.articleIndex >= 0) && payload.newCommentToAdd){
        commit('ADD_NEW_COMMENT', payload);
      }
    }
  },
  modules: {
  }
})
