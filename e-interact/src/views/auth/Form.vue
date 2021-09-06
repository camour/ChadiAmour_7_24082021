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

            <div>
                <button type="submit" id="submitButton" @click="sendForm">submit</button>
            </div>           
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
                if(!this.signUp && this.checkAllInputs()){  
                    apiCommunication.send('http://localhost:3000/api/auth/signIn', 'POST', {...tools.cleanText(this.$data)})
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
                    fetch('http://localhost:3000/api/auth/signUp', {
                        method: 'POST',
                        body: formData
                    })
                    .then(result => {
                        if(result.ok){
                            return result.json();
                        }
                    })
                    .then(() => {
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
            width: 110px;
            margin: auto;
            margin-top: 20px;
        }

    }
</style>