var linha = "<tr>"+
                "<td>Guloseimas</td>"+
                "<td>R$50</td>"+
                "</tr>";

    $("#gastos").append(linha);

    $(".lista-compras").prepend("<li>Celular</li>");

    $("strong").click(function(){
        $(this).parent().parent().parent().css("background-color","red");
    });

    $("h1").parent(".vermelha").remove();

    var itemDaLista = $("<li>");
    $("ul").append(itemDaLista);

    console.log(itemDaLista);