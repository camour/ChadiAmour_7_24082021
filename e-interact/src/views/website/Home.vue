<template>
  <div class="home">
     
    <Articles />
  
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import Articles from '../../components/Articles.vue';
  export default {
    name: 'Home',
    components: {
      Articles
    },
    computed: {
      ...mapState(['user']),
    },
    beforeMount(){
      fetch('http://localhost:3000/api/articles',{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token'))
        }
      })
      .then(result => {
        if(result.ok){
          return result.json();
        }
      })
      .then(objectResult => {        
        this.$store.dispatch('fillArticlesArray', objectResult.articlesArray);  
      })
      .catch();
    }
  }
</script>

<style lang="scss">
  .home{
    position: relative;  
  }
</style>
