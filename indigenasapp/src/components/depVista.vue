<template>
    <main>
        <h1 class= "titulo">{{departamento.nombre.toUpperCase()}}</h1>
        <section class="info">
            <div class="texto">

                <h2 class='tituloVista'>Información sobre el departamento</h2>

                <div class= "dato_dep">
                    <p><b>numero de resguardos:</b><input disabled type="number" class="inputEdit numRes" name="numRes" v-model="departamento.numero_resguardos"></p>
                    <p><b>num municipios con resguardo: </b><input disabled type="number" class="inputEdit numMunRes" name="numMunRes" v-model="departamento.numero_municipios_con_resguardo"></p>
                    <p><b>Poblacion: </b> <input disabled type="number" class="inputEdit pob" name= "pob" v-model="departamento.poblacion"> </p>
                </div>

                <textarea disabled class = "textVistas" name="textVistas" id="" cols="60" rows="9" v-model="departamento.texto"></textarea>

                <div class='botonesEdit'>
                    <input class = "editarB" type="button" value="  Editar  " v-on:click="editDep">
                    <input class = "guardarB" type="button" value="Guardar" v-on:click="saveEditDep">
                    <input class = "borrarB" type="button" value="Borrar" v-on:click="confirmDeletion">     
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
            return{ 
                departamento : {       
                    nombre: "",
                    numero_resguardos: 0,
                    numero_municipios_con_resguardo: 0,
                    poblacion: 0,
                    texto: "",
                },

                infoResD :[                  
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
                    this.infoResD = result.data
                    // Obtener los datos del result para ajustarlo a la vista general
                })
                .catch((error) =>{
                    if(error.response.status == "401")
                        alert("No está autorizado para realizar esta acción");
                        this.$emit('logOut');
                    if(error.response.status == "500")
                        alert("Ocurrio un error al obtener la información\nProblema técnico, vaya a la sección de contacto");
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
                    this.departamento.nombre = result.data.nombre;
                    this.departamento.numero_resguardos = result.data.numero_resguardos;
                    this.departamento.numero_municipios_con_resguardo = result.data.numero_municipios_con_resguardo;
                    this.departamento.poblacion = result.data.poblacion;
                    this.departamento.texto = result.data.texto;
                    // Obtener los datos del result para ajustarlo a la vista general
                })
                .catch((error) =>{
                    if(error.response.status == "401")
                        alert("No está autorizado para realizar esta acción");
                        this.$emit('logOut');
                    if(error.response.status == "404")
                        alert("Ocurrio un error al obtener la información\nEl elemento no existe");
                        this.$emit('logOut');
                    if(error.response.status == "500")
                        alert("Ocurrio un error al obtener la información\nProblema técnico, vaya a la sección de contacto");
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
                let depId = this.$route.params.id.toString();
                axios.put(
                    `http://127.0.0.1:8000/departamento/update/${userId}/${depId}/`,
                    this.departamento,
                    {headers:{'Authorization':`Bearer ${token}`}}
                )
                .then((result) =>{                                      
                    alert('actualizacion exitosa')
                    this.$router.push({name: 'departamentos'});              
                })
                .catch((error) =>{
                    if(error.response.status == "401")
                        alert("No está autorizado para realizar esta acción");
                        this.$emit('logOut');
                    if(error.response.status == "404")
                        alert("Ocurrio un error al obtener la información\nEl elemento no existe");
                        this.$emit('logOut');
                    if(error.response.status == "500")
                        alert("Ocurrio un error al obtener la información\nProblema técnico, vaya a la sección de contacto");
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
                let depId = this.$route.params.id.toString();
                axios.delete(
                    `http://127.0.0.1:8000/departamento/remove/${userId}/${depId}/`,
                    {headers:{'Authorization':`Bearer ${token}`}}
                )
                .then((result) =>{   
                    alert('borrado exitoso!')  
                    this.$router.push({name: 'departamentos'});                                              
                })
                .catch((error) =>{
                    if(error.response.status == "401")
                        alert("No está autorizado para realizar esta acción");
                        this.$emit('logOut');
                    if(error.response.status == "404")
                        alert("Ocurrio un error al obtener la información\nEl elemento no existe");
                        this.$emit('logOut');
                    if(error.response.status == "500")
                        alert("Ocurrio un error al obtener la información\nProblema técnico, vaya a la sección de contacto");
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

            saveEditDep: function(){                
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
    .guardarB, .editarB, .borrarB {
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
        background-color: rgb(12, 151, 206);
        color: white;
    }
    .borrarB:hover{
        background-color: rgb(206, 25, 12);
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