$('#botao-promocao').click(function() {

  var promocoes = $('.promocoes');
  if(promocoes.hasClass('invisivel')) {

    promocoes.removeClass('invisivel');
  } else {
    promocoes.addClass('invisivel');
  }

});

//Esta correta! o jQuery possui a função hasClass 
//que retorna true se um elemento possui ou não uma classe. 
//Na condição, removemos a classe invisivel caso o elemento 
//já a tenha e a adicionamos caso ele não a tenha. 
//Todo esse processo é feito a cada clique do usuário.