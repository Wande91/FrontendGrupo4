<template>
    <main class="ingreso">
        <div class="container">
            <div class="container2">
                <h1>Comunidades indigenas de Colombia</h1>
            </div>
            <form class= "formulario-uno" v-on:submit.prevent="processLogin">
                <div>
                    <img  class="img" src="../assets/usuario.webp" alt="usuario">
                    <input type="text" name="usuario" placeholder="username" v-model="user.username">
                    <input type="password" name="pass" placeholder="contraseña" v-model="user.password">
                    <button class="editar" type="submit">Ingresar</button>
                </div>
            </form>
        </div>
    </main>
</template>


<script>
    import axios from 'axios';
    export default {
        name: 'ingresar',

        data: function(){
            return {
                user:{
                    username : "",
                    password : "",
                }
            }
        },
        methods:{
            processLogin:function(){
                axios.post(
                    'http://127.0.0.1:8000/login/',
                    this.user,
                    {headers:{}}
                )
                .then((result) => {
                    let dataLogin = {
                        username: this.user.username,
                        token_access : result.data.access,
                        token_refresh: result.data.refresh
                    }
                    this.$emit('completedLogin', dataLogin)
                })
                .catch((error)=> {
                    if(error.response.status == "401")
                        alert("Datos de usuario incorrectos");
                });
            }
        }
    }
</script>

<style>
    form {
        padding: 5%;
        display: grid;
        grid-template-rows: 1fr 1fr;
        align-content: center;
        margin: 0px 20%;
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

    form input,button, h3{
        text-align: center;
        border-radius: 50px;
        margin: 10px 10%;
        padding: 2%;
        }

    form button{
        padding: 2%;
        margin: auto;
    }
    .editar{
        cursor: pointer;
        padding: 1.5% 7%;
        color: blue;
        border-style: none;
    }

    .formulario-uno{
        width: 100%;
    }
</style>