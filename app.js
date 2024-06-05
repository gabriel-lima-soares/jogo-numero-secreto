//Inserido a leitura diretamente pelo JS
let listaDeNumerosSorteados = [];
let numeroMaximo = 100;
let numeroSecreto = gerarNumeroAleatorio();
let numeroDeTentativas = 1;

function exibirNaTela(tag,texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

mensagemInicial();

function mensagemInicial() {
    exibirNaTela('h1', 'Jogo do número secreto');
    exibirNaTela('p', 'Escolha um número entre 1 e ' + numeroMaximo);
}


function verificarChute(){
    let chute = document.querySelector('input').value;
    if(chute==numeroSecreto){
        exibirNaTela('h1', 'ACERTOU');
        let palavraTentativas = numeroDeTentativas > 1 ? 'tentativas' : 'tentativa';
        //let mensagemTentativas = `Parabéns você acertou o número secreto em ${numeroDeTentativas} ${palavraTentativas}`;
        exibirNaTela('p', 'Parabéns você acertou o número secreto em ' + numeroDeTentativas +' ' + palavraTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else{
        if(chute>numeroSecreto){
            exibirNaTela('p', 'O número secreto é menor');
        }else{
            exibirNaTela('p', 'O número secreto  é maior');
        } 
        numeroDeTentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroMaximo + 1);
    let numeroDeElementoDaLista = listaDeNumerosSorteados.length;
    if( numeroDeElementoDaLista == numeroMaximo){
        listaDeNumerosSorteados = [];
    }

    if(listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    }else{
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';    
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    numeroDeTentativas = 1;    
    mensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}