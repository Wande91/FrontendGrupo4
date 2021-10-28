<template>
    <main cslass="main">
        <div v-if="load">
            <div class="container">
                <h1>{{ userData.username }}</h1>
            </div>
            <form v-on:summit.prevent="processUpdate">
                <div>
                    <img src="../assets/usuario.webp" alt="usuario" class="img">
                    <textarea disabled name="nombre" class="casilla1" cols="15" rows="1" v-model="userData.usname"></textarea>
                    <textarea disabled name="email" class= "casilla2" cols="15" rows="1" v-model="userData.email"></textarea>
                    <div class= 'edit'>
                        <button class="editar_b" v-on:click="editUser" type="button">editar</button>
                        <button class="aceptar" type="button">aceptar</button>
                    </div>

                    <button class= "eliminar">Eliminar Cuenta</button>
                </div> 
            </form>
        </div>
    </main>
</template>

<script>
import axios from 'axios';
import jwt_decode from 'jwt-decode'

    export default{
        name: 'Usuario',
    
        data: function(){  
            return{
                load : false,
                userData : {
                    name: "",
                    usname : "",
                    email: "",
                }
                
            }          
        },

        methods: {
            getDatas: async function(){
                if(localStorage.getItem('tokenRefresh') === null || localStorage.getItem('tokenAccess') === null){
                    this.$emit('logOut')
                    return;
                }

                await this.verifyToken();
                let token = localStorage.getItem('tokenAccess');
                let userId = jwt_decode(token).user_id.toString();
                axios.get(
                    `http://127.0.0.1:8000/user/${userId}/`,
                    {headers:{'Authorization':`Bearer ${token}`}}
                )
                .then((result) =>{
                    this.load = true;
                    this.userData.username = result.data.username;
                    this.userData.usname = result.data.name;
                    this.userData.email = result.data.email;
                })
                .catch((error) =>{
                    this.$emit('logOut');
                })
            },
            verifyToken: async function(){
                return axios.post(
                    'http://127.0.0.1:8000/refresh/',
                    {refresh : localStorage.getItem('tokenRefresh')},
                    {headers:{}}
                )
                .then((result) =>{
                    localStorage.setItem('tokenAccess', result.data.access);
                })
                .catch((error) =>{
                    this.$emit('logOut');
                })
            },
            editUser: function(){
                if(document.getElementsByClassName('casilla1').nombre.disabled ==  false){
                    document.getElementsByClassName("casilla1").nombre.disabled = true;
                    document.getElementsByClassName("casilla2").email.disabled = true;
                }
                else if(document.getElementsByClassName('casilla1').nombre.disabled == true){
                    document.getElementsByClassName("casilla1").nombre.disabled =  false;
                    document.getElementsByClassName("casilla2").email.disabled =  false;
                }
            },
            processUpdate: function(){
            }
        },
        created: async function(){
            this.getDatas();            
        }
    }
</script>

<style>
    form div .edit{
        border: none;
        display:inline-block;

    }

    .edit button{
        margin: 2%;
        width: 100px;
    }

    textarea {
        text-align: center;
        border-radius: 50px;
        margin: 10px 10%;
        padding: 2%;
        resize: none;
    }

    .aceptar{
        cursor: pointer;
        color: blue;
        border-style: none;
    }

    .aceptar:hover {
        background-color: rgb(13, 173, 7);
        color: white;
    }

    .editar_b{
        cursor: pointer;
        padding: 1.5% 7%;
        color: blue;
        border-style: none;
        
    }
    .editar_b:hover{
        color: white;
        background-color: blue;
    }

</style>