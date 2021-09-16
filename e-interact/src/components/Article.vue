<template>

    <div class="articleBlock">
        <div class="article">
            <div class="article__user">
                <p class="userName">{{ article.articleUserName }}</p>
                <p class="userImage" v-bind:style="{ backgroundImage: 'url('+this.article.articleUserImage+')' }"></p>
                <p>{{ displayRearangedDate }}</p>
            </div>
            <div class="article__post">
                <h3 v-if="article.articleUserName != user.userName" class="articleSubject">{{ article.articleSubject }}</h3>
                <input v-if="article.articleUserName == user.userName" type="text" :id="'articleSubject' + article.articleId" class="articleSubject articleSubjectUser" v-model="article.articleSubject" @focus="enableButtons"/>
                <p v-if="article.articleUserName!= user.userName" class="articleContent">{{ article.articleContent }}</p>
                <textarea v-if="article.articleUserName == user.userName" class="articleContent articleContentUser" v-model="article.articleContent" @focus="enableButtons"></textarea>                    
                <div v-if="user.userName == article.articleUserName" class="articleButtonsBlock" :id="'articleButtonsBlock' + article.articleId">
                    <div class="articleButtons" :id="'articleButtons' + article.articleId">                   
                        <button class="button" :id="'saveButton' + article.articleId" disabled @click="saveArticle">save</button>
                        <button class="button" :id="'deleteButton' + article.articleId" disabled @click="deleteArticle">delete</button>
                    </div>
                </div>   
            </div>                     
        </div>
        <Comment v-for="(comment, commentIndex) in article.comments" :key="commentIndex" :comment="comment" :commentIndex="commentIndex" :articleIndex="articleIndex"/>
        <button id="newCommentButton" v-show="!showNewCommentTextArea" @click="enableNewCommentTextArea">+ new comment</button>
        <div class="newCommentBlock" v-show="showNewCommentTextArea">
            <textarea class="newCommentContent" v-model="newCommentContent">comment...</textarea>
            <div class="newCommentButtonsBlock">   
                <button @click="saveNewComment">save</button>
                <button @click="cancelNewComment">cancel</button>
            </div>
            <hr>
        </div>        
    </div>
    
</template>

<script>
    import { mapState, mapActions } from 'vuex';
    import Comment from './Comment.vue';
    const apiCommunication = require('../api/communication');
    
    export default{
        name: 'Article',
        components: {
            Comment
        },        
        props: {
            articleIndex: {
                type: Number
            },
            article: {
                type: Object,
            }
        },
        data(){
            return {
                showNewCommentTextArea: false,
                newCommentContent: ''
            }
        },
        computed: {
            ...mapState(['user']),
            displayRearangedDate(){
                return this.article.articlePublishingDate.slice(0,19).replace('T', ' ');
            }            
        },
        methods: {           
            ...mapActions(['saveArticleLocally', 'deleteArticleLocally', 'addNewComment']),
            enableButtons(){
                document.getElementById('saveButton'+this.article.articleId).removeAttribute('disabled');
                document.getElementById('deleteButton'+this.article.articleId).removeAttribute('disabled');
            },
            disableButtons(){
                document.getElementById('saveButton'+this.article.articleId).setAttribute('disabled', true);
                document.getElementById('deleteButton'+this.article.articleId).setAttribute('disabled', true);
            },
            saveArticle(){
                apiCommunication.send('http://' + process.env.VUE_APP_API_HOST + ':' + process.env.VUE_APP_API_PORT + '/api/articles/' + this.article.articleId, 'PUT',{
                            userId: this.user.userId,
                            article: { 
                                articleSubject: this.article.articleSubject,
                                articleContent: this.article.articleContent
                            }                          
                })
                .then(result => {
                    if(result.ok){
                        return result.json(); 
                    }
                })
                .then(() => {
                    this.saveArticleLocally({articleIndex: this.articleIndex, article: this.article});
                    this.disableButtons();
                });
            },
            deleteArticle(){
                apiCommunication.send('http://' + process.env.VUE_APP_API_HOST + ':' + process.env.VUE_APP_API_PORT + '/api/articles/' + this.article.articleId, 'DELETE',{ userId: this.user.userId})
                .then(result => {
                    if(result.ok){
                        return result.json();
                    }
                })
                .then(() => {
                    this.deleteArticleLocally({articleIndex: this.articleIndex, articleId: this.article.articleId});
                    this.disableButtons();
                });
            },
            enableNewCommentTextArea(){
                this.showNewCommentTextArea = true;
            },
            saveNewComment(){                
                this.showNewCommentTextArea = false;                
                let newCommentToAdd = {
                    commentContent: this.newCommentContent,
                    commentPublishingDate: new Date().toISOString().slice(0,19).replace('T', ' ')
                };
                apiCommunication.send( 'http://' + process.env.VUE_APP_API_HOST + ':' + process.env.VUE_APP_API_PORT + '/api/comments/' + this.article.articleId, 'POST', { userId: this.user.userId, newCommentToAdd})
                .then(result => {
                    if(result.ok){
                        return result.json();
                    }
                })
                .then(result => {
                    newCommentToAdd.commentUserName = this.user.userName;
                    newCommentToAdd.commentId = result.commentId;
                    this.addNewComment({articleIndex: this.articleIndex, newCommentToAdd});
                    this.newCommentContent='';
                })
                .catch();
            },
            cancelNewComment(){
                this.showNewCommentTextArea = false;
            },
        }
    }

</script>

<style lang="scss">
    $mobile-breakpoint: 500px;
    @font-face{
        font-family: 'KG';
        src: url('../../public/polices/KGEverSinceNewYork.ttf') format('truetype');
    }
    .articleBlock{
        position: relative;
        @media (max-width: $mobile-breakpoint){
            width: 99%;
            margin: auto;
            margin-bottom: 50px;       
        }
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
        @media (max-width: $mobile-breakpoint){
            flex-direction: column;
        }
        padding: 0px;         

        &__post{          
            @media (min-width: $mobile-breakpoint){
                width: 78%;
            }            
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
                @media (min-width: $mobile-breakpoint){
                     height: 80px;
                }
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
            border-radius: 1rem 1rem 0 0;
            @media (min-width: $mobile-breakpoint){            
                width: 22%;
                border-radius: 1rem 0 0 1rem;
            }
            box-shadow: 2px 2px 3px rgb(207, 106, 106);
            background: rgb(243, 239, 239);
            .userImage{
                width: 150px;
                height: 150px;
                background-position: center;
                background-size: cover;
                margin: auto;
                box-shadow: 4px 4px 2px rgb(19, 18, 18);
                border-radius: 1em;
            }
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
        }      
    }

    .articleSubject:focus{
        & + .articleContent + .articleButtonsBlock  > .articleButtons{
            opacity: 1;
            button{
                cursor: pointer;
            }
        }
    }

    .articleContent:focus{
        & + .articleButtonsBlock > .articleButtons{
            opacity: 1;
            button{
                cursor: pointer;
            }
        }
    }

    #newCommentButton{       
        box-shadow: 2px 2px 3px black;
        border: 2px black solid;
        background-color: #f89e9e;
        border-radius: 10rem;
        position: relative;
        width: 130px;
        margin: auto;
        margin-top: 30px;
        margin-bottom: 30px;
        padding: 3px;
        font-size: 0.9;
        font-weight: bold;
        cursor: pointer;
        &:hover{
            transform: scale(1.1);
        }
    }
    .newCommentBlock{
        margin-top: 20px;

        button{
            border: 1px rgb(223, 144, 196) solid;
            border-radius: 1rem;
            background-color: #ecbbbb;
            box-shadow: 1px 1px 3px rgb(223, 144, 196);
            font-weight: bolder;
            padding: 5px;
            margin-left: 6px;
            cursor: pointer;
            margin-bottom: 20px;
        }
        textarea{
            width: 80%;
            margin: auto;
            height: 100px;
            text-align: center;
            border: 1px #bdb2b2 solid; 
            border-radius: 1em;
            background-color: rgb(243, 239, 239);
            font-family: 'KG', sans-serif;
            font-size: 1.1em;
            overflow: hidden;
        }
    }

</style>