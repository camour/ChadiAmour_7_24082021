<template>
    <div id="comment">
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
</style>