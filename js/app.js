Vue.filter('maiuscula', function(valor){
    return valor.charAt(0).toUpperCase() + valor.slice(1)
});
Vue.component('my-app', {
    template: `
    <div class="container">
        <titulo></titulo>
        <div class="row">
            <div class="row justify-content-center">
                <div class="col-md-12">
                    <novo-jogo :times="times" @novo-jogo="showPlacar"></novo-jogo>
                </div>
            </div>
        </div>
        <div class="row">
        </div>
        <div class="row">
            <div class="col-md-12" v-if="visao!='tabela'">
                <placar :time-casa="timeCasa"  :time-fora="timeFora" @fim-jogo="showTabela() "></placar>
            </div>
            <div class="col-md-12" v-if="visao=='tabela'">
                <tabela-brasileiro :times="times"></tabela-brasileiro>
            </div>
        </div>
    </div>
    `,
    data() {
        return {
            times: [],
            timeCasa: null,
            timeFora: null,
            visao: 'tabela'
        }
    },
    methods: {
        showTabela(){
            this.visao = 'tabela'
        },
        showPlacar({timeCasa, timeFora}){
            this.timeCasa = timeCasa;
            this.timeFora = timeFora;
            this.visao = 'placar';
        }
    },
    filters: {
        saldo(time) {
            return time.gm - time.gs;
        }
    }
});

Vue.component('titulo',{
    template:`
    <div class="row">
        <h1 class="=title">Campeonato Brasileiro - Série A - 2018  {{$parent.visao}}</h1>
    </div>
    `
});

Vue.component('clubes-rebaixados', {
    props: ['times'],
    template: `
    <div>
        <h3>Time Rebaixados</h3>
        <ul>
            <li v-for="time in timesRebaixados">
                <clube :time="time"></clube>
            </li>
        </ul>
    </div>
    `,
    computed: {
        timesRebaixados() {
            return this.times.slice(16, 20)
        },
    },

});

Vue.component('tabela-brasileiro', {
    // props: ['times'],
    inject: ['timesColecao'],
    data(){
        return {
            busca: '',
            ordem: {
                ordenacao: ['desc', 'desc', 'asc', 'desc'],
                colunas: ['pontos', 'gm', 'gs', 'saldo']
            },
        }  
    },
    template: `
        <div>
            <input type="text" class="form-control" v-model="busca">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th v-for="(coluna, indice) in ordem.colunas">
                            <a href="#" @click.prevent="ordenar(indice)">{{ coluna | maiuscula }}</a>
                        </th>
                    </tr>
                </thead>
                <tbody>
                <tr v-for="(time,indice) in timesFiltrados" :class="{ 'table-success': indice < 6}" :style="{ 'font-weight': indice < 6? '900': '400'}">
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
    `,
    computed: {
        timesFiltrados() {
            let self = this;
            return _.filter(this.timesOrderd, function (time) {
                let busca = self.busca.toLowerCase();
                return time.nome.toLowerCase().indexOf(busca) >= 0;
            })
        },
        timesOrderd() {
            return _.orderBy(this.timesColecao, this.ordem.colunas, this.ordem.ordenacao)
        }
    },
    methods: {
        ordenar(indice) {
            this.$set(this.ordem.ordenacao, indice, this.ordem.ordenacao[indice] == 'desc' ? 'asc' : 'desc')
        }
    }
});

//kebab
Vue.component('clubes-libertadores', {
    props: ['times'],
    template: `
    <div>
        <h3>Time classificado para libertadores</h3>
        <ul>
            <li v-for="time in timesLibertadores">
                <clube :time="time"></clube>
            </li>
        </ul>
    </div>
    `,
    computed: {
        timesLibertadores() {
            return this.times.slice(0, 6)
        }
    },

});

Vue.component('placar',{
    props: ['timeCasa', 'timeFora'],
    data(){
        return{
            golsCasa: 0,
            golsFora: 0
        }
    },
    template:`
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
    `,
    methods: {
        fimJogo() {
            let golsMarcados = parseInt(this.golsCasa);
            let golSofridos = parseInt(this.golsFora);
            this.timeCasa.fimJogo(this.timeFora, golsMarcados, golSofridos);
            // this.visao = 'tabela';
            this.$emit('fim-jogo');
        }
    },
});

Vue.component('novo-jogo', {
    template:`
    <div>
        <button class="btn btn-warning mb-2 " @click="criarJogo">Criar Novo Jogo</button>
    </div>
    `,
    // props:['times'],
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
    },
});
Vue.component('clube',{
    props:['time','invertido'],
    template:`
    <div class="row time">
        <img :src="time.escudo" class="img-responsive" :style="{order: invertido == 'true'? 2 : 1}" alt="">
        <span :style="{order: invertido == 'true'? 1 : 2}">{{ time.nome | maiuscula}}</span>
    </div>
    `
});
new Vue({
    el: '#app',
    provide(){
        return{
            timesColecao: [
                new Time('américa MG', 'assets/america_mg_60x60.png'),
                new Time('Corinthians', 'assets/corinthians_60x60.png'),
                new Time('flamengo', 'assets/flamengo_60x60.png'),
                new Time('Palmeiras', 'assets/palmeiras_60x60.png'),
                new Time('Sport', 'assets/sport_60x60.png'),
                new Time('Botafogo', 'assets/botafogo_60x60.png'),
                new Time('Grêmio', 'assets/gremio_60x60.png'),
                new Time('vasco', 'assets/vasco_60x60.png'),
                new Time('Chapecoense', 'assets/chapecoense_60x60.png'),
                new Time('bahia', 'assets/bahia_60x60.png'),
                new Time('Vitória', 'assets/vitoria_60x60.png'),
                new Time('São Paulo', 'assets/sao_paulo_60x60.png'),
                new Time('Parana', 'assets/parana_60x60.png'),
                new Time('Cruzeiro', 'assets/cruzeiro_60x60.png'),
                new Time('Santos', 'assets/santos_60x60.png'),
                new Time('Internacional', 'assets/internacional_60x60.png'),
                new Time('Atlético-PR', 'assets/atletico-pr_60x60.png'),
                new Time('Fluminense', 'assets/fluminense_60x60.png'),
                new Time('Atletico MG', 'assets/atletico_mg_60x60.png'),
                new Time('Cerará', 'assets/ceara_60x60.png'),
            ]
        }
    },
    // template:`<my-app></my-app>`,
    data: {
        /* times: [
            new Time('américa MG', 'assets/america_mg_60x60.png'),
            new Time('Corinthians', 'assets/corinthians_60x60.png'),
            new Time('flamengo', 'assets/flamengo_60x60.png'),
            new Time('Palmeiras', 'assets/palmeiras_60x60.png'),
            new Time('Sport', 'assets/sport_60x60.png'),
            new Time('Botafogo', 'assets/botafogo_60x60.png'),
            new Time('Grêmio', 'assets/gremio_60x60.png'),
            new Time('vasco', 'assets/vasco_60x60.png'),
            new Time('Chapecoense', 'assets/chapecoense_60x60.png'),
            new Time('bahia', 'assets/bahia_60x60.png'),
            new Time('Vitória', 'assets/vitoria_60x60.png'),
            new Time('São Paulo', 'assets/sao_paulo_60x60.png'),
            new Time('Parana', 'assets/parana_60x60.png'),
            new Time('Cruzeiro', 'assets/cruzeiro_60x60.png'),
            new Time('Santos', 'assets/santos_60x60.png'),
            new Time('Internacional', 'assets/internacional_60x60.png'),
            new Time('Atlético-PR', 'assets/atletico-pr_60x60.png'),
            new Time('Fluminense', 'assets/fluminense_60x60.png'),
            new Time('Atletico MG', 'assets/atletico_mg_60x60.png'),
            new Time('Cerará', 'assets/ceara_60x60.png'),
        ] */
    }
});