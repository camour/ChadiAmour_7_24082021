<template>
    <div>
        <div class="header">
                        
            <router-link to="/" class="header__brand">
                <div class="header__company">Groupomania</div>
                <div class="header__logo"></div> 
            </router-link>
            <div class="nav">
                <router-link v-show="!authentification" to="/signIn">Sign In</router-link>
                <router-link v-show="!authentification" to="/signUp">Sign Up</router-link>
                <router-link v-show="authentification" to="/">Home</router-link>
                <router-link v-show="authentification" to="/account">Account</router-link>
                <router-link v-show="authentification" to="/logOut">Log Out</router-link>               
            </div>
        </div>
    </div>
    
</template>

<script>
    import { mapState} from 'vuex';
    export default{
        name: 'Header',
        computed: {
            ...mapState(['authentification'])
        },
    }
</script>

<style lang="scss">
    .header{
        width: 420px;
        margin: auto;
        margin-top: 20px;
        margin-bottom: 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        
        &__brand{
            display: flex;
            align-items: center;
            text-decoration: none;

        }

        &__logo{
 
            width: 120px;
            height: 120px;
            margin-right: 45px;
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