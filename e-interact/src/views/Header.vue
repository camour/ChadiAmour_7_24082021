<template>
    <div>
        <div class="header">
            <div class="header__logo"></div>
            <div class="nav">
                <router-link v-show="!this.$store.state.authentification" to="/">Sign In</router-link>
                <router-link v-show="!this.$store.state.authentification" to="/signUp">Sign Up</router-link>
                <router-link v-show="this.$store.state.authentification" to="/home">Home</router-link>
                <router-link v-show="this.$store.state.authentification" to="/account">Account</router-link>
            </div>
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
        width: 380px;
        margin: auto;
        margin-top: 20px;
        margin-bottom: 40px;
        display: flex;
        justify-content: space-between;

        &__logo{
            width: 120px;
            height: 120px;
            background-image: url('../../images/icon.png');
            background-position: center;
            background-size: cover;
        }
    }

    .nav{
        width: 50%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        a{
            font-weight: bold;
            color: #2c3e50;
            display: block;

            &:hover{
                font-weight: bold;
                color: #42b983;              
            }
        }
    }
</style>