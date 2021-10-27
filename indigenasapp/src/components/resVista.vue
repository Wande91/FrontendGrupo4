<template>
    <main>
        <h1 class= "titulo">Resguardo {{nombre}}</h1>
        <section class="info">
            <div class="texto">
                <h2>Información sobre el Resguardo</h2>
                <textarea  class = "text" name="text" id="" cols="30" rows="8" readonly v-model="texto"></textarea>
                <div>
                    <h3>id</h3>
                    <p>{{id}}</p>
                    <h3>poblacion</h3>
                    <p>{{poblacion}}</p>
                    <h3>id asociacion</h3>
                    <p>{{asociacion.id}}</p>
                    <h3>asociacion</h3>
                    <p>{{asociacion.nombre}}</p>
                    <h3>id municipio</h3>
                    <p>{{municipio.id}}</p>
                    <h3>municipio</h3>
                    <p>{{municipio.nombre}}</p>
                    <h3>id departamento</h3>
                    <p>{{municipio.departamento.id}}</p>
                    <h3>departamento</h3>
                    <p>{{municipio.departamento.nombre}}</p>
                </div>

                <div>
                    <input class = editar type="button" value="  Editar  ">
                    <input type="button" value="Guardar">    
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
                    this.id = result.data.id;
                    this.nombre = result.data.nombre;
                    this.poblacion = result.data.poblacion;
                    this.texto = result.data.texto;
                    this.asociacion.id = result.data.asociacion.id;
                    this.asociacion.nombre = result.data.asociacion.nombre;
                    this.municipio.id = result.data.municipio.id;
                    this.municipio.nombre = result.data.municipio.nombre;
                    this.municipio.departamento.id = result.data.municipio.departamento.id;
                    this.municipio.departamento.nombre = result.data.municipio.departamento.nombre;                   
                    // Obtener los datos del result para ajustarlo a la vista general
                })
                .catch((error) =>{
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