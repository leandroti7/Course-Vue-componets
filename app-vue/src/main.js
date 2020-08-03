import Vue from 'vue'
import App from './App.vue'
import Time from './time'
import Titulo from './components/Titulo.vue'
import NovoJogo from './components/NovoJogo.vue'
import TabelaBrasileiro from './components/TabelaBrasileiro.vue'
import Placar from './components/Placar.vue'

Vue.config.productionTip = false

Vue.filter('maiuscula',(valor) => valor.charAt(0).toUpperCase() + valor.slice(1));
Vue.component('titulo', Titulo);
Vue.component('novo-jogo', NovoJogo);
Vue.component('tabela-brasileiro', TabelaBrasileiro);
Vue.component('placar', Placar);

new Vue({
  render: h => h(App),
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
}).$mount('#app')
