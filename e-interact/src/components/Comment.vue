<template>
    <div class="commentBlock">
        <div class="commentUserBlock">
            <div class="commentUser">{{ comment.commentUserName }}</div>
            <p class="commentDate">{{ displayRearangedDate }}</p>
        </div>
        <div class="comment">          
            <div v-show="this.user.userName!=comment.commentUserName" class="commentContent">{{ comment.commentContent }}</div>
            <textarea v-show="this.user.userName==comment.commentUserName" class="commentContent commentContentUser" :id="'commentContent' + comment.commentId" v-model="comment.commentContent"></textarea>           
            <div v-show="this.user.userName==comment.commentUserName" class="commentButtons">                
                <div class="buttonsBlock" :id="'buttonsBlock' + comment.commentId">                    
                    <button class="button" :id="'saveButton' + comment.commentId" @click="saveComment">save</button>
                    <button class="button" :id="'deleteButton' + comment.commentId" @click="deleteComment">delete</button>
                </div>
            </div>
        </div>        
    </div>    
</template>

<script>
    import { mapState, mapActions } from 'vuex';
    const apiCommunication = require('../api/communication');

    export default{
        name: 'Comment',
        props: {
            comment: {
                type: Object
            },
            commentIndex :{
                type: Number
            },
            articleIndex: {
                type: Number
            }
        },        
        computed: {
            ...mapState(['user', 'articlesArray']),
            displayRearangedDate(){
                return this.comment.commentPublishingDate.slice(0,19).replace('T', ' ');
            }
        },
        methods: {   
            ...mapActions(['saveCommentLocally', 'deleteCommentLocally']),         
            saveComment(){
                apiCommunication.send('http://' + process.env.VUE_APP_API_HOST + ':' + process.env.VUE_APP_API_PORT + '/api/comments/' + this.comment.commentId, 'PUT', {userId: this.user.userId, 
                comment: {commentContent: this.comment.commentContent, commentArticleId: this.articlesArray[this.articleIndex].articleId}})
                .then(() => {
                    this.saveCommentLocally({articleIndex: this.articleIndex, commentIndex: this.commentIndex, comment: this.comment});
                })
                .catch();
            },
            deleteComment(){
                apiCommunication.send('http://' + process.env.VUE_APP_API_HOST + ':' + process.env.VUE_APP_API_PORT + '/api/comments/' + this.comment.commentId, 'DELETE', 
                { userId: this.user.userId, comment: {commentArticleId: this.articlesArray[this.articleIndex].articleId}})
                .then(() => {
                    this.deleteCommentLocally({articleIndex: this.articleIndex, commentIndex: this.commentIndex});
                })
                .catch();
            }
        }
    }
</script>

<style lang="scss">
    $mobile-breakpoint: 700px;
    @font-face{
        font-family: 'KG';
        src: url('../../public/polices/KGEverSinceNewYork.ttf') format('truetype');
    }
    .commentBlock{
        position: relative;
        display: flex;
        align-items: center;
        font-family: 'KG';
        border: 3px rgb(234, 228, 245) solid;
        border-right: 0px;
        border-left: 0px;
        border-bottom: 0px;
        border-radius: 0 0 1rem 1rem;
    }

    .comment{
        position: relative; 
        display: flex;
        align-items: center;
        font-size: 0.9em;
        width: 78%;
        padding: 10px;
        text-align: center;
        border-left: 2px rgb(221, 144, 144) solid;
        overflow: hidden;        
    }
    .commentUserBlock{
        width: 22%;        
    }

    .commentUser{
        width: 90%;        
        margin: auto;
        margin-top: 8px;
        border: 1px rgb(234, 228, 245) solid;
    }
    .commentDate{               
        font-size: 0.8em;
        width: 95%;
        margin: auto;
    }
    .commentButtons{
        position: relative;
        width: 25%;
        height: 50px;        
        
        .buttonsBlock{           
            position: absolute;
            display: flex;
            justify-content: center;
            @media (max-width: $mobile-breakpoint){
                flex-direction: column;
            }
            top: 0;
            right: 0;
            transform: translateX(130%);
            transition: all 1s;
        }
        .button{            
            border: 1px rgb(223, 144, 196) solid;
            border-radius: 1rem;
            background-color: #ecbbbb;
            box-shadow: 1px 1px 3px rgb(223, 144, 196);
            font-weight: bolder;
            padding: 5px;
            margin-left: 6px;
            margin-bottom: 3px;
            cursor: pointer;
        }        
    }  
    .commentContent{
        width:70%;
        font-family: 'KG';
        border: 1px #bdb2b2 solid;
        border-radius: 1em;
        background-color: #f3efef;
        text-align: left;
        padding: 6px;
        
        &.commentContentUser:hover:not(:focus){
            box-shadow: 2px 2px 2px #313030;
            cursor: pointer;
        }
        &.commentContentUser:focus{            
            & + .commentButtons > .buttonsBlock{
                transform: translateX(-1%);
            }
        }
    }

</style>