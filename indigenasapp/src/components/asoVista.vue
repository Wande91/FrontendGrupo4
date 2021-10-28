<template>
    <main>
        <h1 class= "titulo">{{nombre.toUpperCase()}}</h1>
        <section class="info">
            <div class="texto">

                <h2 class='tituloVista'>Información sobre la asociación</h2>

                <div class= "dato_dep">
                    <p><b>ID Municipio: </b><input disabled type="number" class="inputEdit idMun" name="idMun" id="" v-model="municipio.id"></p>
                    <p><b>Municipio: </b><label for="">{{ municipio.nombre }}</label></p>
                    <p><b>Departamento: </b><label for="">{{ departamento.nombre }}</label></p>
                </div>
                
                <textarea disabled class = "textVistas" name="textVistas" cols="60" rows="9" v-model="texto"></textarea>

                <div class='botonesEdit'>
                    <input class="editarB" type="button" value="  Editar  " v-on:click="editAso">
                    <input class= "guardarB" type="button" value="Guardar">    
                </div>

            </div>
            <div class="datos">
                <h2>Tabla de poblacion indigena</h2>
                <table class="datosGen">
                    <tr>
                        <th>ID RESGUARDO</th>
                        <th>NOMBRE RESGUARDO</th>
                        <th>POB. RESGUARDO</th>
                    </tr>
                    <tr v-for="item in infoResA" v-bind:key="item" class="dato">
                        <td> {{ item.id}}</td>
                        <td>{{ item.nombre }}</td>
                        <td>{{ item.poblacion }}</td>
                    </tr>
                </table>
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
                id: 0,
                nombre: "",
                siglas: "",
                texto: "",
                municipio: {
                    id: 0,
                    nombre: ""
                },
                departamento: {
                    id: 0,
                    nombre: ""
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
                let asoId = this.$route.params.id.toString();
                axios.get(
                    `http://127.0.0.1:8000/asociacion/${userId}/${asoId}/`,
                    {headers:{'Authorization':`Bearer ${token}`}}
                )
                .then((result) =>{                                   
                    this.id = result.data.id;
                    this.nombre = result.data.nombre;
                    this.siglas = result.data.siglas;
                    this.texto = result.data.texto;
                    this.municipio.id = result.data.municipio.id;
                    this.municipio.nombre = result.data.municipio.nombre;
                    this.departamento.id = result.data.departamento.id;
                    this.departamento.nombre = result.data.departamento.nombre;                   
                    // Obtener los datos del result para ajustarlo a la vista general
                })
                .catch((error) =>{
                    alert('No ha iniciado sesión')
                    this.$emit('logOut');
                })
                axios.get(
                    `http://127.0.0.1:8000/resguardo/${userId}/list/`,
                    {headers:{'Authorization':`Bearer ${token}`}}
                )
                .then((result) =>{           
                    console.log(result.data)
                    this.infoResA = result.data
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
        },
        created:function(){
            this.getDatas();
        }
    }
</script>

<style>

</style>