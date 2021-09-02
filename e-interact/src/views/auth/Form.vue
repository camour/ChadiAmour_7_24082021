<template>
    <div class="form">
            <div v-if="signUp">
                <label for="email">email</label>
                <input type="email" name="email" id="email" v-model="email"/>
            </div>

            <div>
                <label for="userName">user name</label>
                <input type ="text" name="userName" id="userName" v-model="userName"/>
            </div>

            <div>
                <label for="password">password</label>
                <input type ="password" name="password" id="password" v-model="password"/>
            </div>
            <div>
                <button type="submit" id="submitButton" @click="connect">submit</button>
            </div>           
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    export default{
        name: 'Form',
        props: {
            signUp: {
                type: Boolean
            }
        },
        data(){
            if(!this.signUp){
                return{
                    userName: 'test3',
                    password: 'test3'                
                };
            }
            else if(this.signUp){
                return{
                    email: 'test@gmail.com',
                    userName: 'test',
                    password: 'test'                
                };
            }
            
        },
        methods: {
            ...mapActions(['setAuthentification', 'setUser']),
            connect(){     
                const endPoint = this.signUp ? 'signUp' : 'signIn';
                fetch('http://localhost:3000/api/auth/' + endPoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                            ...this.$data
                    })
                })
                .then(result => {
                    if(result.ok){                        
                        return result.json();                          
                    }
                })
                .then( (apiResponse) => {
                    if(apiResponse.token && apiResponse.user.userId && apiResponse.user.userName){
                        this.setAuthentification(true);
                        localStorage.setItem('token', '123');
                        localStorage.setItem('user', JSON.stringify(apiResponse.user));
                        this.setUser(apiResponse.user);
                        this.$router.push('/');                                              
                    }else{
                        this.$router.push('/signIn');
                    }                     
                })
                .catch();
            }           
                
        }
    }
</script>

<style lang="scss">    
    .form{
        width: 400px;
        margin: auto;
        margin-top: 40px;
        display: flex;
        flex-direction: column;
   
        div{
            width: 70%;
            margin: auto;
            margin-top: 20px;
            display: flex;
            justify-content: space-between;            
        }
        button{
            width: 110px;
            margin: auto;
            margin-top: 20px;
        }

    }
</style>