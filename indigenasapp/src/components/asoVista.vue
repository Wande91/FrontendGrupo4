<template>
    <main>
        <h1 class= "titulo">{{asociacion.nombre.toUpperCase()}}</h1>
        <section class="info">
            <div class="texto">

                <h2 class='tituloVista'>Información sobre la asociación</h2>

                <div class= "dato_dep">
                    <p><b>ID Municipio: </b><input disabled type="number" class="inputEdit idMun" name="idMun" id="" v-model="asociacion.municipio"></p>
                    <p><b>Municipio: </b><label for="">{{ municipio.nombre }}</label></p>
                    <p><b>Departamento: </b><label for="">{{ departamento.nombre }}</label></p>
                </div>
                
                <textarea disabled class = "textVistas" name="textVistas" cols="60" rows="9" v-model="asociacion.texto"></textarea>

                <div class='botonesEdit'>
                    <input class = "editarB" type="button" value="  Editar  " v-on:click="editAso">
                    <input class = "guardarB" type="button" value="Guardar" v-on:click="saveEditAso">
                    <input class = "borrarB" type="button" value="Borrar" v-on:click="confirmDeletion">   
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
                municipio: {
                    nombre: ""
                },

                departamento: {
                    id: 0,
                    nombre: ""
                },

                asociacion: {
                    nombre: "",
                    siglas: "",
                    texto: "",
                    municipio: 0
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
                let asoId = this.$route.params.id.toString();
                axios.get(
                    `http://127.0.0.1:8000/asociacion/${userId}/${asoId}/`,
                    {headers:{'Authorization':`Bearer ${token}`}}
                )
                .then((result) =>{                                   
                    this.asociacion.nombre = result.data.nombre;
                    this.asociacion.siglas = result.data.siglas;
                    this.asociacion.texto = result.data.texto;
                    this.asociacion.municipio = result.data.municipio.id;
                    this.municipio.nombre = result.data.municipio.nombre;
                    this.departamento.id = result.data.departamento.id;
                    this.departamento.nombre = result.data.departamento.nombre;
                    console.log(this.asociacion.municipio)                   
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
                let asoId = this.$route.params.id.toString();
                axios.put(
                    `http://127.0.0.1:8000/asociacion/update/${userId}/${asoId}/`,
                    this.asociacion,
                    {headers:{'Authorization':`Bearer ${token}`}}
                )
                .then((result) =>{                                      
                    alert('actualizacion exitosa')
                    this.$router.push({name: 'asociaciones'});              
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
                let asoId = this.$route.params.id.toString();
                axios.delete(
                    `http://127.0.0.1:8000/asociacion/remove/${userId}/${asoId}/`,
                    {headers:{'Authorization':`Bearer ${token}`}}
                )
                .then((result) =>{   
                    alert('borrado exitoso!')  
                    this.$router.push({name: 'asociaciones'});                                              
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

            editAso: function(){
                if(document.getElementsByClassName('idMun').idMun.disabled ==  false){
                    document.getElementsByClassName("idMun").idMun.disabled = true;
                    document.getElementsByClassName("textVistas").textVistas.disabled = true;
                }
                else{
                    document.getElementsByClassName("idMun").idMun.disabled = false;
                    document.getElementsByClassName("textVistas").textVistas.disabled = false;
                }
            },

            saveEditAso: function(){                
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

</style>