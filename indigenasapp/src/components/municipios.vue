<template>
    <main id="main">
        <h1>Municipios y Ciudades de Colombia</h1>
        <section class="container">
            <div class= "busqueda">
                <input type="text" placeholder="Buscar municipio/ciudad">
                <img src="../assets/buscarM.png" alt="" width="40px" v-on:click="buscarMun">
            </div>
            <div class="container">
                <div class= "carta cartaCrear" v-on:click="crearM"><h4>CREAR<br>NUEVO<br>REGISTRO</h4></div>
                <div v-for="item in infoGenM" v-bind:key="item" class="carta">
                    <h4 v-on:click="abrirMunVista(item.id)">ID: {{ item.id }}<br>{{ item.nombre.toUpperCase() }}<br><b>DEPTO: </b>{{ item.departamento.nombre.toUpperCase() }}</h4>
                </div>
            </div>
        </section>
    </main>
</template>

<script>
import axios from 'axios';
import jwt_decode from 'jwt-decode'
    export default{
        name: 'Municipios',

        data:function(){
            return{
                infoGenM : [

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
                    `http://127.0.0.1:8000/municipio/${userId}/list/`,
                    {headers:{'Authorization':`Bearer ${token}`}}
                )
                .then((result) =>{
                    console.log(result)
                    this.infoGenM = result.data
                    // Obtener los datos del result para ajustarlo a la vista general
                })
                .catch((error) =>{
                    alert('No ha iniciado sesión')
                    this.$emit('logOut');
                })
            },

            abrirMunVista: async function(id){
                this.$router.push({path: '/munvista/' + id});
            },
            crearM:function(){
                this.$router.push({path: '/crearmun'})
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
            buscarMun: function(){
                // funcion de busqueda por MUNICIPIO
            }
        },
        created:function(){
            this.getDatas();
        }
    }
</script>


<style >

</style>