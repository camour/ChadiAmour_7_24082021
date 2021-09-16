<template>
    <div class="jumbo">
        <div class= "jumbo__logo">
        </div>
        <h1>The application for interaction</h1>
    </div>
</template>

<script>
    export default{
        name: 'Jumbo'
    };
</script>

<style lang="scss">
.jumbo{
    position: relative;
    width: 300px;
    margin: auto;
    margin-top: 0px;
    margin-bottom: 10px;
    transform: scale(2);
    .jumbo__logo{
        width: 100px;
        height: 100px;
        margin: auto;
        background-image: url('../../public/logo/eInteract.png');
        background-position: center;
        background-size: cover;
    }
    h1{
        width: 85%;
        margin: auto;
        font-size: 0.8em;
    }
}
</style>
