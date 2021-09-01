<template>

    <div class="articleBlock">
        <div class="article">
            <div class="article__user">
                <p class="userName">{{ article.articleUserName }}</p>
            </div>
            <div class="article__post">
                <h3 v-if="article.articleUserName != this.$store.state.user.userName" class="articleSubject">{{ article.articleSubject }}</h3>
                <input v-if="article.articleUserName == this.$store.state.user.userName" type="text" :id="'articleSubject' + article.articleId" class="articleSubject articleSubjectUser" v-model="article.articleSubject"/>
                <p v-if="article.articleUserName!=this.$store.state.user.userName" class="articleContent">{{ article.articleContent }}</p>
                <textarea v-if="article.articleUserName == this.$store.state.user.userName" class="articleContent articleContentUser" v-model="article.articleContent"></textarea>                    
                <div v-if="this.$store.state.user.userName == article.articleUserName" class="articleButtonsBlock" :id="'articleButtonsBlock' + article.articleId">
                    <div class="articleButtons" :id="'articleButtons' + article.articleId">                   
                        <button class="button" :id="'saveButton' + article.articleId" @click="saveArticle">save</button>
                        <button class="button" :id="'deleteButton' + article.articleId" @click="deleteArticle">delete</button>
                    </div>
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
            index: {
                type: Number
            },
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
                        return result.json(); 
                    }
                })
                .then(result => {
                    console.log(result);
                });
            },
            deleteArticle(){
                fetch('http://localhost:3000/api/articles/' + this.article.articleId,{
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        userId: this.$store.state.user.userId,
                        articleId: this.article.articleId
                    })
                })
                .then(result => {
                    if(result.ok){
                        return result.json();
                    }
                })
                .then(result => {
                    console.log(result);
                    this.$store.dispatch('deleteArticle', {index: this.index, articleId: this.article.articleId});
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
        position: relative;
        margin-bottom: 30px;        
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
        position: relative;
        margin-bottom: 30px;
        display: flex;
        flex-wrap: wrap;
        padding: 0px;         

        &__post{          
            width: 80%;
            .articleSubject{
                text-align: center;
                width: 200px;
                margin: auto;
                font-family: 'KG', sans-serif; 
                margin-top: 10px;
                margin-bottom: 10px;
                 
            }
            .articleSubjectUser{
                border-style: none;
                font-weight: bold;
            }
            .articleContent{
                width: 80%;
                margin: auto;
                height: 80px;
                text-align: center;
                padding: 10px;
                border: 1px #bdb2b2 solid; 
                border-radius: 1em;
                background-color: rgb(243, 239, 239);
                font-family: 'KG', sans-serif;
                font-size: 1.1em;
            }
        }
        &__user{
            width: 20%;
            border-radius: 1rem 0 0 1rem;
            box-shadow: 2px 2px 3px rgb(207, 106, 106);
            background: rgb(243, 239, 239);
        }
        .articleSubjectUser:hover:not(:focus), .articleContentUser:hover:not(:focus){
            cursor: pointer;
        }
    }

    .articleButtonsBlock{
        position: relative;
        margin-bottom: 30px;

        .articleButtons{         
            position: relative;
            width: 200px;
            margin: auto;
            text-align: center;
            transition: all 1s;
            opacity: 0.2;
            transform: translateY(130%);
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

    .articleSubject:focus{
        & + .articleContent + .articleButtonsBlock  > .articleButtons{
            opacity: 1;
        }
    }

    .articleContent:focus{
        & + .articleButtonsBlock > .articleButtons{
            opacity: 1;
        }
    }

</style>