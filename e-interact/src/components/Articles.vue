<template>
    <div class="articles">
        <button id="newArticle" v-show="!showTextArea" @click="enableTextArea">+ new article</button>
        <div class="newArticleBlock" v-show="showTextArea">
            <label for="newArticleSubject">subject</label>
            <input type="text" id="newArticleSubject" class="newArticleSubject" v-model="newArticle.subject" placeholder="article subject"/>
            <label for="newArticleContent">content</label>
            <textarea id="newArticleContent" class="newArticleContent" v-model="newArticle.content" placeholder="article body"></textarea>
            <div class="newArticleButtonsBlock">   
                <button @click="saveNewArticle">save</button>
                <button @click="cancelNewArticle">cancel</button>
            </div>
            <hr>
        </div>
        <Article v-for="(article, articleIndex) in articlesArray" 
        :article="article"
        :articleIndex="articleIndex"
        :key="articleIndex"/>      
    </div>
    
</template>

<script>
    import { mapState, mapActions } from 'vuex';
    import Article from './Article.vue';
    const apiCommunication = require('../api/communication');

    export default{
        name: 'Articles',
        components: {
            Article            
        },
        data(){
            return{
                showTextArea: false,
                newArticle: {
                    subject: '',
                    content: ''
                }
            }
        },
        computed: {
            ...mapState(['user', 'articlesArray'])
        },
        methods: {
            ...mapActions(['addNewArticle']),
            enableTextArea(){
                this.showTextArea = true;
            },
            saveNewArticle(){
                this.showTextArea = false;
                let newArticleToAdd = {                        
                        articleSubject: this.newArticle.subject,
                        articleContent: this.newArticle.content,
                        articlePublishingDate: new Date().toISOString().slice(0,19).replace('T', ' '),
                    };
                apiCommunication.send('http://' + process.env.VUE_APP_API_HOST + ':' + process.env.VUE_APP_API_PORT + '/api/articles', 'POST', { userId: this.user.userId, newArticleToAdd})
                .then(result => {
                    if(result.ok){
                        return result.json();
                    }
                })
                .then(result => {
                    newArticleToAdd.articleId = result.articleId;
                    newArticleToAdd.articleUserImage = this.user.image;
                    newArticleToAdd.comments = new Array();
                    // if and only if API return success, we can add userName to new Article object
                    // so userName is not transmitted through network 
                    //(to prevent from MAN IN THE MIDDLE ATTACK)
                    newArticleToAdd.articleUserName = this.user.userName;
                    this.addNewArticle(newArticleToAdd);
                    this.newArticle.subject = '';
                    this.newArticle.content = '';
                });
            },
            cancelNewArticle(){
                this.showTextArea = false;
            }
        }
    }
</script>

<style lang="scss">
    $mobile-breakpoint: 700px;
    @font-face{
        font-family: 'KG';
        src: url('../../public/polices/KGEverSinceNewYork.ttf') format('truetype');
    }
    .articles{
        width: 800px;
        margin: auto;
        margin-top: 100px;
        @media (max-width: $mobile-breakpoint){
            width: 99%;
        }    
        position: relative; 
    }
    #newArticle{
        //border: 2px rgb(229, 201, 201) solid; 
        //box-shadow: 2px 2px 3px rgb(243, 122, 122);
        box-shadow: 2px 2px 3px black;
        border: 2px black solid;
        background-color: rgb(240, 120, 120);
        border-radius: 10rem;
        position: relative;
        width: 150px;
        margin: auto;
        margin-bottom: 30px;
        font-size: 1.1em;
        cursor: pointer;
        &:hover{
            transform: scale(1.02);
        }
    }

    .newArticleBlock{
        width: 400px;
        margin: auto;
        @media (max-width: $mobile-breakpoint){
            width: 99%;
        }       
        margin-bottom: 30px;
        display: flex;
        flex-direction: column;
        input{
            display: block;
            margin:auto;
            margin-bottom: 20px;
            width: 80%;
            text-align: center;
            font-family: 'KG', sans-serif;
            font-size: 1.1em;
        }
        textarea{
            width: 80%;
            margin: auto;
            height: 100px;
            text-align: center;
            border: 1px #bdb2b2 solid; 
            border-radius: 1em;
            background-color: rgb(243, 239, 239);
            font-family: 'KG', sans-serif;
            font-size: 1.1em;
            overflow: hidden;
        }
        hr {
            border: 0px black solid;
            clear:both;
            display:block;
            width: 96%;               
            background-color:#1a1a18;
            height: 1px;
        }
        .newArticleButtonsBlock{   
            margin-top: 10px;
            margin-bottom: 10px;     
            button{
                border: 1px rgb(223, 144, 196) solid;
                border-radius: 1rem;
                background-color: #ecbbbb;
                box-shadow: 1px 1px 3px rgb(223, 144, 196);
                font-weight: bolder;
                padding: 5px;
                margin-left: 6px;
                cursor: pointer;
            }
        }
    }    
</style>
