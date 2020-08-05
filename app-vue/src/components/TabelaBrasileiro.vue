<template>
    <div>
        <div v-if="loading">Carregando...</div>
        <div v-else>
            <input type="text" class="form-control" v-model="busca">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th v-for="(coluna, indice) in ordem.colunas" :key="indice">
                            <a href="#" @click.prevent="ordenar(indice)">{{ coluna | maiuscula }}</a>
                        </th>
                    </tr>
                </thead>
                <tbody>
                <tr v-for="(time,indice) in timesFiltrados" :key="indice" :class="{ 'table-success': indice < 6}" :style="{ 'font-weight': indice < 6? '900': '400'}">
                    <td>
                        <clube :time='time'></clube>
                    </td>
                    <td>{{ time.pontos }}</td>
                    <td>{{ time.gm }}</td>
                    <td>{{ time.gs }}</td>
                    <td>{{ time.saldo }}</td>
                    <!-- <td>{{ time | saldo }}</td> -->
                </tr>
                </tbody>
            </table>
            <clubes-libertadores :times="timesOrderd"></clubes-libertadores>
        <clubes-rebaixados :times="timesOrderd"></clubes-rebaixados>
        </div>
    </div>
</template>

<script>
import _ from 'lodash';
import getTimes from '../get-time';
export default {
    // props: ['times'],
    created() {
        getTimes
            .then(times => this.times = times)
            .finally(() => this.loading = false);
    },
    data(){
        return {
            loading: true,
            busca: '',
            times: [],
            ordem: {
                ordenacao: ['desc', 'desc', 'asc', 'desc'],
                colunas: ['pontos', 'gm', 'gs', 'saldo']
            },
        }  
    },
    inject: ['timesColecao'],
    computed: {
        timesFiltrados() {
            let self = this;
            return _.filter(this.timesOrderd, function (time) {
                let busca = self.busca.toLowerCase();
                return time.nome.toLowerCase().indexOf(busca) >= 0;
            })
        },
        timesOrderd() {
            return _.orderBy(this.times, this.ordem.colunas, this.ordem.ordenacao)
        }
    },
    methods: {
        ordenar(indice) {
            this.$set(this.ordem.ordenacao, indice, this.ordem.ordenacao[indice] == 'desc' ? 'asc' : 'desc')
        }
    }
}
</script>

<style scoped>
    .row .time{
        display: flex;
        align-items: center;
    }
    img.img-responsive{
        width: 60px;
        height: 60px;
        margin: 0 10px;
    }
    </style>