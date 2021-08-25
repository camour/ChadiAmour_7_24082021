import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state(){
    return{
      authentification: (JSON.parse(localStorage.getItem('token'))) ? true : false,
      user:{
        id: 0,
        userName: 'Me02',
        lastName: '',
        firstName: '',
        job: ''
      },
      articlesArray: [{userName: 'Mike02',
                      articleId: 12345,
                      articleTitle: 'Vue JS',
                      articleContent: 'Le framework Vue JS offre la possibilite d\'implementer un router',
                      comments: [{
                        userName: 'Cath_90',
                        commentId: 3445,
                        commentContent: 'Oui et tu as même la possibilité d\'ajouter un data store centralisé'
                        }]
                      },
                      {userName: 'James_Br',
                      articleId: 12346,
                      articleTitle: 'RH mouvements',
                      articleContent: 'Remaniement du département RH avec notamment l\'arrivée d\'une manager compétente',
                      comments: [{
                        userName: 'MilerM',
                        commentId: 3454,
                        commentContent: 'On vous souhaite plein de courage pour cette nouvelle équipe',
                      },
                      {
                        userName: 'Diana6',
                        commentId: 5634,
                        commentContent: 'Oui je rejoins Miler sur ce point et n\'hésitez pas en cas de question'
                      }],
                      },
                      { userName: 'Nic_BOp',
                        articleId: 12347,
                        articleTitle: 'JO 2021',
                        articleContent: 'Quelle performance du Toulousain pour la filière Aviron',
                        comments: [{
                            userName: 'Santos2',
                            commentContent: 'Oui ce sport n\'est pas très médiatisé et pourtant il mérite de l\'être tout autant que d\'autres'
                        }],
                      }
                    ]
    }
  },
  mutations: {
    ENABLE_AUTHENTIFICATION(state){
      state.authentification = true;
    },
    DISABLE_AUTHENTIFICATION(state){
      state.authentification = false;
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
    }
  },
  modules: {
  }
})
