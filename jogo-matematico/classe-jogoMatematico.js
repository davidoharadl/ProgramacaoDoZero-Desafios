//rank
let rank = [];

class JogoMatematico {
    nome = "";
    n1 = null;
    n2 = null;
    nOperacao = 0;
    nPosicao = 0;
    max = 10;
    min = 0;
    resultadoUser = null;
    resultadoEquacao = null;
    resultado = null;
    vidas = 3;
    pontuacao = 0;

    constructor() {
        this.informeNome();
        this.jogo();
    }

    informeNome() {
        const nomeTemp = prompt("Digite o seu nome:");
        if (nomeTemp == "") {
            this.informeNome();
        }
        this.nome = nomeTemp;
    }

    jogo() {
        this.gerarNumeros();
        switch (this.nOperacao) {
            case 0:
                this.somar();
                break;
            case 1:
                this.subtrair();
                break;
            case 2:
                this.multiplicar();
                break;
            case 3:
                this.divisao();
                break;
        }
        this.checarResultado();
    }

    somar() {
        this.resultadoEquacao = this.n1 + this.n2;
        this.resultadoUser = prompt(`Qual a resposta de ${this.posicao('+')}`);
    }

    subtrair() {
        this.alterarPosciaoDoN1comN2SeN1MenorN2();
        this.resultadoEquacao = this.n1 - this.n2;
        this.resultadoUser = prompt(`Qual a resposta de ${this.posicao('-')}`);
    }

    multiplicar() {
        this.resultadoEquacao = this.n1 * this.n2;
        this.resultadoUser = prompt(`Qual a resposta de ${this.posicao('*')}`);
    }

    divisao() {
        this.gerarDivisivel();
        this.resultadoEquacao = this.n1 / this.n2;
        this.resultadoUser = prompt(`Qual a resposta de ${this.posicao('/')}`);
    }

    gerarDivisivel() {
        if (this.n1 % this.n2 !== 0) {
            this.n1 = Math.floor(Math.random() * (this.max - this.min) + this.min);
            this.n2 = Math.floor(Math.random() * (this.max - this.min) + this.min);
            this.gerarDivisivel();
        }
        
    }

    posicao(sinal) {
        let equacao = "";
        switch (this.nPosicao) {
            case 0:
                //n1
                equacao = `? ${sinal} ${this.n2} = ${this.resultadoEquacao}`;
                this.resultado = this.n1;
                break;

            case 1:
                //n1
                equacao = `${this.n1} ${sinal} ? = ${this.resultadoEquacao}`;
                this.resultado = this.n2;
                break;
            
            case 2:
                //n1
                equacao = `${this.n1} ${sinal} ${this.n2} = ?`;
                this.resultado = this.resultadoEquacao;
                break;
        
            default:
                break;
        }
        return equacao;
    }

    gerarNumeros() {
        this.n1 = Math.floor(Math.random() * (this.max - this.min) + this.min);
        this.n2 = Math.floor(Math.random() * (this.max - this.min) + this.min);
        this.nOperacao = Math.floor(Math.random() * (4 - 0) + 0);
        this.nPosicao = Math.floor(Math.random() * (3 - 0) + 0);
    }

    alterarPosciaoDoN1comN2SeN1MenorN2() {
        let n1Temp = this.n1;
        if(this.n1 < this.n2) {
            this.n1 = this.n2;
            this.n2 = n1Temp;
        }
    }

    tirarVida() {
        this.vidas--;
    }

    ganharVida() {
       if(this.vidas < 3 && this.pontuacao % 50 == 0) {
            this.vidas++;
            this.informeAumentoDeVida();
       }
    }

    ganharPonto() {
        this.pontuacao += 5;
    }

    checkAumentoDeNivel() {
        if (this.pontuacao % 20 == 0) {
            this.max += 10;
            this.informeAumentoDeNivel();
        }
    }

    
    checarResultado() {
        if(this.resultadoUser == this.resultado) {
            this.ganharPonto();
            this.checkAumentoDeNivel();
            this.ganharVida();
            this.jogo();
        } else {
            this.tirarVida();
            if(this.vidas == 0) {
                this.adicionarNoRank();
                this.gameOver();
                this.mostrarRank();
            } else {
                this.informeDeErro();
                this.jogo();
            }
        }
    }

    adicionarNoRank() {
        rank.push({
            nome: this.nome,
            pontuacao: this.pontuacao
        });
    }

    mostrarRank() {
        let msgRank = "";
        rank.forEach(jogador => {
            msgRank += "> "+jogador.nome +" = "+jogador.pontuacao+"\n";
        });
        alert(msgRank);
        
    }

    gameOver() {
        alert(`Game Over!! Sua pontuacao foi de ${this.pontuacao}`);
    }

    informeDeErro() {
        alert(`Resposta Errada! Voce tem agora tem ${this.vidas}`);
    }

    informeAumentoDeNivel() {
        alert(`Subimos nivel!!!`);
    }

    informeAumentoDeVida() {
        alert(`Voce ganhou mais 1 vida!!! Agora voce tem ${this.vidas}`);
    }


    
}