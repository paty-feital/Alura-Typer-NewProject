$('#botaoPlacar').click(mostraPlacar);
$('.botaoRemover').click(removeLinha);
$('#botaoSync').click(sincronizaPlacar);

function inserePlacar() {
	var corpoTabela = $('.placar').find('tbody');
	var numPalavras = $('.contadorPalavras').text();
	var usuario = $('#usuarios').val();
	var linha = novaLinha(usuario, numPalavras);
	corpoTabela.prepend(linha);
    linha.find('.botaoRemover').click(removeLinha);

    $('.placar').slideDown(500);
    scrollPlacar();
}

function scrollPlacar(){
    var posicaoPlacar = $('.placar').offset().top;
    $('html, body').animate(
    {
        scrollTop: posicaoPlacar+'px'
    },1000);
}

function novaLinha(usuario,palavras){
    var linha = $("<tr>");
    var colunaUsuario = $("<td>").text(usuario);
    var colunaPalavras = $("<td>").text(palavras);
    var colunaRemover = $("<td>");

    var link = $("<a>").attr("href","#").addClass("botaoRemover");
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

    // Icone dentro do <a>
    link.append(icone);

    // <a> dentro do <td>
    colunaRemover.append(link);

    // Os três <td> dentro do <tr>
    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);

    return linha;
}

function removeLinha() {
	event.preventDefault();
	var linhaRemover = $(this).parent().parent();
    linhaRemover.fadeOut(1000);
    setTimeout(function() {
         linhaRemover.remove();
     }, 1000);
   
}

function mostraPlacar() {
    $('.placar').stop().slideToggle(600);
}

function sincronizaPlacar() {
    var placar = [];
    var linhas = $('tbody>tr');
    linhas.each(function() {
        var usuario = $(this).find('td:nth-child(1)').text();
        var palavras = $(this).find('td:nth-child(2)').text();
        var linhaNova = {
            usuario: usuario,
            pontos: palavras
        };
        placar.push(linhaNova);
    });

    var dados = {
        placar: placar
    };

    $.post('http://localhost:3000/placar', dados , function() {
        console.log('Placar sincronizado com sucesso');
        $('.tooltip').tooltipster('open'); 
    }).fail(function(){
        $('.tooltip').tooltipster('open').tooltipster('content', 'Falha ao sincronizar'); 
    }).always(function(){ //novo
        setTimeout(function() {
        $('.tooltip').tooltipster('close'); 
        }, 2200);
    });
}

function atualizaPlacar() {
    $.get('http://localhost:3000/placar', function(data) {
        $(data).each(function() {
            var linha = novaLinha(this.usuario, this.pontos);
            linha.find('.botaoRemover').click(removeLinha);
            $('tbody').prepend(linha);
        });
    });
}