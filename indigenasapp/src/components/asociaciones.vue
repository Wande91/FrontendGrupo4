<template>
        <main id="main">
        <h1>Asociaciones indigenas de Colombia</h1>
        <section class="container">
            <div class= "busqueda">
                <input type="text" placeholder="Buscar asociación indigena">
                <img src="../assets/buscarM.png" alt="" width="40px">
            </div>
            <div class="container">
                <div class="carta amazonas" style="background-image: url(../assets/wipala.webp);">
                    <a href="asoVista.html"><h4>Departamento<br>Poblacion<br>Resguardos</h4></a>
                </div>
                <div class="carta" style="background-image: url(../assets/wipala.webp);">
                    <a href="asoVista.html"><h4>Departamento<br>Poblacion<br>Resguardos</h4></a>
                </div>
                <div class="carta" style="background-image: url(../assets/wipala.webp);">
                    <a href="asoVista.html"><h4>Departamento<br>Poblacion<br>Resguardos</h4></a>
                </div>
                <div class="carta" style="background-image: url(../assets/wipala.webp);">
                    <a href="asoVista.html"><h4>Departamento<br>Poblacion<br>Resguardos</h4></a>
                </div>
                <div class="carta" style="background-image: url(../assets/wipala.webp);">
                    <a href="asoVista.html"><h4>Departamento<br>Poblacion<br>Resguardos</h4></a>
                </div>
                <div class="carta" style="background-image: url(../assets/wipala.webp);">
                    <a href="asoVista.html"><h4>Departamento<br>Poblacion<br>Resguardos</h4></a>
                </div>
                <div class="carta" style="background-image: url(../assets/wipala.webp);">
                    <a href="asoVista.html"><h4>Departamento<br>Poblacion<br>Resguardos</h4></a>
                </div>
                <div class="carta" style="background-image: url(../assets/wipala.webp);">
                    <a href="asoVista.html"><h4>Departamento<br>Poblacion<br>Resguardos</h4></a>
                </div>
                <div class="carta" style="background-image: url(../assets/wipala.webp);">
                    <a href="asoVista.html"><h4>Departamento<br>Poblacion<br>Resguardos</h4></a>
                </div>
            </div>
        </section>
    </main>
</template>

<script>
    export default{
        name: 'Asociaciones',

        data:function(){

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