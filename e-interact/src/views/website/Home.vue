<template>
  <div class="home">

    <div class="userImage"> 
      <img :src="user.image"/>
      <p>{{ user.userName }}</p>
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
      apiCommunication.send('http://localhost:3000/api/articles')
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
    .userImage{
      position: absolute;
      top: -150px;
      right: 20px;
      border: 2px black solid;
      box-shadow: 3px 3px 2px black;
    }
  }
</style>
