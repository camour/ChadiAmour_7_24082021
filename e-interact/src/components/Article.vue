<template>

    <div class="article">
        <div class="article__user">
            <p class="userName">{{ article.userName }}</p>
        </div>
        <div class="article__post">
            <h3 class="articleTitle">{{ article.articleTitle }}</h3>
            <p class="articleContent">{{ article.articleContent }}</p>
            <Comment v-for="(comment, index) in article.comment" :key="index"/>
        </div>        
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

<style lang="scss">
    .article{
        margin-bottom: 20px;
        display: flex;
        padding: 0px;
        box-shadow: 1px 1px 3px rgb(243, 122, 122);
        border-radius: 1rem;
        &:hover{
            border: 1px rgb(229, 201, 201) solid;            
            box-shadow: 4px 4px 5px rgb(243, 122, 122);
            z-index: 1000;
        }

        &__post{          
            width: 80%;
        }
        &__user{
            margin: 5px;
            width: 20%;
            border-radius: 1rem 0 0 1rem;
            box-shadow: 2px 2px 3px rgb(207, 106, 106);
            background: rgb(243, 239, 239);
        }
    }
</style>