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

            <div v-if="signUp">
                <label for="image">profile image</label>
                <input type="file" name="image" id="image" title=" "/>
            </div>


            <button type="submit" id="submitButton" @click="sendForm">submit</button>
          
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    const apiCommunication = require('../../api/communication');
    const tools = require('../../tools/tools');
    
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
            //checks wheter an input is validate using regex
            checkAllInputs(){
                let ok = true;
                for(let input of Object.keys(this.$data)){
                    if(!tools.checkInput(input)){
                        ok = false;
                        alert('Invalid syntax for ' + input);
                    }
                }
                return ok;
            },      
            sendForm(){
                //either we are signing in or we are signing up. Signing up requires a form data, which
                // implies a http post body a little bit different from regular http body                
                if(!this.signUp && this.checkAllInputs()){  
                    console.log('http://' + process.env.VUE_APP_API_HOST + ':' + process.env.VUE_APP_API_PORT + '/api/auth/signIn');
                    apiCommunication.send('http://' + process.env.VUE_APP_API_HOST + ':' + process.env.VUE_APP_API_PORT + '/api/auth/signIn', 'POST', {...tools.cleanText(this.$data)})
                    .then(result => {
                        if(result.ok){                        
                            return result.json();                          
                        }
                    })
                    .then( (apiResponse) => {
                        if(apiResponse.token && apiResponse.user.userId && apiResponse.user.userName && apiResponse.user.image){
                            this.setAuthentification(true);
                            localStorage.setItem('token', JSON.stringify(apiResponse.token));
                            localStorage.setItem('user', JSON.stringify(apiResponse.user));
                            this.setUser(apiResponse.user);
                            this.$router.push('/');                                              
                        }
                    })
                    .catch(() => {
                        alert('Invalid user or password');
                    });
                }else if(this.signUp && this.checkAllInputs()){    
                    let formData = new FormData();
                    formData.append('image', document.getElementById('image').files[0]);
                    formData.append('email', this.email.replace(/<\/?[^>]+(>|$)/g, ""));
                    formData.append('userName', this.userName.replace(/<\/?[^>]+(>|$)/g, ""));
                    formData.append('password', this.password.replace(/<\/?[^>]+(>|$)/g, ""));                   
                    fetch('http://' + process.env.VUE_APP_API_HOST + ':' + process.env.VUE_APP_API_PORT + '/api/auth/signUp', {
                        method: 'POST',
                        body: formData
                    })
                    .then(result => {
                        if(result.ok){
                            return result.json();
                        }
                    })
                    .then(() => {
                        //once signup process is ok, we redirect user to sign in page so he can log in
                        this.$router.push('/signIn');
                    })
                    .catch(error => {
                        alert(error);
                    });
                }
            }           
                
        }
    }
</script>

<style lang="scss">    
    .form{
        width: 420px;
        margin: auto;
        margin-top: 40px;
        display: flex;
        flex-direction: column;
   
        div{
            width: 80%;
            margin: auto;
            margin-top: 20px;
            display: flex;
            justify-content: space-between;            
        }

        button{
            align-self: center;
            width: 120px;
            margin-top: 50px;
            border: 1px rgb(223, 144, 196) solid;
            border-radius: 1rem;
            background-color: #ecbbbb;
            box-shadow: 1px 1px 3px rgb(223, 144, 196);
            font-weight: bolder;
            padding: 5px;
            margin-left: 6px;
            cursor: pointer;
            transition: all 1s;
            &:hover{
                transform: scale(1.1);
            }
        }

    }
</style>