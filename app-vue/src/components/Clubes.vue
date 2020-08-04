<template>
     <div class="row time">
        <img :src="time.escudo" class="img-responsive" :style="{order: invertido == 'true'? 2 : 1}" alt="">
        <span :style="{order: invertido == 'true'? 1 : 2}">{{ time.nome | maiuscula}}</span>
    </div>
</template>

<script>
    export default {
        props:['time','invertido'],
    }
</script>