<template>
    <div class="comment">
        <div class="userComment">{{ comment.userName }}</div>
        <div class="commentContent">{{ comment.commentContent }}</div>
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
         .comment{
            display: flex;
            justify-content: space-between;
            font-size: 0.8em;
        }
</style>