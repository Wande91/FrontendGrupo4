<template>
    <main>
        <h1>Crear registro de resguardo</h1>   
        <form class="nuevoRegistro">
            <label for="">NOMBRE:</label>
            <input type="text" placeholder="resguardo">
            <label for="">RESGUARDO ID</label>
            <input type="number" min="0" max="99999">
            <label for="">ASOCIACIÓN ID</label>
            <input type="number" name="nRes" min="0" max="999">
            <label for="">NUMERO DE POBLACIÓN</label>
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

</style>