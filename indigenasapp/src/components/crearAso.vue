<template>
    <main>
        <h1>Crear registro de asociación</h1>   
        <form class="nuevoRegistro">
            <label for="">NOMBRE:</label>
            <input type="text" placeholder="nombre" v-model="asociacion.nombre">
            <label for="">SIGLAS</label>
            <input type="text" v-model="asociacion.siglas">
            <label for="">MUNICIPIOS ID</label>
            <input type="number" name="munID" min="0" max="999" v-model="asociacion.municipio">
            <label for="">INFORMACIÓN</label>
            <textarea name="" id="" cols="30" rows="10" v-model="asociacion.texto"></textarea>
            <button class="guardarB" v-on:click="confirmInsertion">Crear</button>
        </form> 
    </main>    
</template>

<script>
import axios from 'axios';
import jwt_decode from 'jwt-decode'

    export default{
        name: 'crearAso',
    
        data: function(){
            return{            
                asociacion: {
                    nombre: "",
                    siglas: "",
                    texto: "",
                    municipio: 0
                }            
            }
        },
    
        components: {
    
        },
    
        methods: {
            createDatas: async function(){
                if(localStorage.getItem('tokenRefresh') === null || localStorage.getItem('tokenAccess') === null){
                    alert('No ha iniciado sesión')
                    this.$emit('logOut')
                    return;
                }

                await this.verifyToken();
                let token = localStorage.getItem('tokenAccess');
                let userId = jwt_decode(token).user_id.toString();
                axios.post(
                    `http://127.0.0.1:8000/asociacion/create/${userId}/`,
                    this.asociacion,
                    {headers:{'Authorization':`Bearer ${token}`}}
                )
                .then((result) =>{                                      
                    alert('Inserción exitosa!')
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

            confirmInsertion: function(){
                if (confirm('¿Está seguro de insertar el registro?') === true){
                    this.createDatas();
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
    }
</script>

<style>

</style>