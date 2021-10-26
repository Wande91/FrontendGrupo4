<template>
    <main id="main">
        <h1>Departamentos de Colombia</h1>
        <section class="container">
            <div class= "busqueda">
                <input type="text" placeholder="Buscar Departamento">
                <img src="../assets/buscarM.png" alt="" width="40px">
            </div>
            <div class="container">
                <div class="carta amazonas" style="background-image: url(../assets/amazonas.webp);">
                    <a href="depVista.html"><h4>Departamento<br>Poblacion<br>Resguardos</h4></a>
                </div>
                <div class="carta" style="background-image: url(../assets/casanare.webp);">
                    <a href="depVista.html"><h4>Departamento<br>Poblacion<br>Resguardos</h4></a>
                </div>
                <div class="carta" style="background-image: url(../assets/cundinamarca.webp);">
                    <a href="depVista.html"><h4>Departamento<br>Poblacion<br>Resguardos</h4></a>
                </div>
                <div class="carta" style="background-image: url(../assets/magdalena.webp);">
                    <a href="depVista.html"><h4>Departamento<br>Poblacion<br>Resguardos</h4></a>
                </div>
                <div class="carta" style="background-image: url(../assets/ndeSan.webp);">
                    <a href="depVista.html"><h4>Departamento<br>Poblacion<br>Resguardos</h4></a>
                </div>
                <div class="carta" style="background-image: url(../assets/sucre.webp);">
                    <a href="depVista.html"><h4>Departamento<br>Poblacion<br>Resguardos</h4></a>
                </div>
                <div class="carta" style="background-image: url(../assets/vaupes.webp);">
                    <a href="depVista.html"><h4>Departamento<br>Poblacion<br>Resguardos</h4></a>
                </div>
                <div class="carta" style="background-image: url(../assets/guaviare.webp);">
                    <a href="depVista.html"><h4>Departamento<br>Poblacion<br>Resguardos</h4></a>
                </div>
                <div class="carta" style="background-image: url(../assets/boyaca.webp);">
                    <a href="depVista.html"><h4>Departamento<br>Poblacion<br>Resguardos</h4></a>
                </div>
            </div>
        </section>
    </main>
</template>

<script>
    export default{
        name: 'Departamentos',

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
                    `http://127.0.0.1:8000/departamento/list/${userId}/`,
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

    .busqueda {
        display: grid;
        grid-template-columns: 2fr 0.1fr;
        width: 100%;
        height: 50px;
        margin: 5% 20% 0% 20%;

    }

    .busqueda input{
        margin-right: -12%;
        border-radius: 30px;
        background-color: rgba(255, 255, 255, 0.692);
        border-color: rgb(121, 121, 121);
        text-align: center;
        font-size: larger;
        color: rgb(0, 0, 0);
    }

    .busqueda img {
        display: block;
        cursor: pointer;
        width: 30px;
        margin: 30% 15% 30% 30%;
        padding: 5%;

        text-align: center;
    }

    .container {
        width: 100%;
        height: 10%;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }

    .container .carta{
        width: 25%;
        max-width: 180px;
        min-width: 180px;
        height: 300px;
        border-radius: 10px;
        box-shadow: 0,2px rgba(2px, 0px, 4px, 0.1);
        margin: 3%;
        text-align: center;
        transition: 0.5s;
        background-position: center;
        cursor: pointer;
        border-style: groove;
        border-color: rgba(0, 0, 0, 0.329);
    }

    .container .amazonas{
        background-position: left;
    }

    .container .carta:hover{
        transform: translateY(-15px);
        box-shadow: 0 12px 16px rgba(0,0,0,0.8);
        border-color: rgba(0, 0, 0, 0.801);
    }


    .container .carta h4{
        display: none;
        position: relative;
        color: aliceblue;
        padding-top: 70%;
        padding-bottom: 68%;
        background-color: rgba(0, 0, 0, 0.726);
        border-radius: 5;
    }

    .container .carta:hover h4{
        display: block;
    }

    .container .card a{
        font-weight: 500;
    }

    main h1{
        text-align: center;
        font-size: 70px;
    }
</style>