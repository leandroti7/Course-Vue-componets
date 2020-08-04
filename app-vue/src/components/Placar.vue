<template>
    <form class="form-inline">
        <clube :time=" timeCasa" invertido="true" v-if="timeCasa"></clube>
        <input type="text" class="form-control mr-3 ml-3 mb-5 mt-5" v-model="golsCasa">
        X
        <input type="text" class="form-control mr-3 ml-3 mb-5 mt-5" v-model="golsFora">
        <clube :time="timeFora"  v-if="timeFora"></clube>
        <div class="row col-md-12 mt-5 mb-5">
            <button type="button" class="btn btn-primary" @click="fimJogo">Fim de jogo</button>
        </div>
    </form>
</template>

<script>
export default {
    props: ['timeCasa', 'timeFora'],
    data(){
        return{
            golsCasa: 0,
            golsFora: 0
        }
    },
    methods: {
        fimJogo() {
            let golsMarcados = parseInt(this.golsCasa);
            let golSofridos = parseInt(this.golsFora);
            this.timeCasa.fimJogo(this.timeFora, golsMarcados, golSofridos);
            // this.visao = 'tabela';
            this.$emit('fim-jogo');
        }
    }
}
</script>

<style scoped>
    .form-inline{
        justify-content: space-evenly;
    }
    .row .time{
        display: flex;
        align-items: center;
    }
    .row > img{
        width: 60px;
        height: 60px;
    }
</style>