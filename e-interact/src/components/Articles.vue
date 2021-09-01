<template>
    <div class="articles">

        <Article v-for="(article, index) in articlesArray" 
        :article="article"
        :index="index"
        :key="index"/>       
    </div>
    
</template>

<script>
    import { mapState } from 'vuex';
    import Article from './Article.vue';
    export default{
        name: 'Articles',
        components: {
            Article            
        },
        computed: {
            ...mapState(['articlesArray'])
        },
    }
</script>

<style lang="scss">
    .articles{
        width: 600px;
        margin: auto;
        position: relative;  
    }
</style>
