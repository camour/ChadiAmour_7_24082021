<template>
  <div class="home">

    <div class="home__user">
      <div class="home__userImage" v-bind:style="{ backgroundImage: 'url('+user.image+')' }">
      </div> 
      <p>{{ user.userName }}</p>
    </div>     
    <Articles />
  
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import Articles from '../../components/Articles.vue';
  const apiCommunication = require('../../api/communication');
  require('dotenv').config();
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
      apiCommunication.send('http://' + process.env.API_HOST + ':' + process.env.API_PORT + '/api/articles')
      .then(result => {
        if(result.ok){
          return result.json();
        }
      })
      .then(objectResult => {        
        this.fillArticlesArray(objectResult.articlesArray);  
      })
      .catch();
    }
  }
</script>

<style lang="scss">
  .home{
    position: relative;
    &__user{
      position: absolute;
      top: -150px;
      right: 20px; 
      border-radius: 1em;
      box-shadow: 3px 3px 2px black;
      padding: 5px;
    }
    &__userImage{     
      width: 150px;
      height: 150px;
      border-radius: 1em;
      box-shadow: 3px 3px 2px black;
      background-position: center;
      background-size: cover;     
    }
  }
</style>
