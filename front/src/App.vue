<template>
  <div id="app" class="app">     
    <header class="forma">
        <div id="logo">
            <img src="../img/simbolo.webp" alt="Logo" width="65px" />
            <h3>Comunidades Indigenas Colombia</h3>
        </div>
        <div id="buscar">
            <input type="text" placeholder="Buscar en la página" />
            <a href="prueba.html"><img src="../img/buscar.png" /></a>
        </div>
        <div class="usuario">
            <a href="#">
                <h3></h3>
            </a>
        </div>
        <div class="usuario">
            <a href="#">
                <h3></h3>
            </a>
        </div>
        <div class="usuario">
            <a href="#pie">
                <h3>Contacto</h3>
            </a>
        </div>
        <nav class="usuario">
            <button v-if="isAuth" v-on:click="loadHome"> Inicio </button>
            <button v-if="isAuth" v-on:click="logOut"> Cerrar Sesión </button>
            
            <button v-if="!isAuth" v-on:click="loadLogIn"> Iniciar Sesión </button>
            <button v-if="!isAuth" v-on:click="loadSignUp"> Registrarse </button>
        </nav>    
    </header>
    <div class="main-component">
      <router-view
        v-on:completedLogIn ="completedLogIn"
        v-on:completedSignUp="completedSignUp" 
      >
      </router-view>
    </div>
    <footer class="footer">
        <div id="pie">
            <p>Contacto <br />Telefono <br />Email</p>
        </div>
    </footer>
  </div>
</template>


<script>
export default{
    name: 'App',

    data: function(){
      return {
        isAuth: false
      }
    },

    components:{

    },

    methods:{
      verifyAuth: function(){
        this.isAuth = localStorage.getItem("isAuth") || false;
        if(this.isAuth == false){
          this.$router.push({name: "login"})
        }
        else{
          this.$router.push({name: "depge"}) 
        }            
      },
      
      completedLogIn: function(data){
          localStorage.setItem('username', data.username);
          localStorage.setItem('tokenRefresh', data.tokenRefresh);
          localStorage.setItem('tokenAccess', data.tokenAccess);
          localStorage.setItem('isAuth', true);
          alert("Autenticación exitosa");
          this.verifyAuth();
      },

      completedSignUp: function(data){
        alert("Registro exitoso");
        this.completedLogIn(data);
      },    

      loadHome: function(){
        this.$router.push({name: "DepVista"});
      },
      
      logOut: function(){
        localStorage.clear();
        alert("Sesión terminada");
        this.verifyAuth();
      },
    
      loadLogIn: function(){
        this.$router.push({name: "login"})
      },

      loadSignUp: function(){
        this.$router.push({name: "registrar"})
      },
    },
    
    created: function(){
      this.verifyAuth();
    }
  }
</script>

<style>

   body{
        background: linear-gradient(
        rgba(0, 0, 0, 0.5), 
        rgba(0, 0, 0, 0.5)),
        url(../img/fondo6r.webp);
        background-position: top;
        background-size: 100%;
        background-repeat: no-repeat;
        display: grid;
        grid-template-rows: 1fr 7fr 1fr;
        width: 100%;  
    }
    
    #cuerpo {
        display: grid;
        grid-template-columns: auto;
        grid-template-rows: 1fr 5fr 1fr;
    }

   *{
        margin: 0;
        padding: 0;
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        list-style: none;
        text-decoration: none;
    }

    .forma {
        display: grid;
        min-width: 680px;
        width: 100%;
        height: 15%;
        grid-template-columns: 2fr 5fr 1fr 1fr 1fr;
        background-color: rgba(0, 0, 0, 0.651);
        position: fixed;
        transition: 0.5s ease-in;
    }
    
    .bajo {
        display: grid;
        min-width: 680px;
        width: 100%;
        height: 15%;
        grid-template-columns: 2fr 5fr 1fr 1fr 1fr;
        background-color: rgb(119, 117, 117);
        position: fixed;
        transition: 0.5s ease-out;
    }
    
    .forma #logo {
        display: grid;
        grid-template-columns: 0.5fr 1fr;
        width: 100%;
        color: aliceblue;
    }
    
    .bajo #logo {
            display: grid;
            grid-template-columns: 0.5fr 1fr;
            width: 100%;
            color: rgb(0, 0, 0);
    }
    
    #logo img{
        cursor: pointer;
        align-items: center;
        margin: auto;
    }
    #logo h3{
        margin: auto;
    }
    
    .forma #buscar {
        display: grid;
        grid-template-columns: 4fr 1fr;
        width: 100%;
        margin: 20px;
        align-content: center;
        align-items: center;
    }
    
    .forma #buscar input{
        text-align: center;
        border-radius: 10px;
        border-color: rgba(0, 0, 0, 0.904);
        background-color: rgba(20, 20, 20, 0.767);
        color: aliceblue;
        padding: 10px;
        margin-right: -50px;
    }
    
    .bajo #buscar input{
        text-align: center;
        border-radius: 10px;
        border-color: rgba(255, 255, 255, 0.904);
        background-color: rgba(223, 221, 221, 0.767);
        color: rgb(0, 0, 0);
        padding: 10px;
        margin-right: -50px;
    }
    
    .forma #buscar input:active,.forma #buscar input:focus {
        background-color: rgb(32, 32, 32);
    }
    
    .bajo #buscar input:active,.bajo #buscar input:focus {
        background-color: rgb(172, 172, 172);
    }
    
    #buscar img {
        display: flex;
        cursor: pointer;
        margin-top: 1px;
        padding-left: 15px;
        width: 40px;
        align-content: flex-start;
    }
    
    #buscar input::selection {
        border: 0ch;
        border-color: black;
    }
    
    .forma .usuario {
        display: grid;
        grid-template-columns: 1fr 1fr;
        width: 100%;
        margin: auto;
    }
    
    
    .forma .usuario a{
        text-decoration: none;
        align-content: center;
        text-align: center;
        cursor: pointer;
        color: rgb(255, 255, 255);
    }

    .forma .usuario button{
        text-decoration: none;
        align-content: center;
        text-align: center;
        cursor: pointer;
        color: rgb(0, 0, 0);
    }
    
    .bajo .usuario a{
        text-decoration: none;
        align-content: center;
        cursor: pointer;
        color: rgb(0, 0, 0);
    }
    
    .forma .usuario a:hover {
        font-size: larger;
        color: rgb(4, 231, 61);
    }

    .forma .usuario button:hover{
        color: rgb(255, 255, 255);
        background: #000000;
        border: 1px solid #ffffff;
    }
    
    .bajo .usuario a:hover {
        font-size: larger;
        color: rgb(9, 40, 143);
    }
    
    .opcion{
        display: inline;
        font-size: large;
        padding: 0 3%;
        text-align: center;
    }
    
    .opcion ul a {
        background-color: black;
    }

    footer {
        background-color: rgb(119, 117, 117);
        color: rgb(0, 0, 0);
        padding: 30px;
        text-align: center;
        width: 100%;
        height: 100%;
    }
</style>