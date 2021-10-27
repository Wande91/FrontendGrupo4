<template>
    <main>
        <h1 class= "titulo">{{nombre}}</h1>
        <section class="info">
            <div class="texto">
                <h2>Información sobre Asociacion</h2>
                <textarea  class = "text" name="text" id="" cols="30" rows="8" readonly v-model="texto"></textarea>
                <div>
                    <h3>id</h3>
                    <p>{{id}}</p>
                    <h3>id municipio</h3>
                    <p>{{municipio.id}}</p>
                    <h3>municipio</h3>
                    <p>{{municipio.nombre}}</p>
                    <h3>id departamento</h3>
                    <p>{{departamento.id}}</p>
                    <h3>departamento</h3>
                    <p>{{departamento.nombre}}</p>
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
        name: 'asoVista',

        data:function(){
            return{
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
                    this.id = result.data.id;
                    this.nombre = result.data.nombre;
                    this.siglas = result.data.siglas;
                    this.texto = result.data.texto;
                    this.municipio.id = result.data.municipio.id;
                    this.municipio.nombre = result.data.municipio.nombre;
                    this.departamento.id = result.data.departamento.id;
                    this.departamento.nombre = result.data.departamento.nombre;                   
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