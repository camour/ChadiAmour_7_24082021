<template>
    <div>
        <div class="header">
            <router-link v-show="!this.$store.state.authentification" to="/">Sign In</router-link>
            <router-link v-show="!this.$store.state.authentification" to="/signUp">Sign Up</router-link>
            <router-link v-show="this.$store.state.authentification" to="/home">Home</router-link>
            <router-link v-show="this.$store.state.authentification" to="/account">Account</router-link>
        </div>
    </div>
    
</template>

<script>
    export default{
        name: 'Header'        
    }
</script>

<style lang="scss">
    .header{
        width: 150px;
        margin: auto;
        display: flex;
        justify-content: space-between;
    }
</style>