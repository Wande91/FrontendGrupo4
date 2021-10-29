<template>
    <main>
        <h1 class= "titulo">{{resguardo.nombre.toUpperCase()}}</h1>
        <section class="info">
            <div class="textoR">
                <h2 class='tituloVistaR'>Información sobre el resguardo</h2>
                <textarea disabled class = "textVistasR" name="textVistasR" id="" cols="100" rows="10" v-model="resguardo.texto"></textarea>
                <div class='botonesEdit'>
                    <input class = "editarB" type="button" value="  Editar  " v-on:click="editRes">
                    <input class = "guardarB" type="button" value="Guardar" v-on:click="saveEditRes">
                    <input class = "borrarB" type="button" value="Borrar" v-on:click="confirmDeletion">    
                </div>
            </div>
            <div class= "dato_res">
                    <p><b>Poblacion: </b><input disabled type="number" class="inputEdit pob" name="pob" v-model="resguardo.poblacion"></p>
                    <p><b>ID Asociacion: </b><input disabled type="number" class="inputEdit idAso" name="idAso" v-model="resguardo.asociacion"></p>
                    <p><b>Asociacion: </b><label for="">{{ asociacion.nombre.toUpperCase() }}</label></p>
                    <p><b>ID Municipio: </b><label for>{{ municipio.id }}</label></p>
                    <p><b>Municipio: </b><label for>{{ municipio.nombre.toUpperCase() }}</label></p>
                    <p><b>ID Departamento: </b><label for="">{{ municipio.departamento.id }}</label></p>
                    <p><b>Departamento: </b><label for="">{{ municipio.departamento.nombre.toUpperCase() }}</label></p>
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
                asociacion: {
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

                resguardo : {
                    id: 0,
                    nombre: "",
                    poblacion: 0,
                    texto: "",
                    asociacion: 0
                },

                infoRes :[
                ]
            }
        },
        components: {

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
                    `https://p46-g4-comindigenasbe.herokuapp.com/resguardo/${userId}/${resId}/`,
                    {headers:{'Authorization':`Bearer ${token}`}}
                )
                .then((result) =>{ 
                    this.resguardo.id = result.data.id;                                  
                    this.resguardo.nombre = result.data.nombre;
                    this.resguardo.poblacion = result.data.poblacion;
                    this.resguardo.texto = result.data.texto;
                    this.resguardo.asociacion = result.data.asociacion.id;
                    this.asociacion.nombre = result.data.asociacion.nombre;
                    this.municipio.id = result.data.municipio.id;
                    this.municipio.nombre = result.data.municipio.nombre;
                    this.municipio.departamento.id = result.data.municipio.departamento.id;
                    this.municipio.departamento.nombre = result.data.municipio.departamento.nombre;                   
                    // Obtener los datos del result para ajustarlo a la vista general
                })
                .catch((error) =>{
                    if(error.response.status == "401"){
                        alert("No está autorizado para realizar esta acción");
                        this.$emit('logOut');
                    }else if(error.response.status == "404"){
                        alert("Ocurrio un error al obtener la información\nEl elemento no existe");
                        this.$emit('departamentos');
                    }else if(error.response.status == "500"){
                        alert("Ocurrio un error al obtener la información\nProblema técnico, vaya a la sección de contacto");
                        this.$emit('departamentos');
                    }else if(error.response.status == "400"){
                        alert("Los datos ingresados son incorrectos\nVerifique y si el problema persiste\n vaya a la sección de contacto");
                        this.$emit('departamentos');
                    }
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
                    `https://p46-g4-comindigenasbe.herokuapp.com/resguardo/update/${userId}/${resId}/`,
                    this.resguardo,
                    {headers:{'Authorization':`Bearer ${token}`}}
                )
                .then((result) =>{                                      
                    alert('actualizacion exitosa')
                    this.$router.push({name: 'resguardos'});              
                })

                .catch((error) =>{
                    if(error.response.status == "401"){
                        alert("No está autorizado para realizar esta acción");
                        this.$emit('logOut');
                    }else if(error.response.status == "404"){
                        alert("Ocurrio un error al obtener la información\nEl elemento no existe");
                        this.$emit('departamentos');
                    }else if(error.response.status == "500"){
                        alert("Ocurrio un error al obtener la información\nProblema técnico, vaya a la sección de contacto");
                        this.$emit('departamentos');
                    }else if(error.response.status == "400"){
                        alert("Los datos ingresados son incorrectos\nVerifique y si el problema persiste\n vaya a la sección de contacto");
                        this.$emit('departamentos');
                    }
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
                    `https://p46-g4-comindigenasbe.herokuapp.com/resguardo/remove/${userId}/${resId}/`,
                    {headers:{'Authorization':`Bearer ${token}`}}
                )
                .then((result) =>{   
                    alert('borrado exitoso!')  
                    this.$router.push({name: 'resguardos'});                                              
                })
                .catch((error) =>{
                    if(error.response.status == "401"){
                        alert("No está autorizado para realizar esta acción");
                        this.$emit('logOut');
                    }else if(error.response.status == "404"){
                        alert("Ocurrio un error al obtener la información\nEl elemento no existe");
                        this.$emit('departamentos');
                    }else if(error.response.status == "500"){
                        alert("Ocurrio un error al obtener la información\nProblema técnico, vaya a la sección de contacto");
                        this.$emit('departamentos');
                    }else if(error.response.status == "400"){
                        alert("Los datos ingresados son incorrectos\nVerifique y si el problema persiste\n vaya a la sección de contacto");
                        this.$emit('departamentos');
                    }
                })
            },    

            editRes: function(){
                if(document.getElementsByClassName("pob").pob.disabled == false){
                    document.getElementsByClassName("pob").pob.disabled = true;
                    document.getElementsByClassName("idAso").idAso.disabled = true;
                    document.getElementsByClassName("textVistasR").textVistasR.disabled = true;

                }
                else{
                    document.getElementsByClassName("pob").pob.disabled = false;
                    document.getElementsByClassName("idAso").idAso.disabled = false;
                    document.getElementsByClassName("textVistasR").textVistasR.disabled = false;                }
            },

            saveEditRes: function(){                
                if (confirm('¿Está seguro de realizar la edición?') === true){
                    this.updateDatas();
                }
            },

            confirmDeletion: function(){
                if (confirm('¿Está seguro de eliminar el registro?') === true){
                    this.deleteDatas();
                }
            },

            
            verifyToken: async function(){
                return axios.post(
                    'https://p46-g4-comindigenasbe.herokuapp.com/refresh/',
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
        margin: 50px auto;
        padding-bottom: 10px;
    }
    .dato_res{
        font-size: 20px;
        text-align: justify;
        margin: 140px 10%;
    }


</style>