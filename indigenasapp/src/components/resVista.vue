<template>
    <main>
        <h1 class= "titulo">{{nombre.toUpperCase()}}</h1>
        <section class="info">
            <div class="textoR">
                <h2 class='tituloVistaR'>Información sobre el resguardo</h2>
                <textarea disabled class = "textVistasR" name="textVistasR" id="" cols="100" rows="10" v-model="texto"></textarea>
                <div class='botonesEdit'>
                    <input class= "editarB" type="button" value="  Editar  " v-on:click="editRes">
                    <input class= "guardarB" type="button" value="Guardar">    
                </div>
            </div>
            <div class= "dato_res">
                    <p><b>id: </b><input disabled class="inputEdit idRes" name="idRes" type="number" v-model="id"></p>
                    <p><b>Poblacion: </b><input disabled type="number" class="inputEdit pob" name="pob" v-model="poblacion"></p>
                    <p><b>ID Asociacion: </b><input disabled type="number" class="inputEdit idAso" name="idAso" v-model="asociacion.id"></p>
                    <p><b>Asociacion: </b><label for="">{{ asociacion.nombre }}</label></p>
                    <p><b>Municipio: </b><label for>{{ municipio.nombre }}</label></p>
                    <p><b>Departamento: </b><label for="">{{ municipio.departamento.nombre }}</label></p>
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
            },
            editRes: function(){
                if(document.getElementsByClassName('idRes').idRes.disabled ==  false){
                    document.getElementsByClassName("idRes").idRes.disabled = true;
                    document.getElementsByClassName("pob").pob.disabled = true;
                    document.getElementsByClassName("idAso").idAso.disabled = true;
                    document.getElementsByClassName("textVistasR").textVistasR.disabled = true;

                }
                else{
                    document.getElementsByClassName("idRes").idRes.disabled = false;
                    document.getElementsByClassName("pob").pob.disabled = false;
                    document.getElementsByClassName("idAso").idAso.disabled = false;
                    document.getElementsByClassName("textVistasR").textVistasR.disabled = false;                }
            },
        },
        created:function(){
            this.getDatas();
        }
    }
</script>

<style>

    .textVistasR {
        border-style: none;
        border-radius: 0;
        resize: none;
        text-align: justify;
        margin-top: 30px;
        font-family: 'Times New Roman', Times, serif;
        font-size: larger;
    }

    .textVistasR:focus{
        border: none;
        outline: none;
        background-color: rgb(90, 89, 89);
        color: white;
    }
    .textVistasR:active{
        border: none;
        outline: none;
    }

    .textoR {
        display: grid;
        grid-template-rows: 0.2fr 1fr 0.2fr;
        margin: auto;
        padding-bottom: 10px;
    }
    .dato_res{
        font-size: 20px;
        text-align: justify;
        margin: 100px 10%;
    }


</style>