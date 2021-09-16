<template>
  <div class="home">

    <div class="home__user">
      <div class="home__userImage" v-bind:style="{ backgroundImage: 'url('+user.image+')' }">
      </div> 
      <p class="homme__userName">{{ user.userName }}</p>
    </div>   
      <Articles />
  
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import Articles from '../../components/Articles.vue';
  const apiCommunication = require('../../api/communication');
  
  export default {
    name: 'Home',
    components: {
      Articles
    },
    computed: {
      ...mapState(['user']),
    },
    methods: {
      ...mapActions(['fillArticlesArray']),
    },
    beforeMount(){
      //get all the articles fron server so we can display them
      apiCommunication.send('http://' + process.env.VUE_APP_API_HOST + ':' + process.env.VUE_APP_API_PORT + '/api/articles')
      .then(result => {
        if(result.ok){
          return result.json();
        }
      })
      .then(objectResult => {  
        // we store all the articles in our Vuex store      
        this.fillArticlesArray(objectResult.articlesArray);  
      })
      .catch();
    }
  }
</script>

<style lang="scss">
  $mobile-breakpoint: 700px;
  .home{
    position: relative;
    &__user{
      position: relative;      
      box-shadow: 3px 3px 2px black;
      padding: 5px;
      @media (max-width: $mobile-breakpoint){
        width: 200px;
        margin: auto;
        margin-top: 100px;
      }
      @media (min-width: $mobile-breakpoint){
        position: absolute;
        top: -150px;
        right: 20px; 
      }
    }
    &__userImage{     
      width: 150px;
      height: 150px;
      @media (max-width: $mobile-breakpoint){
        margin: auto;
      }      
      border-radius: 1em;
      box-shadow: 3px 3px 2px black;
      background-position: center;
      background-size: cover;      
    }
    &__userName{
        width: 150px;
        margin:auto;
        margin-top: 10px;

    }
  }
</style>
