<template>
    <main cslass="main">
        <div v-if="load">
            <div class="container">
                <h1>{{ username }}</h1>
            </div>
            <form action="">
                <div>
                    <img src="../assets/usuario.webp" alt="usuario" class="img">
                    <input type="text" name="nombre" placeholder= 'name' readonly>
                    <input type="text" name="email" placeholder= 'email' readonly>
                    <input type="password" name="pass" placeholder="Contraseña" readonly>
                    <button class="editar">editar</button>
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
                username: "",
                Usname : "",
                email: "",
                
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
                    this.username = result.data.username;
                    this.Usname = result.data.name;
                    this.email = result.data.email;
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
            }
        },
        created: async function(){
            this.getDatas();
        }
    }
</script>

<style>
</style>