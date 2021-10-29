<template>
    <main cslass="main">
        <div v-if="load">
            <div class="container">
                <h1>{{ userData.username }}</h1>
            </div>
            <form v-on:summit.prevent="processUpdate">
                <div>
                    <img src="../assets/usuarioE.webp" alt="usuario" class="img">
                    <textarea disabled name="nombre" class="casilla1" cols="15" rows="1" v-model="userData.name"></textarea>
                    <textarea disabled name="email" class= "casilla2" cols="15" rows="1" v-model="userData.email"></textarea>
                    <div class= 'edit'>
                        <button class="editar_b" v-on:click="editUser" type="button">editar</button>
                        <button class="aceptar" v-on:click="saveEditUser" type="button">aceptar</button>
                    </div>

                    <button class= "eliminar" v-on:click="confirmDeletion">Eliminar Cuenta</button>
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
                    username : "",
                    password : "",
                    name : "",
                    email : ""
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
                    `https://p46-g4-comindigenasbe.herokuapp.com/user/${userId}/`,
                    {headers:{'Authorization':`Bearer ${token}`}}
                )
                .then((result) =>{
                    this.load = true;
                    this.userData.username = result.data.username;
                    this.userData.password = result.data.password;
                    this.userData.name = result.data.name;
                    this.userData.email = result.data.email;
                })
                .catch((error) =>{
                    if(error.response.status == "401")
                        alert("No está autorizado para realizar esta acción");
                        this.$emit('logOut');
                    if(error.response.status == "404")
                        alert("Ocurrio un error al obtener la información\nEl elemento no existe");
                        this.$emit('logOut');
                    if(error.response.status == "500")
                        alert("Ocurrio un error al obtener la información\nProblema técnico, vaya a la sección de contacto");
                        this.$emit('logOut');
                })
            },

            updateDatas: async function(){
                if(localStorage.getItem('tokenRefresh') === null || localStorage.getItem('tokenAccess') === null){
                    alert('No ha iniciado sesión')
                    this.$emit('logOut')
                    return;
                }

                await this.verifyToken();
                let token = localStorage.getItem('tokenAccess');
                let userId = jwt_decode(token).user_id.toString();
                axios.put(
                    `https://p46-g4-comindigenasbe.herokuapp.com/user/update/${userId}/${userId}/`,
                    this.userData,
                    {headers:{'Authorization':`Bearer ${token}`}}
                )
                .then((result) =>{                                      
                    alert('actualizacion exitosa')
                    this.$router.push({name: 'perfil'});              
                })
                .catch((error) =>{
                    if(error.response.status == "401")
                        alert("No está autorizado para realizar esta acción");
                        this.$emit('logOut');
                    if(error.response.status == "404")
                        alert("Ocurrio un error al obtener la información\nEl elemento no existe");
                        this.$emit('logOut');
                    if(error.response.status == "500")
                        alert("Ocurrio un error al obtener la información\nProblema técnico, vaya a la sección de contacto");
                        this.$emit('logOut');
                })
            },

            deleteDatas: async function(){
                if(localStorage.getItem('tokenRefresh') === null || localStorage.getItem('tokenAccess') === null){
                    alert('No ha iniciado sesión')
                    this.$emit('logOut')
                    return;
                }

                await this.verifyToken();
                let token = localStorage.getItem('tokenAccess');
                let userId = jwt_decode(token).user_id.toString();
                axios.delete(
                    `https://p46-g4-comindigenasbe.herokuapp.com/user/remove/${userId}/${userId}/`,
                    {headers:{'Authorization':`Bearer ${token}`}}
                )
                .then((result) =>{   
                    alert('borrado exitoso!')                                             
                })
                .catch((error) =>{
                    if(error.response.status == "401")
                        alert("No está autorizado para realizar esta acción");
                        this.$emit('logOut');
                    if(error.response.status == "404")
                        alert("Ocurrio un error al obtener la información\nEl elemento no existe");
                        this.$emit('logOut');
                    if(error.response.status == "500")
                        alert("Ocurrio un error al obtener la información\nProblema técnico, vaya a la sección de contacto");
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

            saveEditUser: function(){                
                if (confirm('¿Está seguro de realizar la edición?') === true){
                    this.updateDatas();
                }
            },

            confirmDeletion: function(){
                if (confirm('¿Está seguro de eliminar el registro?') === true){
                    this.deleteDatas();
                }
            },

            verifyToken: async function(){
                return axios.post(
                    'https://p46-g4-comindigenasbe.herokuapp.com/refresh/',
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