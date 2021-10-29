<template>
  <nav class="navegacion">
    <ul v-if="isAuth" class="mostrar">
      <li>
        <h3 v-on:click="loadDep">Departamento</h3>
      </li>
      <li>
        <h3 v-on:click="loadCity">Municipios</h3>
      </li>
      <li>
        <h3 v-on:click="loadAso">Asociaciones</h3>
      </li>
      <li>
        <h3 v-on:click="loadRes">Resguardos</h3>
      </li>
    </ul>
  </nav>
  <div>
    <router-view
      v-on:completedLogin="completedLogin"
      v-on:completedSignUp="completedSignUp"
      v-on:logOut="logOut"
    >
    </router-view>
  </div>
  <footer class="footer">
    <div id="pie">
      <p><b>Contacto: </b>Sebastian Celis / Cristian Medina<br /><b>Teléfono: </b>1234567890<br/><b>Email: </b>comunidadesindigenasdecolombia@comindsc.xyz</p>
    </div>
  </footer>
  <header class="cabecera">
    <div id="logo">
      <img src="./assets/simbolo.webp" alt="Logo" />
      <h3>Comunidades Indigenas Colombia</h3>
    </div>
    <div id="buscar">
      <input v-if="isAuth" type="text" placeholder="Buscar en la página" />
      <img v-if="isAuth" src="./assets/buscar.png" alt="#" v-on:click="buscarGen"/>
    </div>
    <div class="usuario">
      <h3 v-on:click="scrollInto('footer')">Contacto</h3>
    </div>
    <div class="usuario">
      <h3 v-on:click="loadLogin" v-if="!isAuth">Ingresar</h3>
      <h3 v-on:click="loadProfile" v-if="isAuth">Perfil</h3>
    </div>
    <div class="usuario">
      <h3 v-on:click="loadSignUp" v-if="!isAuth">Registrarse</h3>
      <h3 v-on:click="logOut" v-if="isAuth">Salir</h3>
    </div>
  </header>
</template>

<script>
export default {
  name: "App",

  data: function() {
    return {
      isAuth: false,
    };
  },
  components: {},

  methods: {
    verifyAuth: function() {
      this.isAuth = localStorage.getItem("isAuth") || false;
      if (this.isAuth == false) {
        this.$router.push({ name: "ingresar" });
      } else {
        this.$router.push({ name: "departamentos" });
      }
    },
    loadLogin: function() {
      this.$router.push({ name: "ingresar" });
      this.scrollInto("navegacion");
    },
    loadSignUp: function() {
      this.$router.push({ name: "registro" });
      this.scrollInto("navegacion");
    },
    loadProfile: function() {
      this.$router.push({ name: "perfil" });
      this.scrollInto("navegacion");
    },
    loadDep: function() {
      this.$router.push({ name: "departamentos" });
    },
    loadCity: function() {
      this.$router.push({ name: "municipios" });
    },
    loadAso: function() {
      this.$router.push({ name: "asociaciones" });
    },
    loadRes: function() {
      this.$router.push({ name: "resguardos" });
    },
    scrollInto(elementClass) {
      const section = document.querySelector(`.${elementClass}`);
      section.scrollIntoView({ behavior: "smooth" });
    },

    logOut: function() {
      localStorage.clear();
      this.verifyAuth();
      this.$router.push({ name: "ingresar" });
      this.scrollInto("navegacion");
    },
    completedLogin: function(data) {
      localStorage.setItem("username", data.username);
      localStorage.setItem("tokenRefresh", data.token_refresh);
      localStorage.setItem("tokenAccess", data.token_access);
      localStorage.setItem("isAuth", true);
      this.verifyAuth();
      alert("Ingreso existoso");
      this.$router.push({ name: "departamentos" });
    },
    completedSignUp: function() {
      alert("Tu registro se a completado");
      this.logOut();
    },
    buscarGen:function(){
      // Funcion bara la busqueda de datos en la pagina
    },
  },

  created: function() {
    this.verifyAuth();
  },

  function: window.addEventListener("scroll", function() {
    var header = document.querySelector("header");
    header.classList.toggle("bajo", window.scrollY > 90);
  }),
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  list-style: none;
  text-decoration: none;
}

#app {
  display: grid;
  height: 100%;
  grid-template-rows: 1fr 7fr 1fr;
  width: 100%;
}

main {
  background-color: white;
}

h1 {
  margin-top: 30px;
  width: 100%;
  text-align: center;
  font-size: 70px;
  /* color: white; */
  color: black;
}

.navegacion {
  width: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(./assets/fondo6r.webp);
  background-position: top;
  background-size: 100%;
}

.departamentos {
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(./assets/fondo5.webp);
  background-position: top;
  background-size: 100%;
}

.cabecera {
  display: grid;
  min-width: 680px;
  width: 100%;
  grid-template-columns: 2fr 7fr 1fr 1fr 1fr;
  background-color: rgba(0, 0, 0, 0.651);
  position: fixed;
  transition: 0.5s ease-in;
}

.bajo {
  display: grid;
  min-width: 680px;
  width: 100%;
  grid-template-columns: 2fr 7fr 1fr 1fr 1fr;
  background-color: rgb(119, 117, 117);
  position: fixed;
  transition: 0.5s ease-out;
}

.cabecera #logo {
  display: grid;
  grid-template-columns: 0.5fr 1fr;
  width: 100%;
  color: aliceblue;
}

.bajo #logo {
  display: grid;
  grid-template-columns: 0.5fr 1fr;
  width: 100%;
}

#logo img {
  cursor: pointer;
  align-items: center;
  margin: auto;
  width: 65px;
}
#logo h3 {
  margin: auto;
}

.cabecera #buscar {
  display: grid;
  grid-template-columns: 4fr 1fr;
  width: 100%;
  margin: 20px;
  align-content: center;
  align-items: center;
}

.cabecera #buscar input {
  text-align: center;
  border-radius: 10px;
  border-color: rgba(0, 0, 0, 0.904);
  background-color: rgba(20, 20, 20, 0.767);
  color: aliceblue;
  padding: 10px;
  margin-right: -50px;
}

.bajo #buscar input {
  text-align: center;
  border-radius: 10px;
  border-color: rgba(255, 255, 255, 0.904);
  background-color: rgba(223, 221, 221, 0.767);
  color: rgb(0, 0, 0);
  padding: 10px;
  margin-right: -50px;
}

.cabecera #buscar input:active,
.cabecera #buscar input:focus {
  background-color: rgb(32, 32, 32);
}

.bajo #buscar input:active,
.bajo #buscar input:focus {
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

.cabecera .usuario {
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  margin: auto;
}

.cabecera .usuario h3 {
  text-decoration: none;
  align-content: center;
  text-align: center;
  cursor: pointer;
  color: rgb(255, 255, 255);
}

.bajo .usuario h3 {
  text-decoration: none;
  align-content: center;
  cursor: pointer;
  color: rgb(255, 255, 255);
}

.cabecera .usuario h3:hover {
  font-size: larger;
  color: rgb(4, 231, 61);
}

.bajo .usuario h3:hover {
  font-size: larger;
  color: rgb(250, 217, 33);
}

.opcion {
  display: inline;
  font-size: large;
  padding: 0% 3%;
  text-align: center;
}

.opcion ul h3 {
  background-color: black;
}
</style>

<style>
.mostrar {
  position: relative;
  display: grid;
  padding-top: 60px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  list-style: none;
  width: 100%;
  height: 15%;
}

.mostrar li {
  margin: 0;
}
.mostrar > li > h3 {
  cursor: pointer;
  text-align: center;
  color: rgb(255, 255, 255);
  font-size: larger;
  line-height: 2rem;
  margin: 30px 0px 0px 10px;
}

.mostrar li h3:hover {
  color: rgb(4, 231, 61);
  font-size: 25px;
}
</style>

<style>
footer {
  background-color: rgb(119, 117, 117);
  color: rgb(0, 0, 0);
  padding: 30px;
  text-align: center;
  width: 100%;
  height: 100%;
}
</style>

<style>
form {
  display: grid;
  grid-template-rows: 1fr 1fr;
  align-content: center;
  padding: 5%;
  margin: 10px 20%;
}
form div {
  display: grid;
  grid-template-rows: auto;
  border-radius: 20px;
  padding: 5%;
  border-style: dotted;
  border-color: black;
}

.img {
  margin: auto;
  padding-bottom: 20px;
}

form input,
button,
h3 {
  text-align: center;
  border-radius: 50px;
  margin: 10px 10%;
  padding: 2%;
}

form button {
  padding: 2%;
  margin: auto;
}
.editar {
  cursor: pointer;
  padding: 1.5% 7%;
  color: blue;
  border-style: none;
}

.eliminar {
  border-style: none;
  cursor: pointer;
  color: brown;
}

.eliminar:hover {
  background-color: brown;
  color: white;
}

.editar:hover {
  background-color: blue;
  color: white;
}
</style>
