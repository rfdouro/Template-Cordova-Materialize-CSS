(function ($) {
 $(function () {
  var elem = document.querySelector('.sidenav');
  var sideBar = M.Sidenav.init(elem);
  //$('.sidenav').sidenav();
  $("#abreSideNav").on('click', function () {
   if (sideBar.isOpen)
    sideBar.close();
   else
    sideBar.open();
  });

  $("#btnTeste").on('click', function () {
   alert(sideBar.isFixed);
  });

  $("#btnToast").on('click', function () {
   M.toast({html: 'I am a toast'})
   //alert('12');
  });

  $('.collapsible').collapsible();

  $(".dropdown-trigger").dropdown();


  $('.datepicker').datepicker({
   //format: 'dd/mm/yyyy',
   format: "dd mmmm yyyy",
   i18n: {
    cancel: 'Cancelar',
    months:
            [
             'Janeiro',
             'Fevereiro',
             'Março',
             'Abril',
             'Maio',
             'Junho',
             'Julho',
             'Agosto',
             'Setembro',
             'Outubro',
             'Novembro',
             'Dezembro'
            ],
    monthsShort:
            [
             'Jan',
             'Fev',
             'Mar',
             'Abr',
             'Mai',
             'Jun',
             'Jul',
             'Ago',
             'Set',
             'Out',
             'Nov',
             'Dez'
            ],
    weekdays:
            [
             'Domingo',
             'Segunda',
             'Terça',
             'Quarta',
             'Quinta',
             'Sexta',
             'Sábado'
            ],
    weekdaysShort:
            [
             'Dom',
             'Seg',
             'Ter',
             'Qua',
             'Qui',
             'Sex',
             'Sáb'
            ],
    weekdaysAbbrev: ['Do', 'Se', 'Te', 'Qa', 'Qi', 'Sx', 'Sa']
   }
  });
 }
 ); // end of document ready
})(jQuery); // end of jQuery name space

$(document).ready(function () {
 $.ajaxSetup({cache: false});
 $(document).ajaxStart(function () {
  $('.preloader-background').fadeIn('fast');
  $('.preloader-wrapper')
          .fadeIn();
 });
 $(document).ajaxComplete(function () {
  $('.preloader-background').delay(500).fadeOut('slow');
  $('.preloader-wrapper')
          .delay(500)
          .fadeOut();
 });
});

$(window).on('load', function () {
 $('.preloader-background').delay(500).fadeOut('slow');
 $('.preloader-wrapper')
         .delay(500)
         .fadeOut();
});