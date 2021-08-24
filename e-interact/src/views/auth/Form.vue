<template>
    <div class="form">
            <div v-show="signUp">
                <label for="email">email</label>
                <input type="email" name="email" id="email" v-model="password"/>
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
    export default{
        name: 'Form',
        props: {
            signUp: {
                type: Boolean,
                default: false
            }
        },
        data(){
            if(!this.signUp){
                return{
                    userName: '',
                    password: ''                
                };
            }
            else if(this.signUp){
                return{
                    email: '',
                    userName: '',
                    password: ''                
                };
            }
            
        },
        methods: {
            connect(){     
                this.$store.dispatch('setAuthentification',true);
                localStorage.setItem('token', '123');
                this.$router.push('/');
                fetch('http://localhost:3000/api/auth', {
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
                .then(apiResponse => {
                    if(apiResponse.token){
                        this.$store.dispatch('setAuthentification',true);
                        localStorage.setItem('token', '123');
                        
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