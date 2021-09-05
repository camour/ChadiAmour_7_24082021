<template>
    <div class="account">
        <div class="userInfos">
            <p> user name : {{ user.userName }}</p>
            <p> email : {{ email }}</p>
            <p> subscribing date : {{ displayRearangedDate }}</p>
        </div>
        <div class="userImage"><img :src=user.image alt="profile image"/> </div>
        
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    const apiCommunication = require('../../api/communication');

    export default{
        name: 'Account',
        data(){
            return{
                email: '',
                subscribingDate: ''
            }
        },
        computed: {
            ...mapState(['user']),
            displayRearangedDate(){
                return this.subscribingDate.slice(0,19).replace('T', ' ');
            }
        },
        beforeMount(){
            apiCommunication.send('http://localhost:3000/api/auth/user/' + this.user.userId)
            .then(result => {
                if(result.ok){
                    return result.json();
                }
            })
            .then((apiResponse) => {
                if(apiResponse.user.email && apiResponse.user.subscribingDate){
                    this.email = apiResponse.user.email;
                    this.subscribingDate = apiResponse.user.subscribingDate;
                }
            })
            .catch(error => {
                alert(error);
            });
        }
    }
</script>

<style lang="scss">
    .account{
        width: 70%;
        margin: auto;
        display: flex;
        justify-content: space-around;
        p{
            margin-bottom: 30px;
            text-align: left;
        }
    }
    .userImage{
        border: 2px black solid;
        box-shadow: 3px 3px 2px black;
    }
</style>
