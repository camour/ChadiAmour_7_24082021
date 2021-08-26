<template>
    <div class="commentBlock">
        <div class="commentUserBlock"><div class="commentUser">{{ comment.userName }}</div></div>
        <div class="comment">          
            <div class="commentContent">{{ comment.commentContent }}</div>
            <div class="commentButtons">
                <button class=" button toolsButton">tools</button>
                <div class="buttonsBlock">                    
                    <button class="button">modify</button>
                    <button class="button">delete</button>
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
    
    .commentTitle{
        width: 100%;
        text-align: center;
              
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
        width: 20%;
        height: 35px;        
        
        .buttonsBlock{
            opacity: 0;
            position: absolute;
            top: 0;
            //right: -120%;
            transform: translateX(110%);
            display: flex;
            justify-content: center;
            transition: all 1.5s;
        }
        .toolsButton{
            transition: all 0.3s;
            &:focus{
                opacity: 0;
                & + .buttonsBlock{
                    opacity: 1;
                    transform: translateX(-10%);
                }
            }
        }
        .button{            
            border: 2px rgb(137, 103, 204) solid;
            border-radius: 1rem;
            background-color: rgb(236, 187, 187);
            padding: 5px;
            margin-left: 6px;

            &:hover{
                cursor: pointer;
            }
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
        width: 80%;
        text-align: left;
        padding-left: 10px;
    }
</style>