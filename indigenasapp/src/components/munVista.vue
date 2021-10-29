<template>
    <main>
        <h1 class= "titulo">{{municipio.nombre.toUpperCase()}}</h1>
        <section class="info">
            <div class="texto">

                <h2 class='tituloVista'>Información sobre el municipio</h2>
                
                <div class= "dato_dep">
                    <p><b>ID Departamento: </b><input disabled type="number" class="inputEdit idDep" name="idDep"  v-model="municipio.departamento"></p>
                    <p><b>Departamento: </b><label>{{ departamento.nombre }}</label></p>
                </div>
                
                <textarea  disabled class="textVistas" name="textVistas" id="" cols="60" rows="9" v-model="municipio.texto"></textarea>

                <div class='botonesEdit'>
                    <input class = "editarB" type="button" value="  Editar  " v-on:click="editMun">
                    <input class = "guardarB" type="button" value="Guardar" v-on:click="saveEditMun">
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
        name: 'munVista',

        data:function(){
            return {            
                departamento: {
                    nombre: ""
                },

                municipio : {
                    nombre: "",
                    texto: "",
                    departamento: 0,
                },

                infoResM : [
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
                    this.infoResM = result.data
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
                let munId = this.$route.params.id.toString();
                axios.get(
                    `http://127.0.0.1:8000/municipio/${userId}/${munId}/`,
                    {headers:{'Authorization':`Bearer ${token}`}}
                )
                .then((result) =>{                
                    this.municipio.nombre = result.data.nombre;
                    this.municipio.texto = result.data.texto;
                    this.municipio.departamento = result.data.departamento.id;
                    this.departamento.nombre = result.data.departamento.nombre;              
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
                let munId = this.$route.params.id.toString();
                axios.put(
                    `http://127.0.0.1:8000/municipio/update/${userId}/${munId}/`,
                    this.municipio,
                    {headers:{'Authorization':`Bearer ${token}`}}
                )
                .then((result) =>{                                      
                    alert('actualizacion exitosa')
                    this.$router.push({name: 'municipios'});              
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
                let munId = this.$route.params.id.toString();
                axios.delete(
                    `http://127.0.0.1:8000/municipio/remove/${userId}/${munId}/`,
                    {headers:{'Authorization':`Bearer ${token}`}}
                )
                .then((result) =>{   
                    alert('borrado exitoso!')  
                    this.$router.push({name: 'municipios'});                                              
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

            editMun: function(){
                if(document.getElementsByClassName('idDep').idDep.disabled ==  false){
                    document.getElementsByClassName("idDep").idDep.disabled = true;
                    document.getElementsByClassName("textVistas").textVistas.disabled = true;
                }
                else{
                    document.getElementsByClassName("idDep").idDep.disabled = false;
                    document.getElementsByClassName("textVistas").textVistas.disabled = false;
                }
            },

            saveEditMun: function(){                
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