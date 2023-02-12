let listaPrioridade = [];
let listaNormal = [];
let contagem = 0;

function mostrarTempoChamada(tempoChamada) {
    const DIA = tempoChamada.getDate();
    const MES = tempoChamada.getMonth();
    const ANO = tempoChamada.getFullYear();
    const HORA = tempoChamada.getHours();
    const MIN = tempoChamada.getMinutes();
    const CAMPO_HORA_CHAMADA = document.querySelector("#campo-hora-chamada");
    CAMPO_HORA_CHAMADA.textContent = `${HORA}:${MIN} - ${DIA}/${MES}/${ANO}`;
}

function falar(texto) {
    let frase = new SpeechSynthesisUtterance(texto);
    frase.voice = window.speechSynthesis.getVoices().filter(v => v.lang == "pt-BR")[9];
    frase.rate = 0.75;
    frase.lang = "pt-BR";
    window.speechSynthesis.speak(frase);
}

function mostrarNaTela(nomePaciente) {
    if(nomePaciente == "Milagre, nao temos Pacientes na fila!!!") {
        texto = nomePaciente;
        document.querySelector("#show-chamada").textContent = texto;
        falar(texto);
        return;
    }
    texto = nomePaciente+"! Compareca ao consultorio 1"
    document.querySelector("#show-chamada").textContent = texto;
    falar(texto);
}

function chamarProximo() {
    let tempoChamada = new Date();
    
    if (listaPrioridade.length > 0) {
        //entro no sistema de contagem
        if ( contagem < 2 ) {
            let nome = listaPrioridade.shift();
            contagem++;                
            mostrarNaTela(nome);
        } else {
            let nome = listaNormal.shift();
            contagem = 0;
            mostrarNaTela(nome);
        }
    } else if (listaNormal.length > 0) {
        let nome = listaNormal.shift();
        contagem = 0;
        mostrarNaTela(nome);
        
    } else {
        mostrarNaTela("Milagre, nao temos Pacientes na fila!!!");
    }
    mostrarTempoChamada(tempoChamada);
}

function validarDados(nome, ano) {
    return (ano != "" && nome != "");
}
        
function adicionarPacienteFila() {
    let nomePaciente = document.querySelector("#input-nome").value;
    let dataPaciente = document.querySelector("#input-data").value;
    let anoPaciente = dataPaciente.slice(0, 4);
    
    if (validarDados(nomePaciente, anoPaciente)){
        
        const ANO_ATUAL = new Date().getFullYear();
        if (ANO_ATUAL - anoPaciente >= 60 ) {
            listaPrioridade.push([nomePaciente]);
        } else {
            listaNormal.push([nomePaciente]);
        }
        alert(`Paciente ${nomePaciente} adicionado com sucesso.`);
    } else {
        alert("Paciente error! Por favor preencha os campos do paciente.")
    }
}