<template>
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
    $mobile-breakpoint: 700px;    
    .header{
        width: 600px;
        display: flex;
        @media (max-width: $mobile-breakpoint) {
            width: 99%;
            flex-direction: column;
            margin-bottom: 70px;
        }
        margin: auto;
        margin-top: 20px;
        margin-bottom: 10px;        
        justify-content: space-between;
        align-items: center;
        
        &__brand{
            width: 40%;
            display: flex;
            @media (max-width: $mobile-breakpoint) {
                width: 99%;
                margin: auto;
                justify-content: center;
            }            
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
        width: 60%;
        display: flex;
        justify-content: space-around;
        @media (max-width: $mobile-breakpoint) {
            margin: auto;
        }         
        align-items: center;
        .router-link-exact-active{
            color: #c01010;
        }
        a{
            font-weight: bold;
            color: #2c3e50;
            display: block;
            text-decoration: none;
            &:hover{
                font-weight: bold;
                text-decoration: underline;            
            }
        }
    }
</style>