<template>
    <div>
        <button class="btn btn-warning mb-2 " @click="criarJogo">Criar Novo Jogo</button>
    </div>
</template>

<script>
export default {
    props:['times'],
    inject: ['timesColecao'],
    methods: {
        criarJogo() {
            let iCasa = Math.floor(Math.random() * 20),
                iFora = Math.floor(Math.random() * 20);

             var timeCasa = this.timesColecao[iCasa];
             var timeFora = this.timesColecao[iFora];
            this.$emit('novo-jogo', {timeCasa, timeFora});
        },
        showTabela(){
            this.visao = 'tabela'
        }
    }
}
</script>