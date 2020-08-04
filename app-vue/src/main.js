import Vue from 'vue'
import App from './App.vue'
import Time from './time'
import Titulo from './components/Titulo.vue'
import NovoJogo from './components/NovoJogo.vue'
import TabelaBrasileiro from './components/TabelaBrasileiro.vue'
import Placar from './components/Placar.vue'
import Clubes from './components/Clubes.vue'
import ClubesLibertadores from './components/ClubesLibertadores.vue'
import ClubesRebaixados from './components/ClubesRebaixados.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

Vue.config.productionTip = false

Vue.filter('maiuscula',(valor) => valor.charAt(0).toUpperCase() + valor.slice(1));
Vue.component('titulo', Titulo);
Vue.component('clube', Clubes);
Vue.component('novo-jogo', NovoJogo);
Vue.component('tabela-brasileiro', TabelaBrasileiro);
Vue.component('placar', Placar);
Vue.component('clubes-rebaixados', ClubesRebaixados);
Vue.component('clubes-libertadores', ClubesLibertadores);

new Vue({
  render: h => h(App),
  provide(){
    return{
        timesColecao: [
            new Time('américa MG', require('./assets/america_mg_60x60.png')),
            new Time('Corinthians', require('./assets/corinthians_60x60.png')),
            new Time('flamengo', require('./assets/flamengo_60x60.png')),
            new Time('Palmeiras', require('./assets/palmeiras_60x60.png')),
            new Time('Sport', require('./assets/sport_60x60.png')),
            new Time('Botafogo', require('./assets/botafogo_60x60.png')),
            new Time('Grêmio', require('./assets/gremio_60x60.png')),
            new Time('vasco', require('./assets/vasco_60x60.png')),
            new Time('Chapecoense', require('./assets/chapecoense_60x60.png')),
            new Time('bahia', require('./assets/bahia_60x60.png')),
            new Time('Vitória', require('./assets/vitoria_60x60.png')),
            new Time('São Paulo', require('./assets/sao_paulo_60x60.png')),
            new Time('Parana', require('./assets/parana_60x60.png')),
            new Time('Cruzeiro', require('./assets/cruzeiro_60x60.png')),
            new Time('Santos', require('./assets/santos_60x60.png')),
            new Time('Internacional', require('./assets/internacional_60x60.png')),
            new Time('Atlético-PR', require('./assets/atletico-pr_60x60.png')),
            new Time('Fluminense', require('./assets/fluminense_60x60.png')),
            new Time('Atletico MG', require('./assets/atletico_mg_60x60.png')),
            new Time('Cerará', require('./assets/ceara_60x60.png')),
        ]
    }
  },
}).$mount('#app')
