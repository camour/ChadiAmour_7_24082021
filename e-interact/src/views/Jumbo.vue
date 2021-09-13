<template>
    <div class="jumbo">
        <div class= "jumbo__logo">
        </div>
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
    margin-bottom: 0px;
    transform: scale(2.2);
    .jumbo__logo{
        width: 100px;
        height: 100px;
        margin: auto;
        background-image: url('../../public/logo/eInteract.png');
        background-position: center;
        background-size: cover;
    }
}
</style>
