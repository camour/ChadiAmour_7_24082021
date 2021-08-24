<template>
  <div id="app">   
   
    <Header />
    <router-view />
    
    
  </div>
</template>

<script>
  import Header from './views/Header.vue';
  export default{
    name: 'App',
    components: {
      Header
    },
  }
</script>

<style lang="scss">
  @font-face{
    font-family: 'Bertha';
    src: url('../public/polices/BerthaMelanie.ttf') format('truetype');
  }
#app {
  
  font-family: 'Bertha', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
