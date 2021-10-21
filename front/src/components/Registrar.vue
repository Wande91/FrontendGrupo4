<template>
    <main class="main">
        <div class="container">
            <h1>Registro</h1>
        </div>
        <form v-on:submit.prevent="processSignUp" >
                <input type="text" v-model="user.username" placeholder="Username">
                <br>
                <input type="password" v-model="user.password" placeholder="Contraseña">
                <br>
                <input type="text" v-model="user.name" placeholder="Nombre">
                <br>
                <input type="email" v-model="user.email" placeholder="Email">
                <br>
                <button type="submit">Registrarse</button>
            </form>
    </main>
</template>

<script>
    import axios from 'axios';
    export default {
        name: "SignUp",
        data: function(){
            return {
                user: {
                    username: "",
                    password: "",
                    name: "",
                    email: ""
                }
            }
        },
        methods: {
            processSignUp: function(){
                axios.post(
                    "http://localhost:8000/user/",
                    this.user,
                    {headers: {}}
                )
                .then((result) => {
                    let dataSignUp = {
                        username      : this.user.username,
                        tokenAccess  : result.data.access,
                        tokenRefresh : result.data.refresh,
                    }
                    this.$emit('completedSignUp', dataSignUp)
                })
                .catch((error) => {
                    alert("ERROR: Fallo en el registro.");
                });
            }
        }
    }

</script>

<style>

</style>
