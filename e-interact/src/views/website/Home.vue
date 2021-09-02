<template>
  <div class="home">
     
    <Articles />
  
  </div>
</template>

<script>
  import Articles from '../../components/Articles.vue';
  export default {
    name: 'Home',
    components: {
      Articles
    },
    beforeMount(){
      fetch('http://localhost:3000/api/articles',{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
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
