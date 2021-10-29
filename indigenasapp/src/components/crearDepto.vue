<template>
    <main>
        <h1>Crear registro de departamento</h1>   
        <form class="nuevoRegistro">
            <label for="">NOMBRE:</label>
            <input type="text" placeholder="nombre" v-model="departamento.nombre">
            <label for="">RESGUARDOS</label>
            <input type="number" min="0" max="999" v-model="departamento.numero_resguardos">
            <label for="">MUNICIPIOS CON RESGUARDO</label>
            <input type="number" name="nRes" min="0" max="999" v-model="departamento.numero_municipios_con_resguardo">
            <label for="">POBLACIÓN</label>
            <input type="number" name="poblacion" min="0" max="99999999" v-model="departamento.poblacion">
            <label for="">INFORMACIÓN</label>
            <textarea name="" id="" cols="30" rows="10" v-model="departamento.texto"></textarea>
            <button class="guardarB" v-on:click="confirmInsertion">Crear</button>
        </form> 
    </main>    
</template>

<script>
import axios from 'axios';
import jwt_decode from 'jwt-decode';

    export default{    
        name: 'crearDepto',
    
        data: function(){
            return{            
                departamento : {       
                    nombre: "",
                    numero_resguardos: 0,
                    numero_municipios_con_resguardo: 0,
                    poblacion: 0,
                    texto: "",
                },           
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
                    `http://127.0.0.1:8000/departamento/create/${userId}/`,
                    this.departamento,
                    {headers:{'Authorization':`Bearer ${token}`}}
                )
                .then((result) =>{                              
                    alert('Inserción exitosa!')
                    this.$router.push({name: 'departamentos'});              
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
    main .nuevoRegistro{
        border-style: groove;
        border-radius: 5px;
        border-color: black;
        margin: 30px 30%;
    }
</style>