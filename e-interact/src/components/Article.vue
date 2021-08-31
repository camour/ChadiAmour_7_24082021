<template>

    <div class="articleBlock">
        <div class="article">
            <div class="article__user">
                <p class="userName">{{ article.articleUserName }}</p>
            </div>
            <div class="article__post">
                <h3 class="articleSubject">{{ article.articleSubject }}</h3>
                <p v-show="article.articleUserName!=this.$store.state.user.userName" class="articleContent">{{ article.articleContent }}</p>
                <textarea v-show="article.articleUserName == this.$store.state.user.userName" class="articleContent" v-model="article.articleContent"></textarea>                    
            </div>
            <div v-show="this.$store.state.user.userName == article.articleUserName" class="articlesButtonsBlock" :id="'articlesButtonsBlock' + article.articleId">
                <div class="articlesButtons" :id="'articlesButtons' + article.articleId">                   
                    <button class="button" :id="'saveButton' + article.articleId" @click="saveArticle">save</button>
                    <button class="button" :id="'deleteButton' + article.articleId">delete</button>
                </div>
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
        methods: {
            saveArticle(){
                fetch('http://localhost:3000/api/articles/' + this.article.articleId, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                            userId: this.$store.state.user.userId,
                            articleSubject: this.article.articleSubject,
                            articleContent: this.article.articleContent,
                        })
                })
                .then(result => {
                    if(result.ok){
                        console.log('ARTICLE MODIFIE !'); 
                    }
                });
            }
        }     
    }

</script>

<style lang="scss">
    @font-face{
        font-family: 'KG';
        src: url('../../public/polices/KGEverSinceNewYork.ttf') format('truetype');
    }
    .articleBlock{
        margin-bottom: 30px;
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
        margin-bottom: 30px;
        display: flex;
        flex-wrap: wrap;
        padding: 0px;
        position: relative; 

        &__post{          
            width: 80%;
            .articleContent{
                width: 80%;
                margin: auto;
                height: 80px;
                text-align: center;
                padding: 10px;
                border: 1px #bdb2b2 solid; 
                border-radius: 1em;
                background-color: rgb(243, 239, 239);
                font-family: 'KG';
                font-size: 1.1em;
            }
        }
        &__user{
            width: 20%;
            border-radius: 1rem 0 0 1rem;
            box-shadow: 2px 2px 3px rgb(207, 106, 106);
            background: rgb(243, 239, 239);
        }
    }

    .articlesButtonsBlock{
        position: relative;
        width: 100%;
        margin-top: 20px;
        margin-bottom: 30px;
        .articlesButtons{            
            position: absolute;
            right: 0;
            width: 80%;
            text-align: center;
        }
        button{
            border: 1px rgb(223, 144, 196) solid;
            border-radius: 1rem;
            background-color: #ecbbbb;
            box-shadow: 1px 1px 3px rgb(223, 144, 196);
            font-weight: bolder;
            padding: 5px;
            margin-left: 6px;
            cursor: pointer;
        }      
    }

</style>