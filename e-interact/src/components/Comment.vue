<template>
    <div class="commentBlock">
        <div class="commentButton"><button class="button">modify</button></div>
        <div class="comment">
            <div class="userComment">{{ comment.userName }}</div>
            <div class="commentContent">{{ comment.commentContent }}</div>
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
        display: flex;
        align-items: center;
        font-family: 'KG';
        //border: 3px rgb(190, 168, 230) solid;
        border: 3px rgb(234, 228, 245) solid;

        border-right: 0px;
        border-left: 0px;
        border-bottom: 0px;
        border-radius: 0 0 1rem 1rem;
        margin-top: 3px;
    }
    .comment{
        //position: relative;
        //right: -100px;     
        display: flex;
        align-items: center;
        font-size: 0.8em;
        width: 80%;
        padding: 10px;
        text-align: center;
        
    }
    .commentButton{
        width: 20%;
        .button{            
            border: 2px rgb(234, 228, 245) solid;
            background-color: white;

            &:hover{
                cursor: pointer;
            }
        }
    }
    .userComment{
        width: 20%;
        border: 1px rgb(234, 228, 245) solid;
        margin-right: 20px;
    }
    .commentContent{
        width: 80%;
        text-align: left;
        padding-left: 10px;
    }
</style>