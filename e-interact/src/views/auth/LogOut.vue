<template>
    <div>You are logged out !</div>  
</template>

<script>
    import { mapActions } from 'vuex';
    export default{
        name: 'LogOut',
        beforeMount(){
            localStorage.removeItem('token');
            this.setAuthentification(false);
            this.$router.push('/');
        },
        methods: {
            ...mapActions(['setAuthentification'])
        }
    };
</script>



<!--<script>
    import { mapActions } from 'vuex';
 
    export default{             
        name: 'LogOut',
        methods:{
            ...mapActions(['setAuthentification'])
        },
        beforeMount(){            
            localStorage.removeItem('token');
            /*setTimeout(function(){
                this.setAuthentification(false);
                //this.$router.push('/');
            }, 3000);*/
        }
    }
</script>-->