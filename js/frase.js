$('#botaoFrase').click(chamaFraseAleatoria);
$('#botaoEscolheFrase').click(buscaFraseEscolhida);

function chamaFraseAleatoria() {
//	$.get('http://localhost:3000/frases', trocaFraseAleatoria());

	$('.spinner').toggle();

	$.get('http://localhost:3000/frases', trocaFraseAleatoria).fail(function() {
		$('.erro').show();
		setInterval(function() {
			$('.erro').hide();
		}, 3000);
	}).always(function() {
		$('.spinner').toggle();
	});
}

function trocaFraseAleatoria(data) {
		var frase = $('.frase');
		var numeroAleatorio = Math.floor(Math.random() * data.length);
		frase.text(data[numeroAleatorio].texto);

		calculaPalavrasFrase();
		calculaTempoFrase(data[numeroAleatorio].tempo);
	}


function buscaFraseEscolhida() {
	
	$('.spinner').toggle();
	var fraseId = $('#fraseEscolhida').val();
	var dados = { id: fraseId }
	$.get('http://localhost:3000/frases',dados,trocaFrase).fail(function() {
		$('.erro').show();
		setInterval(function() {
			$('.erro').hide();
		}, 3000);
	}).always(function() {
		$('.spinner').toggle();
	});
}

function trocaFrase(data) {
	var frase = $('.frase');
	frase.text(data.texto);
	calculaPalavrasFrase();
	calculaTempoFrase(data.tempo);
}