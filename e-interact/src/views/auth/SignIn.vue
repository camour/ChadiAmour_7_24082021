<template>
    <div>
        <Form :signUp="false"/>        
    </div>
</template>

<script>
    import Form from './Form.vue';
    export default{
        name: 'SignIn', 
        components: {
            Form
        }  
    };
</script>