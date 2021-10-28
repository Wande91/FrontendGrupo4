<template>
    <main>
        <h1 class= "titulo">Municipio {{municipio.nombre}}</h1>
        <section class="info">
            <div class="texto">
                <h2>Información sobre el Municipio</h2>
                <textarea  class = "text" name="text" id="" cols="30" rows="8" readonly v-model="municipio.texto"></textarea>
                <div>
                    <h3>id municipio</h3>
                    <p>{{municipio.id}}</p>
                    <h3>id departamento</h3>
                    <p>{{municipio.departamento.id}}</p>
                    <h3>departamento</h3>
                    <p>{{municipio.departamento.nombre}}</p>
                </div>

                <div>
                    <input class = editar type="button" value="  Editar  ">
                    <input class = editar type="button" value="  Borrar  " v-on:click="deleteDatas">
                    <input type="button" value="Guardar"  v-on:click="updateDatas">

                    <input type="text" v-model="municipio.id" readonly>
                    <input type="text" v-model="municipio_editar.nombre">
                    <input type="text" v-model="municipio_editar.texto">
                    <input type="text" v-model="municipio_editar.departamento">
                    <input type="text" v-model="municipio.departamento.nombre" readonly>       
                </div>
            </div>
            <div class="datos">
                <h2>Tabla de poblacion indigena</h2>
            </div>
        </section>
    </main>
    
</template>

<script>
import axios from 'axios';
import jwt_decode from 'jwt-decode'

    export default{
        name: 'munVista',

        data:function(){
            return {
                municipio : {
                    id: 0,
                    nombre: "",
                    texto: "",
                    departamento: {
                        id: 0,
                        nombre: ""
                    },
                },

                municipio_editar : {
                    nombre: "",
                    texto: "",
                    departamento: 0
                },

                infoResM : [
                ]
            }
        },
        components:{

        },
        methods: {
            getDatas: async function(){
                if(localStorage.getItem('tokenRefresh') === null || localStorage.getItem('tokenAccess') === null){
                    alert('No ha iniciado sesión')
                    this.$emit('logOut')
                    return;
                }

                await this.verifyToken();
                let token = localStorage.getItem('tokenAccess');
                let userId = jwt_decode(token).user_id.toString();
                axios.get(
                    `http://127.0.0.1:8000/departamento/${userId}/list/`,
                    {headers:{'Authorization':`Bearer ${token}`}}
                )
                .then((result) =>{
                    this.infoResM = result.data
                    // Obtener los datos del result para ajustarlo a la vista general
                })
                .catch((error) =>{
                    alert('No ha iniciado sesión')
                    this.$emit('logOut');
                })
            },

            getDetailDatas: async function(){
                if(localStorage.getItem('tokenRefresh') === null || localStorage.getItem('tokenAccess') === null){
                    alert('No ha iniciado sesión')
                    this.$emit('logOut')
                    return;
                }

                await this.verifyToken();
                let token = localStorage.getItem('tokenAccess');
                let userId = jwt_decode(token).user_id.toString();
                let munId = this.$route.params.id.toString();
                axios.get(
                    `http://127.0.0.1:8000/municipio/${userId}/${munId}/`,
                    {headers:{'Authorization':`Bearer ${token}`}}
                )
                .then((result) =>{                
                    this.municipio.id = result.data.id;
                    this.municipio.nombre = result.data.nombre;
                    this.municipio.texto = result.data.texto;
                    this.municipio.departamento.id = result.data.departamento.id;
                    this.municipio.departamento.nombre = result.data.departamento.nombre;  
                    
                    this.municipio_editar.nombre = result.data.nombre;
                    this.municipio_editar.texto = result.data.texto;
                    this.municipio_editar.departamento = result.data.departamento.id;
                    // Obtener los datos del result para ajustarlo a la vista general
                })
                .catch((error) =>{
                    alert('No ha iniciado sesión')
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
                let munId = this.$route.params.id.toString();
                axios.put(
                    `http://127.0.0.1:8000/municipio/update/${userId}/${munId}/`,
                    this.municipio_editar,
                    {headers:{'Authorization':`Bearer ${token}`}}
                )
                .then((result) =>{                                      
                    alert('actualizacion exitosa')
                    this.$router.push({name: 'municipios'});              
                })
                .catch((error) =>{
                    alert('No ha iniciado sesión')
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
                let munId = this.$route.params.id.toString();
                axios.delete(
                    `http://127.0.0.1:8000/municipio/remove/${userId}/${munId}/`,
                    {headers:{'Authorization':`Bearer ${token}`}}
                )
                .then((result) =>{   
                    alert('borrado exitoso!')  
                    this.$router.push({name: 'municipios'});                                              
                })
                .catch((error) =>{
                    console.log(error) 
                    alert('No ha iniciado sesión')
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
                    alert('No ha iniciado sesión')
                    this.$emit('logOut');
                })
            }
        },
        created:function(){
            this.getDatas();
            this.getDetailDatas();
        }
    }
</script>

<style>

</style>