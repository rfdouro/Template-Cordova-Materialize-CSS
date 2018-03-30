//leva em consideração que existe JQuery e Dialogs

function Util() {
 this.exibeAlerta = function (mess) {
  exibeToast("Mensagem", mess, 2);
 };

 /*this.executaAcao = function (pagina, dados, metodo, funcao) {
  if (metodo == "GET") {
  pagina = pagina + "?r=" + (Math.random());
  for (var x in dados) {
  pagina += "&" + x + "=" + dados[x];
  }
  $.get(pagina, function (data) {
  exibeGrowl('Mensagem', data);
  });
  } else {
  $.post(pagina, dados, function (data, status) {
  //alert("Data: " + data + "\nStatus: " + status);
  //$("#divhistpag").html(result);
  exibeGrowl('Mensagem', data);
  utilJS.fechaModal(null);
  if (funcao != null) {
  eval(funcao);
  }
  });
  }
  }*/

 this.executaAcaoSilencioso = function (pagina, dados, metodo, funcao, fecha_modal, toast) {
  if (metodo == "GET") {
   pagina = pagina + "?r=" + (Math.random());
   for (var x in dados) {
    pagina += "&" + x + "=" + dados[x];
   }
   $.get(pagina, function (data) {
    //exibeGrowl('Mensagem', data);
   });
  } else {
   $.post(pagina, dados, function (data, status) {
    //alert("Data: " + data + "\nStatus: " + status);
    //$("#divhistpag").html(result);

    try {
     if (typeof fecha_modal !== "undefined") {
      if (fecha_modal)
       try {
        utilJS.fechaModal(fecha_modal);
       } catch (e) {
        utilJS.fechaModal(null);
       }
     } else {
      utilJS.fechaModal(null);
     }

     if (toast) {
      //exibeToast('Mensagem', data, 3);
     } else {
      //exibeGrowl('Mensagem', data);
     }


     if (funcao != null) {
      eval(funcao);
     }
    } catch (e) {
     alert(e);
    }
   });
  }
 };

 this.executaAcao = function (pagina, dados, metodo, funcao, fecha_modal, toast) {
  if (metodo == "GET") {
   pagina = pagina + "?r=" + (Math.random());
   for (var x in dados) {
    pagina += "&" + x + "=" + dados[x];
   }
   $.get(pagina, function (data) {
    exibeGrowl('Mensagem', data);
   });
  } else {
   $.post(pagina, dados, function (data, status) {
    //alert("Data: " + data + "\nStatus: " + status);
    //$("#divhistpag").html(result);


    try {
     if (typeof fecha_modal !== "undefined") {
      if (fecha_modal) {
       try {
        utilJS.fechaModal(fecha_modal);
       } catch (e) {
        utilJS.fechaModal(null);
       }
      }
     } else {
      utilJS.fechaModal(null);
     }

     if (toast) {
      exibeToast('Mensagem', data, 3);
     } else {
      exibeGrowl('Mensagem', data, 'info');
     }


     if (funcao != null) {
      eval(funcao);
     }
    } catch (e) {
     alert(e);
    }
   });
  }
 };

 this.carregaDivPagina = function (div, pagina, dados) {
  $('#' + div).load(pagina + '?r=' + (Math.random()),
          dados,
          function (response, status, xhr) {
           if (status == "error") {
            var msg = "Aconteceu um erro\n\n";
            //alert(msg + xhr.status + " " + xhr.statusText)
            exibeToast("ERRO", msg + xhr.status + " " + xhr.statusText, 2);
           }
          }
  );
 };

 /*adicionado a opção de executar uma função após o carregamento da div*/
 this.carregaDivPagina = function (div, pagina, dados, funcao) {
  var r = (Math.random());
  $('#' + div).load(pagina + '?r=' + r,
          dados,
          function (response, status, xhr) {
           if (funcao != null) {
            eval(funcao);
           }
           if (status == "error") {
            var msg = "Aconteceu um erro\n\n";
            //alert(msg + xhr.status + " " + xhr.statusText)
            exibeToast("ERRO", msg + xhr.status + " " + xhr.statusText, 2);
           }
          }
  );
 };

 this.abreModalSimples = function (divDialogo) {
  $('#' + divDialogo).modal({backdrop: 'static', keyboard: false}).modal("show");
  return false;
 };

 this.abreModal = function (divDialogo, divConteudo, campoTitulo, titulo, pagina, dados, funcao) {
  $('#' + divConteudo).html('');
  $('#' + divConteudo).load(pagina,
          dados,
          function (response, status, xhr) {
           $('#' + campoTitulo).html(titulo);
           $('#' + divDialogo).modal({backdrop: 'static', keyboard: false}).modal("show");
           //$('#'+divDialogo).modal("show");
           if (funcao != null) {
            eval(funcao);
           }
          });
  return false;
 };

 this.fechaModal = function (divDialogo) {
  //alert($('.modal'));
  if (divDialogo != null)
   $('#' + divDialogo).modal("hide");
  else
   $('.modal').modal("hide");
 };

 this.replaceAll = function (str, sai, entra) {
  while (str.indexOf(sai) >= 0) {
   var res = str.replace(sai, entra);
   str = res;
  }
  return str;
 };

 /// http://jsfiddle.net/didierg/EU7Pc/
 /**
  * 
  * @param {type} obj é o objeto html que recebera os options
  * @param {type} vals é o array json que contem os objetos de valores
  * @param {type} propV é a propriedade dos objetos designada ao value 
  * @param {type} propL é a propriedade dos objetos designada ao label (text)
  * @param {type} selV o valor que deve estar selecionado
  * @returns {undefined}
  */
 this.populaSelect = function (obj, vals, propV, propL, selV) {
  try {
   var $select = $('#' + obj).empty();
   $.each(vals, function (i) {
    var v, l;
    $.each(vals[i], function (name, value) {
     if (propV == name)
      v = value;
     if (propL == name)
      l = value;
    });

    var o = $('<option/>', {value: v})
            .text(l);

    if (selV && selV == v)
     o.prop('selected', true);

    o.appendTo($select);
   });
  } catch (e) {
   alert(e);
  }
 };

 /**
  * 
  * @param {type} obj é o objeto html que recebera os options
  * @param {type} pagina é a página que renderiza o array json
  * @param {type} propV é a propriedade dos objetos designada ao value 
  * @param {type} propL é a propriedade dos objetos designada ao label (text)
  * @param {type} selV o valor que deve estar selecionado
  * @returns {undefined}
  */
 this.populaSelectGet = function (obj, pagina, propV, propL, selV) {
  var valores = "";
  $.get(pagina, function (data) {
   try {
    //json em texto
    valores = JSON.parse(data);
   } catch (e) {
    //json puro
    valores = data;
   }
   utilJS.populaSelect(obj, valores, propV, propL, selV);
  });
 };
}


var utilJS = new Util();

/*
 classe para filtro
 não é criado um objeto pois só se utiliza em determinadas páginas
 _form = form que contém dados do filtro
 ex: '#form1'
 _divResultado = div onde será apresentada a página com resultados após o load:
 ex: 'div1' 
 _controle = é o controller (ação) a ser executada pelo método de filtro
 ex: '/?controle=WebSISADIN.controle.controles.gerencial.ControleEmpresa'
 */
function Filtro(_form, _divResultado, _controle) {
 this.f = _form;
 this.dR = _divResultado;
 this.c = _controle;

 //método para executar um filtro
 this.filtrar = function () {
  try {
   var formData = $(this.f).serialize();
   utilJS.carregaDivPagina(this.dR, this.c, formData);
  } catch (e) {
   alert(e);
  }
 };

 //método para executar o filtro com um enter -- usado em input text
 this.enter = function (evt) {
  var keyCode = evt ? (evt.which ? evt.which : evt.keyCode) : event.keyCode;
  if (keyCode == 13) {
   this.filtrar();
   return false;
  }
 };

 //método para limpar os dados do filtro e retornar todos os dados possíveis
 this.todos = function () {
  $(this.f).each(function () {
   this.reset();
  });
  this.filtrar();
 };
}