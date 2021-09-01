<template>
    <div class="articles">
        <button class="newArticle">+ new article</button>
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
        }
    }
</script>

<style lang="scss">
    .articles{
        width: 600px;
        margin: auto;
        position: relative; 
        z-index: 1; 
    }
    .newArticle{
        border: 2px rgb(229, 201, 201) solid; 
        box-shadow: 2px 2px 3px rgb(243, 122, 122);
        border-radius: 1rem;
        position: fixed;
        z-index: 2;
        right: 200px;
        width: 150px;
        font-size: 1.1em;
    }
</style>
