<template>
    <main>
        <h1 class= "titulo">Resguardo {{resguardo.nombre}}</h1>
        <section class="info">
            <div class="texto">
                <h2>Información sobre el Resguardo</h2>
                <textarea  class = "text" name="text" id="" cols="30" rows="8" readonly v-model="resguardo.texto"></textarea>
                <div>
                    <h3>id</h3>
                    <p>{{resguardo.id}}</p>
                    <h3>poblacion</h3>
                    <p>{{resguardo.poblacion}}</p>
                    <h3>id asociacion</h3>
                    <p>{{resguardo.asociacion.id}}</p>
                    <h3>asociacion</h3>
                    <p>{{resguardo.asociacion.nombre}}</p>
                    <h3>id municipio</h3>
                    <p>{{resguardo.municipio.id}}</p>
                    <h3>municipio</h3>
                    <p>{{resguardo.municipio.nombre}}</p>
                    <h3>id departamento</h3>
                    <p>{{resguardo.municipio.departamento.id}}</p>
                    <h3>departamento</h3>
                    <p>{{resguardo.municipio.departamento.nombre}}</p>
                </div>

                <div>
                    <input class = editar type="button" value="  Editar  ">
                    <input class = editar type="button" value="  Borrar  " v-on:click="deleteDatas">
                    <input type="button" value="Guardar"  v-on:click="updateDatas">

                    <input type="text" v-model="resguardo_editar.id">
                    <input type="text" v-model="resguardo_editar.nombre">
                    <input type="text" v-model="resguardo_editar.poblacion">
                    <input type="text" v-model="resguardo_editar.texto">
                    <input type="text" v-model="resguardo_editar.asociacion">
                    <input type="text" v-model="resguardo.asociacion.nombre" readonly>
                    <input type="text" v-model="resguardo.municipio.id" readonly>
                    <input type="text" v-model="resguardo.municipio.nombre" readonly>
                    <input type="text" v-model="resguardo.municipio.departamento.id" readonly>
                    <input type="text" v-model="resguardo.municipio.departamento.nombre" readonly>      
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
        name: 'resVista',

        data:function(){
            return {

                resguardo : {
                    id: 0,
                    nombre: "",
                    poblacion: 0,
                    texto: "",
                    asociacion: {
                        id: 0,
                        nombre: ""
                    },
                    municipio: {
                        id: 0,
                        nombre: "",
                        departamento: {
                            id: 0,
                            nombre: ""
                        }
                    },
                },

                resguardo_editar : {
                    id: 0,
                    nombre: "",
                    poblacion: 0,
                    texto: "",
                    asociacion: 0,
                },

                infoRes :[
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
                    this.infoRes = result.data
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
                let resId = this.$route.params.id.toString();
                axios.get(
                    `http://127.0.0.1:8000/resguardo/${userId}/${resId}/`,
                    {headers:{'Authorization':`Bearer ${token}`}}
                )
                .then((result) =>{                                   
                    this.resguardo.id = result.data.id;
                    this.resguardo.nombre = result.data.nombre;
                    this.resguardo.poblacion = result.data.poblacion;
                    this.resguardo.texto = result.data.texto;
                    this.resguardo.asociacion.id = result.data.asociacion.id;
                    this.resguardo.asociacion.nombre = result.data.asociacion.nombre;
                    this.resguardo.municipio.id = result.data.municipio.id;
                    this.resguardo.municipio.nombre = result.data.municipio.nombre;
                    this.resguardo.municipio.departamento.id = result.data.municipio.departamento.id;
                    this.resguardo.municipio.departamento.nombre = result.data.municipio.departamento.nombre;
                    
                    this.resguardo_editar.id = result.data.id;
                    this.resguardo_editar.nombre = result.data.nombre;
                    this.resguardo_editar.poblacion = result.data.poblacion;
                    this.resguardo_editar.texto = result.data.texto;
                    this.resguardo_editar.asociacion = result.data.asociacion.id;
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
                let resId = this.$route.params.id.toString();
                axios.put(
                    `http://127.0.0.1:8000/resguardo/update/${userId}/${resId}/`,
                    this.resguardo_editar,
                    {headers:{'Authorization':`Bearer ${token}`}}
                )
                .then((result) =>{                                      
                    alert('actualizacion exitosa')
                    this.$router.push({name: 'resguardos'});              
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
                let resId = this.$route.params.id.toString();
                axios.delete(
                    `http://127.0.0.1:8000/resguardo/remove/${userId}/${resId}/`,
                    {headers:{'Authorization':`Bearer ${token}`}}
                )
                .then((result) =>{   
                    alert('borrado exitoso!')  
                    this.$router.push({name: 'resguardos'});                                              
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