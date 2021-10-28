<template>
    <main>
        <h1 class= "titulo">{{asociacion.nombre}}</h1>
        <section class="info">
            <div class="texto">
                <h2>Información sobre Asociacion</h2>
                <textarea  class = "text" name="text" id="" cols="30" rows="8" readonly v-model="asociacion.texto"></textarea>                
                    <h3>id</h3>
                    <p>{{asociacion.id}}</p>
                    <h3>id municipio</h3>
                    <p>{{asociacion.municipio.id}}</p>
                    <h3>municipio</h3>
                    <p>{{asociacion.municipio.nombre}}</p>
                    <h3>id departamento</h3>
                    <p>{{asociacion.departamento.id}}</p>
                    <h3>departamento</h3>                                       
                    <p>{{asociacion.departamento.nombre}}</p>
                <div>
                    <input class = editar type="button" value="  Editar  ">
                    <input class = editar type="button" value="  Borrar  " v-on:click="deleteDatas">
                    <input type="button" value="Guardar"  v-on:click="updateDatas">   

                    <input type="text" v-model="asociacion.id" readonly>
                    <input type="text" v-model="asociacion_editar.nombre">
                    <input type="text" v-model="asociacion_editar.siglas">
                    <input type="text" v-model="asociacion_editar.texto">
                    <input type="text" v-model="asociacion_editar.municipio">
                    <input type="text" v-model="asociacion.municipio.nombre" readonly>
                    <input type="text" v-model="asociacion.departamento.id" readonly>
                    <input type="text" v-model="asociacion.departamento.nombre" readonly>                    
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
        name: 'asoVista',

        data:function(){
            return{
                asociacion : {
                    id: 0,
                    nombre: "",
                    siglas: "",
                    texto: "",
                    municipio: {
                        id: 0,
                        nombre: ""
                    },
                    departamento: {
                        id: 0,
                        nombre: ""
                    },
                },

                asociacion_editar: {
                    nombre: "",
                    siglas: "",
                    texto: "",
                    municipio: 0
                }, 

                infoResA : [                
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
                    `http://127.0.0.1:8000/resguardo/${userId}/list/`,
                    {headers:{'Authorization':`Bearer ${token}`}}
                )
                .then((result) =>{
                    this.infoResA = result.data
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
                let asoId = this.$route.params.id.toString();

                axios.get(
                    `http://127.0.0.1:8000/asociacion/${userId}/${asoId}/`,
                    {headers:{'Authorization':`Bearer ${token}`}}
                )
                .then((result) =>{                                   
                    this.asociacion.id = result.data.id;
                    this.asociacion.nombre = result.data.nombre;
                    this.asociacion.siglas = result.data.siglas;
                    this.asociacion.texto = result.data.texto;
                    this.asociacion.municipio.id = result.data.municipio.id;
                    this.asociacion.municipio.nombre = result.data.municipio.nombre;
                    this.asociacion.departamento.id = result.data.departamento.id;
                    this.asociacion.departamento.nombre = result.data.departamento.nombre;
                    
                    this.asociacion_editar.nombre = result.data.nombre;
                    this.asociacion_editar.siglas = result.data.siglas;
                    this.asociacion_editar.texto = result.data.texto;
                    this.asociacion_editar.municipio = result.data.municipio.id;
                    // Obtener los datos del result para ajustarlo a la vista general
                })
                .catch((error) =>{
                    console.log(error)
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
                let asoId = this.$route.params.id.toString();
                axios.put(
                    `http://127.0.0.1:8000/asociacion/update/${userId}/${asoId}/`,
                    this.asociacion_editar,
                    {headers:{'Authorization':`Bearer ${token}`}}
                )
                .then((result) =>{                                      
                    alert('actualizacion exitosa')
                    this.$router.push({name: 'asociaciones'});              
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
                let asoId = this.$route.params.id.toString();
                axios.delete(
                    `http://127.0.0.1:8000/asociacion/remove/${userId}/${asoId}/`,
                    {headers:{'Authorization':`Bearer ${token}`}}
                )
                .then((result) =>{   
                    alert('borrado exitoso!')  
                    this.$router.push({name: 'asociaciones'});                                              
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