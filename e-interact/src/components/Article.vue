<template>

    <div class="articleBlock">
        <div class="article">
            <div class="article__user">
                <p class="userName">{{ article.userName }}</p>
            </div>
            <div class="article__post">
                <h3 class="articleSubject">{{ article.articleSubject }}</h3>
                <p class="articleContent">{{ article.articleContent }}</p>                     
            </div>            
        </div>
        <Comment v-for="(comment, index) in article.comments" :key="index" :comment="comment"/> 
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
        },           
    }

</script>

<style lang="scss">
    .articleBlock{
        margin-bottom: 50px;
        position: relative;
        border: 2px rgb(229, 201, 201) solid; 
        box-shadow: 2px 2px 3px rgb(243, 122, 122);
        border-radius: 1rem;
        padding-bottom: 1px;

        &:hover{
            border: 2px rgb(229, 201, 201) solid;            
            box-shadow: 4px 4px 5px rgb(243, 122, 122);
            transform: scale(1.01);
        }
    }
    .article{
        margin-bottom: 50px;
        display: flex;
        padding: 0px;  

        &__post{          
            width: 80%;

            .articleContent{
                text-align: center;
                padding-left: 10px;
            }
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