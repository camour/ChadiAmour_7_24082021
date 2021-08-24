<template>

    <div id="article">
        <div class="userPost">{{ article.userName }}</div>
        <h3 class="articleTitle">{{ article.articleTitle }}</h3>
        <p class="articleContent">{{ article.articleContent }}</p>
        <Comment v-for="(comment, index) in article.comment" :key="index"/>
        <hr>
    </div>
    
</template>

<script>
    import Comment from './Comment.vue';
    export default{
        name: 'Article',
        components: {
            Comment
        },
        props: {
            article: {
                type: Object,
            }
        }    
    }

</script>