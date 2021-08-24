<template>
    <div id="articles">

        <Article v-for="(article, index) in this.$store.state.articlesArray" 
        :article="article"
        :key="index"/>        

    </div>
    
</template>

<script>
    import Article from './Article.vue';
    export default{
        name: 'Articles',
        components: {
            Article            
        }
    }
</script>

<style lang="scss">

</style>
