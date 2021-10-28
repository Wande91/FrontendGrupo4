<template>
    <main id="main">
        <h1>Departamentos de Colombia</h1>
        <section class="container">
            <div class= "busqueda">
                <input type="text" placeholder="Buscar Departamento">
                <img src="../assets/buscarM.png" alt="" width="40px" v-on:click="buscarDep">
            </div>
            <div class="container">
                <div class= "carta cartaCrear" v-on:click="crearD"><h4>CREAR<br>NUEVO<br>REGISTRO</h4></div>
                <div v-for="item in infoGenD" v-bind:key="item" class="carta">
                    <h4 v-on:click="abrirDepVista(item.id)">ID: {{ item.id}}<br>{{ item.nombre.toUpperCase() }}<br>RESGUARDOS: {{ item.numero_resguardos }}</h4>
                </div>
            </div>
        </section>
    </main>
</template>

<script>
import axios from 'axios';
import jwt_decode from 'jwt-decode'
    export default{
        name: 'Departamentos',

        data:function(){
            return {
                infoGenD : [

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
                    console.log(result)
                    this.infoGenD = result.data
                    // Obtener los datos del result para ajustarlo a la vista general
                })
                .catch((error) =>{
                    alert('No ha iniciado sesión')
                    this.$emit('logOut');
                })
            },
            abrirDepVista: async function(id){
                this.$router.push({path:'/depvista/' + id});
            },
            crearD:function(id){
                this.$router.push({path:'/creardepto/'});
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
            buscarDep: function(){
                // funcion de busqueda por DEPARTAMENTO
            }
        },
        created:function(){
            this.getDatas();
        }
    }
</script>


<style>

    .busqueda {
        display: grid;
        grid-template-columns: 2fr 0.1fr;
        width: 100%;
        height: 50px;
        margin: 5% 20% 0% 20%;

    }

    .busqueda input{
        margin-right: -12%;
        border-radius: 30px;
        background-color: rgba(255, 255, 255, 0.692);
        border-color: rgb(121, 121, 121);
        text-align: center;
        font-size: larger;
        color: rgb(0, 0, 0);
    }

    .busqueda img {
        display: block;
        cursor: pointer;
        width: 30px;
        margin: 30% 15% 30% 30%;
        padding: 5%;

        text-align: center;
    }

    .crearG {
        margin-left: 40%;
    }

    .container {
        width: 100%;
        height: 10%;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }

    .container .carta{
        width: 25%;
        max-width: 180px;
        min-width: 180px;
        height: 300px;
        border-radius: 10px;
        box-shadow: 0,2px rgba(2px, 0px, 4px, 0.1);
        margin: 3%;
        text-align: center;
        transition: 0.5s;
        background-position: center;
        cursor: pointer;
        border-style: groove;
        border-color: rgba(0, 0, 0, 0.329);
    }

    .carta{
        background: url(../assets/colombia.webp);
    }

    .cartaCrear{
        background: url(../assets/wipala.webp);
    }

    .container .amazonas{
        background-position: left;
    }

    .container .carta:hover{
        transform: translateY(-15px);
        box-shadow: 0 12px 16px rgba(0,0,0,0.8);
        border-color: rgba(0, 0, 0, 0.801);
    }


    .container .carta h4{
        display: none;
        position: relative;
        color: aliceblue;
        padding-top: 70%;
        padding-bottom: 68%;
        background-color: rgba(0, 0, 0, 0.726);
        border-radius: 5;
    }

    .container .carta:hover h4{
        display: block;
    }


    main h1{
        text-align: center;
        font-size: 70px;
    }
</style>