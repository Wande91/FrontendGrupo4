<template>
    <main>
        <h1>Crear registro de asociación</h1>   
        <form class="nuevoRegistro">
            <label for="">NOMBRE:</label>
            <input type="text" placeholder="nombre">
            <label for="">SIGLAS</label>
            <input type="text">
            <label for="">MUNICIPIOS ID</label>
            <input type="number" name="munID" min="0" max="999">
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

</style>