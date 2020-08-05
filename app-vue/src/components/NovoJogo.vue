<template>
    <div>
        <button class="btn btn-warning mb-2 " @click="criarJogo" :disabled="loading">Criar Novo Jogo</button>
    </div>
</template>

<script>
    import getTimes from '../get-time';
    export default {
        created() {
            getTimes
                .then(times => this.times = times)
                .finally(() => this.loading = false);
        },
        beforeMount() {
            console.log(Object.assign({}, this), 'beforMount');
        },
        data() {
            return {
                loading: true,
                times: [],
            }
        },
        inject: ['timesColecao'],
        methods: {
            criarJogo() {
                let iCasa = Math.floor(Math.random() * 20),
                    iFora = Math.floor(Math.random() * 20);

                var timeCasa = this.times[iCasa];
                var timeFora = this.times[iFora];
                this.$emit('novo-jogo', {timeCasa, timeFora});
            },
            showTabela(){
                this.visao = 'tabela'
            }
        }
    }
</script>