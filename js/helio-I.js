$('#botao-promocao').click(function() {

  var promocoes = $('.promocoes');
  if(promocoes.is(':visible')) {

    promocoes.hide();
  } else {
    promocoes.show();
  }

});

//O jQuery possui a função is que permite consultar 
// uma pseudo class. Toda vez que um elemento esta com 
// display diferente de none ele ganha a pseudo classe :visible .
// A função is retorna true caso o elemento esteja visível. 
//Se ele estiver visível, precisamos escondê-lo e isso é 
//feito através da função hide. Para exibir o elemento,
// é usada a função show.
