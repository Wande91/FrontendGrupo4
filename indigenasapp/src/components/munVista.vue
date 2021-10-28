<template>
    <main>
        <h1 class= "titulo">{{nombre.toUpperCase()}}</h1>
        <section class="info">
            <div class="texto">

                <h2 class='tituloVista'>Información sobre el municipio</h2>
                
                <div class= "dato_dep">
                    <p><b>ID Departamento: </b><input disabled type="number" class="inputEdit idDep" name="idDep"  v-model="departamento.id"></p>
                    <p><b>Departamento: </b><label>{{ departamento.nombre }}</label></p>
                </div>
                
                <textarea  disabled class="textVistas" name="textVistas" id="" cols="60" rows="9" v-model="texto"></textarea>

                <div class='botonesEdit'>
                    <input class= "editarB" type="button" value="  Editar  " v-on:click="editMun">
                    <input class= "guardarB" type="button" value="Guardar">    
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
        name: 'depVista',

        data:function(){
            return {
                id: 0,
                nombre: "",
                texto: "",
                departamento: {
                    id: 0,
                    nombre: ""
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
                    `http://127.0.0.1:8000/departamento/${userId}/list/`,
                    {headers:{'Authorization':`Bearer ${token}`}}
                )
                .then((result) =>{
                    this.infoResM = result.data
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
                let munId = this.$route.params.id.toString();
                axios.get(
                    `http://127.0.0.1:8000/municipio/${userId}/${munId}/`,
                    {headers:{'Authorization':`Bearer ${token}`}}
                )
                .then((result) =>{                
                    this.id = result.data.id;
                    this.nombre = result.data.nombre;
                    this.texto = result.data.texto;
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
        },
        created:function(){
            this.getDatas();
            this.getDetailDatas();
        }
    }
</script>

<style>

</style>