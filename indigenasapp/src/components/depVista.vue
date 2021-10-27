<template>
    <main>
        <h1 class= "titulo">Departamento {NOMBRE}</h1>
        <section class="info">
            <div class="texto">
                <h2>Información sobre el Departamento</h2>
                <textarea  class = "text" name="text" id="" cols="30" rows="7" readonly>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium error ad nisi dolorum,voluptates nihil impedit ea quam delectus. Neque totam ratione cum iure ab tempore, numquam facere.Nulla, quisquam!</textarea>
                <div>
                    <h3>Poblacion</h3>
                    <p>1´234.251</p>
                    <h3>Resguardos</h3>
                    <p>125</p>
                </div>

                <div>
                    <input class = editar type="button" value="  Editar  ">
                    <input type="button" value="Guardar">    
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
            }
        },
        created:function(){
            this.getDatas();
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
    .text {
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
        grid-template-rows: 1fr 5fr 2fr 1fr;
        margin: auto;
        padding-bottom: 10px;
    }

    .texto > div > input {
        cursor: pointer;
        padding: 10px;
        margin: 0px 10%;
        border-radius: 20px;
        background-color: blueviolet;
    }

    .text:focus{
        border: none;
        outline: none;
    }
    .text:active{
        border: none;
        outline: none;
    }

    .titulo{
        font-size: 30px;
        color: blue;
    }

</style>