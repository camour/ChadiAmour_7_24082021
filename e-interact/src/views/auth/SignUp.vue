<template>
    <div>
        <Form :signUp="true" />  
    </div>
</template> 

<script> 
    import Form from './Form.vue';
    export default{
        name: 'SignUp',
        components: {
            Form
        }
    }
</script>

