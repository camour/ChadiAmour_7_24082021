<template>
    <div class="commentBlock">
        <div class="commentUserBlock">
            <div class="commentUser">{{ comment.commentUserName }}</div>
        </div>
        <div class="comment">          
            <div v-show="this.$store.state.user.userName!=comment.commentUserName" class="commentContent">{{ comment.commentContent }}</div>
            <textarea v-show="this.$store.state.user.userName==comment.commentUserName" class="commentContent commentContentUser" :id="'commentContent' + comment.commentId" v-model="comment.commentContent"></textarea>           
            <div v-show="this.$store.state.user.userName==comment.commentUserName" class="commentButtons">                
                <div class="buttonsBlock" :id="'buttonsBlock' + comment.commentId">                    
                    <button class="button" :id="'saveButton' + comment.commentId" @click="saveComment">save</button>
                    <button class="button" :id="'deleteButton' + comment.commentId" @click="deleteComment">delete</button>
                </div>
            </div>
        </div>
    </div>    
</template>

<script>
    export default{
        name: 'Comment',
        props: {
            comment: {
                type: Object
            }
        },
        methods: {
            saveComment(){

            },
            deleteComment(){
                
            }
        }
    }
</script>

<style lang="scss">
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
        width: 80%;
        padding: 10px;
        text-align: center;
        border-left: 2px rgb(221, 144, 144) solid;
        overflow: hidden;        
    }
    .commentButtons{
        position: relative;
        width: 25%;
        height: 35px;        
        
        .buttonsBlock{           
            position: absolute;
            display: flex;
            top: 0;
            right: 0;
            transform: translateX(130%);
            justify-content: center;
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
        cursor: pointer;
    }
        
        
    }
    

    .commentUserBlock{
        width: 20%;
    }

    .commentUser{
        width: 90%;
        margin: auto;
        border: 1px rgb(234, 228, 245) solid;
    }

    .commentContent{
        width:70%;
        font-family: 'KG';
        border: 1px #bdb2b2 solid;
        border-radius: 1em;
        background-color: #f3efef;
        text-align: left;
        padding-left: 10px;
        
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