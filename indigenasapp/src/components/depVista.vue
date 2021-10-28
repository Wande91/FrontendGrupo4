<template>
    <main>
        <h1 class= "titulo">{{nombre.toUpperCase()}}</h1>
        <section class="info">
            <div class="texto">

                <h2 class='tituloVista'>Información sobre el departamento</h2>

                <div class= "dato_dep">
                    <p><b>ID: </b>{{id}}</p>
                    <p><b>numero de resguardos:</b><input disabled type="number" class="inputEdit numRes" name="numRes" v-model="numero_resguardos"></p>
                    <p><b>num municipios con resguardo: </b><input disabled type="number" class="inputEdit numMunRes" name="numMunRes" v-model="numero_municipios_con_resguardo"></p>
                    <p><b>Poblacion: </b> <input disabled type="number" class="inputEdit pob" name= "pob" v-model="poblacion"> </p>
                </div>

                <textarea disabled class = "textVistas" name="textVistas" id="" cols="60" rows="9" v-model="texto"></textarea>

                <div class='botonesEdit'>
                    <input class = "editarB" type="button" value="  Editar  " v-on:click="editDep">
                    <input class = "guardarB" type="button" value="Guardar">    
                </div>

            </div>
            <div class="datos">
                <h2>Tabla de poblacion indigena</h2>
                <table>
                    <td>Municipio</td>
                    <td>Asociacion</td>
                    <td>Resguardo</td>
                </table>
            </div>
        </section>
    </main>
    
</template>

<script>
import axios from 'axios';
import jwt_decode from 'jwt-decode'

    export default{
        name: 'depVista',

        data:function(){
            return {         
                id: 0,
                nombre: "",
                numero_resguardos: 0,
                numero_municipios_con_resguardo: 0,
                poblacion: 0,
                texto: "",

                infoResD : [
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
                    console.log(result)
                    this.infoResD = result.data
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
                let depId = this.$route.params.id.toString();
                axios.get(
                    `http://127.0.0.1:8000/departamento/${userId}/${depId}/`,
                    {headers:{'Authorization':`Bearer ${token}`}}
                )
                .then((result) =>{                
                    this.id = result.data.id;
                    this.nombre = result.data.nombre;
                    this.numero_resguardos = result.data.numero_resguardos;
                    this.numero_municipios_con_resguardo = result.data.numero_municipios_con_resguardo;
                    this.poblacion = result.data.poblacion;
                    this.texto = result.data.texto;
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
            editDep: function(){
                if(document.getElementsByClassName('numRes').numRes.disabled ==  false){
                    document.getElementsByClassName("numRes").numRes.disabled = true;
                    document.getElementsByClassName("numMunRes").numMunRes.disabled = true;
                    document.getElementsByClassName("pob").pob.disabled = true;
                    document.getElementsByClassName("textVistas").textVistas.disabled = true;
                }
                else{
                    document.getElementsByClassName("numRes").numRes.disabled = false;
                    document.getElementsByClassName("numMunRes").numMunRes.disabled = false;
                    document.getElementsByClassName("pob").pob.disabled = false;
                    document.getElementsByClassName("textVistas").textVistas.disabled = false;
                }
            },
        },
        created:function(){
            this.getDatas();
            this.getDetailDatas();
        }
    }
</script>


<style>
    *{
        margin: 0;
        padding: 0;
        font-family: 'Times New Roman', Times, serif;
    }
    main {
        text-align: center;
    }

    main table {
        margin: auto;
    }
    .textVistas {
        border-style: none;
        resize: none;
        text-align: justify;
        margin-top: 30px;
        font-family: 'Times New Roman', Times, serif;
        font-size: larger;
    }
    section {
        margin-top: 40px;
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
    .texto {
        display: grid;
        grid-template-rows: 0.4fr 0.1fr 2fr 1fr;
        margin: auto;
        padding-bottom: 10px;
    }

    .textVistas {
        text-align: justify;
        border: none;
        border-radius: 0;
        font-size: 20px;
    }
    .textVistas:focus{
        border: none;
        outline: none;
        background-color: rgb(90, 89, 89);
        color: white;
    }
    .textVistas:active{
        border: none;
        outline: none;
    }

    .titulo{
        font-size: 30px;
        color: blue;
    }
    .dato_dep{
        font-size: 20px;
        text-align: left;
        margin: 0px 12%;
    }
    .guardarB, .editarB {
        cursor: pointer;
        background-color: rgb(195, 196, 197);
        padding: 2%;
        margin: 6% 7%;
        border: none;
        border-radius: 10px;
        color: black;
        font-size: 15px;
        
    }
    .guardarB:hover {
        background-color: rgb(0, 177, 9);
        color: white;
    }

    .editarB:hover {
        background-color: rgb(206, 12, 12);
        color: white;
    }
    .editDatos {
        border: none;
        border-radius: 0;
        margin: 0;
        padding: 0;
        text-align: left;
    }
    .inputEdit{
        text-align: center;
        font-size: medium;
        border: none;
        padding: 2% 0%;
        width: 80px;
    }
    .inputEdit:focus{
        background-color:rgb(195, 196, 197);
    }


</style>