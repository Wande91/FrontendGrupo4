<template>
    <div>
        <main class="main">
            <div class="container">
                <div class="container">
                    <h1>Comunidades indigenas de Colombia</h1>
                </div>
                <form v-on:submit.prevent="processLogInUser" method="POST">
                        <img  class="img" src="FrontRepo/front/img/usuario.webp" alt="usuario">
                        <input type="text" v-model="user.username" placeholder="username">
                        <input type="password" v-model="user.password" placeholder="contraseña">
                        <button type="submit">Ingresar</button>
                        <button v-on:click= "soloVer"> solo ver </button>
                </form>
            </div>
       </main>

    </div>    
</template>

<script>
    import axios from 'axios';
    export default {
        name: "LogIn",
        
        data: function(){
            return {
                user: {
                    username:"",
                    password:""
                }
            }
        },
        methods: {
            processLogInUser: function(){
                axios.post(
                    "http://localhost:8000/login/",
                    this.user,
                    {headers: {}}
                )
                .then((result) => {
                    let dataLogIn = {
                        username     : this.user.username,
                        tokenAccess  : result.data.access,
                        tokenRefresh : result.data.refresh,
                    }
                    this.$emit('completedLogIn', dataLogIn)
                })
                .catch((error) => {
                    if (error.response.status == "401")
                        alert("ERROR 401: Credenciales Incorrectas.");
                });
            },

            soloVer: function(){
                this.$router.push({name: "depge"})
            }
        }
    }
</script>

<style>

    #cuerpo {
        display: grid;
        grid-template-columns: auto;
        grid-template-rows: 1fr 5fr 1fr;
    }

    main {
        /* background: linear-gradient(
            rgba(0, 0, 0, 0.7), 
            rgba(0, 0, 0, 0.7)),
          url(./img/fondopri.jpg); */
        background-color: white;    
        border-top-color: white;
        /* border-color: rgba(31, 37, 10, 0.651) rgba(0, 91, 170, 0); */
        /* border-style: groove; */
        /* border-width: 5px; */
        width: 100%;
        /* display: grid; */
        /* grid-template-columns: 1fr; */
        padding: 50px auto;
    }
    
    main h1{
        margin-top: 30px;
        width: 100%;
        text-align: center;
        font-size: 70px;
        /* color: white; */
        color: black;
    }

    form {
        display: grid;
        grid-template-rows: 1fr 1fr;
        align-content: center;
        padding: 5%;
        margin: 10px 20%;
    }
    form div{
        display: grid;
        grid-template-rows: auto;
        border-radius: 20px;
        padding: 5%;
        border-style: dotted;
        border-color: black;
    }
    
    .img {
        margin: auto;
        padding-bottom: 20px;
    }
    
    form input,button{
        text-align: center;
        border-radius: 50px;
        margin: 10px 10%;
        padding: 2%;
        }
    
    form button{
        padding: 2%;
        margin: auto;
    }

    form button:hover{
        color: #ffffff;
        background: #616060;
        border: 1px solid #a3319e;
    }

</style>
