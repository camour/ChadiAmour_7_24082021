<template>
    <div>
        <div class="account">
            <div class="account__userInfos">
                <p> user name : {{ user.userName }}</p>
                <p> email : {{ email }}</p>
                <p> subscribing date : {{ displayRearangedDate }}</p>
                <p> posts : {{ postsNumber }}</p>
            </div>
            <div class="account__userImage" v-bind:style="{ backgroundImage: 'url('+user.image+')' }"></div>        
        </div>
        <button class="deleteAccount" @click="deleteAccount">Delete Account</button>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex';
    const apiCommunication = require('../../api/communication');

    export default{
        name: 'Account',
        data(){
            return{
                email: '',
                subscribingDate: '',
                postsNumber: 0
            }
        },
        computed: {
            ...mapState(['user']),
            //JS has buggy process when it comes to dates, so we make it up by this using the function below
            displayRearangedDate(){
                return this.subscribingDate.slice(0,19).replace('T', ' ');
            }
        },
        beforeMount(){
            // we retry user information to display it
            apiCommunication.send('http://' + process.env.VUE_APP_API_HOST + ':' + process.env.VUE_APP_API_PORT + '/api/auth/user/' + this.user.userId)
            .then(result => {
                if(result.ok){
                    return result.json();
                }
            })
            .then((apiResponse) => {
                if(apiResponse.user.email && apiResponse.user.subscribingDate){
                    this.email = apiResponse.user.email;
                    this.subscribingDate = apiResponse.user.subscribingDate;
                    this.postsNumber = apiResponse.user.postsNumber;
                }
            })
            .catch(error => {
                alert(error);
            });
        },
        methods: {
            ...mapActions(['setAuthentification']),
            deleteAccount(){                
                apiCommunication.send('http://' + process.env.VUE_APP_API_HOST + ':' + process.env.VUE_APP_API_PORT + '/api/auth/user/' + this.user.userId, 'DELETE', null)
                .then(result => {
                    if(result.ok){
                        return result.json();
                    }
                })
                .then(() => {
                    // once server successfully deleted user, we can clear local storage especially the token
                    localStorage.clear();
                    this.setAuthentification(false);
                    this.$router.push('/signIn');      
                })
                .catch();                      
            }
        }
    }
</script>

<style lang="scss">
    $mobile-breakpoint: 700px;
    @font-face{
        font-family: 'KG';
        src: url('../../../public/polices/KGEverSinceNewYork.ttf') format('truetype');
    }
    .account{
        width: 70%;
        margin: auto;
        display: flex;
        margin-top: 100px;
        justify-content: space-around;
        @media (max-width: $mobile-breakpoint){
            flex-direction: column-reverse;
            align-items: center;
        }
        p{
            margin-bottom: 30px;
            text-align: left;
        }
    }
    .account__userInfos{
        background-color: rgb(243, 224, 224);
        border: 0px;
        border-radius: 1em;
        padding: 20px;
        box-shadow: 3px 3px 2px black;
    }
    .account__userImage{
        border: 2px black solid;
        box-shadow: 3px 3px 2px black;
        width: 200px;
        height: 200px;
        background-position: center;
        background-size: cover;
        border-radius: 1em;
        @media(max-width: $mobile-breakpoint){
            margin-bottom: 20px;
        }
    }
    .deleteAccount{
        width: 200px;
        margin: auto;
        margin-top: 100px;
        margin-bottom: 100px;
        border: 1px black solid;
        border-radius: 1em;
        box-shadow: 3px 3px 2px black;
        background-color: red;
        font-family: 'KG';
        font-size: 1.2em;
        transform: scale(1.1);
        cursor: pointer;
        transition: all 1s;
        &:hover{
            transform: scale(1.2);
        }
    }
</style>
