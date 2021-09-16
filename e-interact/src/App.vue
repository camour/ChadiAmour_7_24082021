<template>
  <div id="app_vue">   
   
    <Header />
    <Jumbo />
    <router-view />     
    
  </div>
</template>

<script>
  import Header from './views/Header.vue';
  import Jumbo from './views/Jumbo.vue';
  export default{
    name: 'App',
    components: {
      Header,
      Jumbo
    },
  }
</script>

<style lang="scss">
  $mobile-breakpoint: 500px;
  @font-face{
    font-family: 'Bertha';
    src: url('../public/polices/BerthaMelanie.ttf') format('truetype');
  }
  #app_vue{    
    font-family: 'Bertha', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    position: relative;
    @media (max-width: $mobile-breakpoint) {
      width: 99%;
      margin: auto;
    }    
  }
</style>
