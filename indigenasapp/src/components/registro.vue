<template>
    <main class="registro">
        <div class="container">
            <h1>Crear usuario</h1>
        </div>
        <form v-on:submit.prevent="processSignUp">
            <div>
                <img src="../assets/usuario.webp" alt="usuario" class="img">
                <input type="text" name="usuario" placeholder="Username" v-model="user.username">
                <input type="password" name="pass" placeholder="Contraseña" v-model="user.password">
                <input type="text" name="nombre" placeholder="Nombre" v-model="user.name">
                <input type="email" name="email" placeholder="Email" v-model="user.email">
                <button type="summit">Aceptar</button>        
            </div>
        </form>
    </main>
</template>

<script>
    import axios from 'axios';
    export default {
        name: 'Registro',

        data: function(){
            return {
                user:{
                    username : "",
                    password : "",
                    name : "",
                    email : ""
                }
            }
        },
        methods:{
            processSignUp:function(){
                axios.post(
                    'http://127.0.0.1:8000/user/',
                    this.user,
                    {headers:{}}
                )
                .then((result) => {
                    let dataLogin = {
                        username: this.user.username,
                        tokenAccess : result.data.access,
                        tokenRefresh: result.data.refresh
                    }
                    this.$emit('completedSignUp', dataLogin)
                })
                .catch((error)=> {
                    if(error.response.status == "401")
                        alert("Datos incorrectos");
                    if(error.response.status == "400")
                        alert("Ocurrio un error al agregar usuario, intente de nuevo");
                });
            }
        }
    }
</script>

<style>

</style>
