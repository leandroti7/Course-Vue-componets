<template>
  <div class="container">
    <titulo></titulo>
    <div class="row">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <novo-jogo :times="times" id="teste" @novo-jogo="showPlacar"></novo-jogo>
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
</template>

<script>

export default {
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
}
</script>

<style>
   .container > .row{
    flex-direction: column;
}
.row > div > button{
    display: flex;
}
</style>
