<template>
    <main id="main">
        <h1>Asociaciones indigenas de Colombia</h1>
        <section class="container">
            <div class= "busqueda">
                <input type="text" placeholder="Buscar asociación indigena">
                <img src="../assets/buscarM.png" alt="" width="40px" v-on:click="buscarAso">
            </div>
            <div class="container">
                <div class= "carta cartaCrear" v-on:click="crearA"><h4>CREAR<br>NUEVO<br>REGISTRO</h4></div>
                <div v-for="item in infoGenA" v-bind:key="item" class="carta">
                    <h4 v-on:click="abrirAsoVista(item.id)">ID: {{item.id}}<br>ASOCIACION:<br>{{ item.siglas.substr(0,10) }}</h4>
                </div>
            </div>
        </section>
    </main>
</template>

<script>
import axios from 'axios';
import jwt_decode from 'jwt-decode'

    export default{
        name: 'Asociaciones',
        con: 1,

        data:function(){ 
            return{
                infoGenA : [
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
                    `http://127.0.0.1:8000/asociacion/${userId}/list/`,
                    {headers:{'Authorization':`Bearer ${token}`}}
                )
                .then((result) =>{
                    this.infoGenA = result.data
                    console.log(result)
                    // Obtener los datos del result para ajustarlo a la vista general
                })
                .catch((error) =>{
                    alert('No ha iniciado sesión')
                    this.$emit('logOut');
                })
            },

            abrirAsoVista: async function(id){
                this.$router.push({path: '/asovista/' + id});
            },
            crearA:function(){
                this.$router.push({path: '/crearaso'})
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
            },
            buscarAso: function(){
                // funcion de busqueda por ASOCIACIÓN
            }
        },
        created:function(){
            this.getDatas();
        }
    }
</script>

<style>

</style>