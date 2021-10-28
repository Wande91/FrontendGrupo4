<template>
    <main>
        <h1>Crear registro de departamento</h1>   
        <form class="nuevoRegistro">
            <label for="">NOMBRE:</label>
            <input type="text" placeholder="nombre">
            <label for="">RESGUARDOS</label>
            <input type="number" min="0" max="999">
            <label for="">MUNICIPIOS CON RESGUARDO</label>
            <input type="number" name="nRes" min="0" max="999">
            <label for="">POBLACIÓN</label>
            <input type="number" name="poblacion" min="0" max="99999999">
            <label for="">INFORMACIÓN</label>
            <textarea name="" id="" cols="30" rows="10"></textarea>
            <button class="guardarB">Crear</button>
        </form> 
    </main>    
</template>

<script>
export default {
    name: 'crearAso'

}
</script>

<style>
    main .nuevoRegistro{
        border-style: groove;
        border-radius: 5px;
        border-color: black;
        margin: 10px 30%;
    }
</style>