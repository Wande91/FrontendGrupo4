<template>
    <main class="registro">
        <div class="container">
            <h1>Crear usuario</h1>
        </div>
        <form action="">
            <div>
                <img src="../assets/usuario.webp" alt="usuario" class="img">
                <input type="text" name="usuario" placeholder="Username" v-model="user.username">
                <input type="password" name="pass" placeholder="Contraseña" v-model="user.password">
                <input type="text" name="nombre" placeholder="Nombre" v-model="user.name">
                <input type="email" name="email" placeholder="Email" v-model="user.email">

                <button disabled="disabled">Aceptar</button>        
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
            processCreate:function(){
                axios.post(
                    'localhost:8000/user/',
                    this.usuario,
                    {headers:{}}
                )
                .then((result) => {
                    let dataLogin = {
                        username: this.user.username,
                        tokenAccess : result.data.access,
                        tokenRefresh: result.data.refresh
                    }
                    this.$emit('completeLogin', dataLogin)
                })
                .catch((error)=> {
                    if(error.response.status == "401")
                        alert("Credenciales incorrectas");
                });
            }
        }
    }
</script>

<style>

</style>
