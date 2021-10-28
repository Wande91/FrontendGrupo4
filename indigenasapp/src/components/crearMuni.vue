<template>
    <main>
        <h1>Crear registro de municipio/ciudad</h1>   
        <form class="nuevoRegistro">
            <label for="">NOMBRE:</label>
            <input type="text" placeholder="nombre">
            <label for="">ID DEPARTAMENTO</label>
            <input type="number" name="nRes" min="0" max="999">
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