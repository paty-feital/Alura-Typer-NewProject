// var frase = jQuery('.frase'); $ substitui a palavra jQuery
var tempoFrase = $('.tempoDigitacao').text();
var campo = $('.campoDigitacao');

// $(document).ready(function() { ==> também um atalho, e podemos usar:
$(function() {

	calculaPalavrasFrase();
	calculaContadores();
	calculaTempoRestante();
	inicializaMarcadores();
	atualizaPlacar();
	$('#botaoReiniciar').click(reiniciaJogo);

	$('#usuarios').selectize({
	    create: true,
	    sortField: 'text'
	});

	$('.tooltip').tooltipster({
    	trigger: 'custom'
	});

});

function calculaTempoFrase(tempo) {

	tempoFrase = tempo;
	$('.tempoDigitacao').text(tempo);
}

function calculaPalavrasFrase() {

	var frase = $('.frase').text(); // pega o texto da classe "frase"
	var numPalavras = frase.split(' ').length; // separa as palavras, gera array e retorna o tamanho do array
	var tamanhoFrase = $('.tamanhoFrase'); // pega o texto do tamanho da palavra da classe "tamanhoFrase"
	tamanhoFrase.text(numPalavras); // substitui o texto "tamanhoFrase" pelo "numPalavras"

}

function calculaContadores() {
	campo.on('input', function() {
		var conteudo = (campo.val());

		var qtdCaracteres = conteudo.length; // Para sermos mais precisos na contagem, 
											 //	 uma expressão regular em vez dos espaço vazio.
											 //	A expressão regular será responsável por buscar 
											 // qualquer caractere, exceto espaço vazio: /\S+/.
											 
		$('.contadorCaracteres').text(qtdCaracteres);

		var qtdPalavras = conteudo.split(/\S+/).length - 1;
		$('.contadorPalavras').text(qtdPalavras);
	});
}

function calculaTempoRestante() {
	campo.one('focus', function() {
		var tempoRestante = $('.tempoDigitacao').text();
		$('#botaoReiniciar').attr('disabled',true);
		var cronometroID = setInterval(function() {
			
			tempoRestante--;
			$('.tempoDigitacao').text(tempoRestante);
			
			if(tempoRestante < 1) {
				clearInterval(cronometroID);
				finalizaJogo();
			}

		}, 1000);
	});
}

function finalizaJogo() {
	campo.attr('disabled', true);
	$('#botaoReiniciar').attr('disabled', false);
	campo.addClass('campoDesativado');
	inserePlacar();
}

function inicializaMarcadores() {
    
    campo.on("input", function() {
    	var frase = $(".frase").text();
        var digitado = campo.val();
        var comparavel = frase.substr(0 , digitado.length);
        var validade = true;

        if( frase.startsWith(digitado)) {
 			campo.addClass("borda-verde");
 			campo.removeClass("borda-vermelha");
 			validade = true;
		} else {
 			campo.addClass("borda-vermelha");
 			campo.removeClass("borda-verde");
 			validade = false;
		}
    });
}

function reiniciaJogo() {
   	campo.attr('disabled', false);
	campo.val('');
	campo.removeClass('campoDesativado');
	$('.contadorCaracteres').text('0');
	$('.contadorPalavras').text('0');
    campo.removeClass("borda-vermelha");
    campo.removeClass("borda-verde");
    $('.tempoDigitacao').text(tempoFrase);
 	calculaTempoRestante(); 
}