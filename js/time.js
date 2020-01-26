class Time {
    constructor(nome, escudo) {
        this.nome = nome;
        this.escudo = escudo;
        this.pontos = 0;
        this.gm = 0;
        this.gs = 0;
        this.saldo = 0;
    }

    fimJogo(timeVisitante, golsMarcados, golSofridos) {
        if (this.foiEmpate(golsMarcados, golSofridos)) {
            this.empate(golsMarcados, golSofridos);
            timeVisitante.empate(golsMarcados, golSofridos);
            return;
        }
        if (this.foiVitoria(golsMarcados, golSofridos)) {
            this.vitoria(golsMarcados, golSofridos);
            timeVisitante.derrota(golSofridos, golsMarcados);
        } else {
            this.derrota(golsMarcados, golSofridos);
            timeVisitante.vitoria(golSofridos, golsMarcados);

        }
    }

    foiEmpate(golsMarcados, golSofridos) {
        return golsMarcados === golSofridos
    }
    foiVitoria(golsMarcados, golSofridos) {
        return golsMarcados > golSofridos;
    }

    empate(golsMarcados, golSofridos) {
        this.atualizarInfo(1, golsMarcados, golSofridos);
    }

    vitoria(golsMarcados, golSofridos) {
        this.atualizarInfo(3, golsMarcados, golSofridos);
    }

    derrota(golsMarcados, golSofridos) {
        this.atualizarInfo(0, golsMarcados, golSofridos);
    }

    atualizarInfo(pontos, golsMarcados, golSofridos) {
        this.pontos += pontos;
        this.gm += golsMarcados;
        this.gs += golSofridos;
        this.saldo += this.gm - this.gs;
    }
}