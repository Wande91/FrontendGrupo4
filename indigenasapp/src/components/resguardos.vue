<template>
    <main id="main">
        <h1>Resguardos indigenas de Colombia</h1>
        <section class="container">
            <div class= "busqueda">
                <input type="text" placeholder="Buscar resguardo indigena">
                <img src="../assets/buscarM.png" alt="" width="40px">
            </div>
            <div class="container">
                <div v-for="item in infoGenR" class="carta">
                    <h4>{{ item.nombre.substr(0,14) }}<br></h4>
                </div>
            </div>
        </section>
    </main>
    
</template>

<script>
import axios from 'axios';
import jwt_decode from 'jwt-decode'

    export default{
        name: 'Resguardos',

        data:function(){
            return {
                infoGenR : [
                ],
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
                    console.log(result)
                    this.infoGenR = result.data
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

</style>