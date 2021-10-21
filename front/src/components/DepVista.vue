<template>
    <div>
        <main>
        <h1>Departamento {NOMBRE}</h1>
        <section class="info">
            <div class="texto">
                <h2>Información sobre el Departamento</h2>
                <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium error ad nisi dolorum, voluptates nihil impedit ea quam delectus. Neque totam ratione cum iure ab tempore, numquam facere. Nulla, quisquam!
                </p>
            </div>
            <div class="datos">
                <h2>Tabla de poblacion indigena</h2>
                <table>
                    <tr>
                        <th>Municipio</th>
                        <th>Asociación</th>
                        <th>Resguardo</th>
                    </tr>
                    <tr>
                        <td><h2><span>{{ id }}</span></h2></td>
                        <td><h2><span>{{ nombre }}</span></h2></td>
                        <td><h2><span>{{ poblacion }}</span></h2></td>
                    </tr>
                    <tr>
                        <td><a href="munVista.html">Mun2</a></td>
                        <td><a href="asoVista.html">Aso2</a></td>
                        <td><a href="resVista.html">Res2</a></td>
                    </tr>
                    <tr>
                        <td><a href="munVista.html">Mun3</a></td>
                        <td><a href="asoVista.html">Aso3</a></td>
                        <td><a href="resVista.html">Res3</a></td>
                    </tr>
                    <tr>
                        <td><a href="munVista.html">Mun4</a></td>
                        <td><a href="asoVista.html">Aso4</a></td>
                        <td><a href="resVista.html">Res4</a></td>
                    </tr>
                    <tr>
                        <td><a href="munVista.html">Mun5</a></td>
                        <td><a href="asoVista.html">Aso5</a></td>
                        <td><a href="resVista.html">Res5</a></td>
                    </tr>
                    <tr>
                        <td><a href="munVista.html">Mun6</a></td>
                        <td><a href="asoVista.html">Aso6</a></td>
                        <td><a href="resVista.html">Res6</a></td>
                    </tr>
                    <tr>
                        <td><a href="munVista.html">Mun7</a></td>
                        <td><a href="asoVista.html">Aso7</a></td>
                        <td><a href="resVista.html">Res7</a></td>
                    </tr>
                    <tr>
                        <td><a href="munVista.html">Mun8</a></td>
                        <td><a href="asoVista.html">Aso8</a></td>
                        <td><a href="resVista.html">Res8</a></td>
                    </tr>
                </table>
            </div>
        </section>
    </main>
    </div>    
</template>

<script>
    import axios      from 'axios';

    export default {
        name: "DepVista",

        data: function(){
            return {
                departamento: {
                    id: 0,
                    name:"",
                    poblacion:0
                }
            }
        },
        methods: {
            getData: async function(){
                axios.get(
                        `http://localhost:8000/departamento/1/`,
                        {headers: {}}
                )
                .then((result) => {
                    this.id  = result.data.id;
                    this.name    = result.data.name;
                    this.poblacion   = result.data.poblacion;
                })
                .catch((error) => {

                })
            }         
        },
        created: function(){
           this.getData();
        }
    }
</script>

<style>

    .info {
        display: grid;
        grid-template-columns: 1fr 1fr;
        margin-top: 10%;
    }
    
    .info .texto {
        text-align: center;
    }
    
    
    .info .datos {
        text-align: center;
        margin: auto;
    }
    
    .info .datos h2, .info .texto h2{
        margin-bottom: 20%;
    }
    
    .info .datos table{
        margin: 20px 20px;
        background-color: rgba(127, 255, 212, 0.781);
        border-style: double;
        border-radius: 10px;
    }
    
    .info .datos table tr th{
        margin: 10%;
        padding: 20px;
        border-style: double;
        background-color: black;
        color: white;
        font-size: larger;
        border-radius: 10px;
    }
    
    .info .datos table tr td {
        padding: 5px;
        border-color:aquamarine black;
        border-style: double;
        font-size: medium;
        color: wheat;
    }

    .info .datos table tr td h2{
        text-decoration: none;
        color: black;
    }

    .info .datos table tr td h2:hover{
        font-size: 1.8rem;
        color: brown;
    }
    
    a {
        text-decoration: none;
        color: black;
    }
    
    a:hover {
        font-size: 1.2rem;
        color: brown;
    }


</style>