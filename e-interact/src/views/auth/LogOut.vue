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
        },
        methods: {
            ...mapActions(['setAuthentification'])
        }
    };
</script>