var data = 1;
var offsetNav;
var finPubli;
var auto=false;
var posScroll;
var x;
var margin;

/* $(function(){...}); --> window.onload = function() {...};*/
$(document).ready(function() {	
		$('[data-toggle="tooltip"]').tooltip();
		$('form').submit(function() {
		return false;
		});
	
	
	
	/*VOLVER*/
	$('#botonVolver').click(function(){	
		if ((window.matchMedia('(min-width: 768px)').matches)) {
			$('#news1').focus();
		} else {			
			$('#botonVolver').hide();
		}		
	});
	
	/*Cargar noticias al pulsar boton */
	$('#boton1').click(function() {
		if (data < 6) {
			$.getJSON( 'https://rawgit.com/billy1816/noticies/billy1816-patch-1/data/data' + data + '.json', function(jsonObject) {
				afegirBloc(jsonObject);
			});
			data++;
		} else {
			$('#boton1').text('NO HAY MÁS NOTICIAS');
		}
	});
	$(window).scroll(function() {		
		if (location.href=='https://rawgit.com/billy1816/noticies/billy1816-patch-1/news.html' && auto) {
			if ($(window).scrollTop() + $(window).height() >= $(document).height() - offset) { /*-------REVISAR offset*/
				if (data < 3) {
					/*Mostrar ventana de carga*/
					$('#loading').show();
					/*Cargar noticias*/
					$.getJSON( 'https://rawgit.com/billy1816/noticies/billy1816-patch-1/data/data' + data + '.json', function(jsonObject) {
					afegirBloc(jsonObject);
					/*Ocultar ventana de carga*/
					$('#loading').hide();
					});
					data++;
				} else {
					$('#boton1').text('NO HAY MÁS NOTICIAS');
				}			
			}
		}
		
		
		finPubli=200+offsetNav.top;
			if ($(window).scrollTop()>finPubli) {
			$('#botonVolver').show();
		}
		if ($(window).scrollTop()<finPubli) {			
			$('#botonVolver').hide();	
		}
	});	
	
});

/* --------------------------------- Funciones ---------------------------------- */

function afegirBloc(jsonObject) {
	$('#noticias').append('<div class="row">'); 
	$.each(jsonObject, function(i, item) {
		$('.row:last').append(
			'<div class="col-sm-12 col-md-6">'
				+ '<div class="thumbnail shortNew">'
					+ '<a href="#">'
						+ '<h2 class="text-center">' + item.titulo + '</h2>'
						+ '<p id="fecha" class="text-right">' + item.fecha + '</p>'
						+ '<p class="text-justify">' + item.texto + '</p>'
						+ '<img src="' + item.imagen + '" class="img-responsive" alt="' + item.alt + '">'					
					+ '</a>'
				+ '</div>'
			+ '</div>'
		);
	});
	$('#noticias').append('</div>');
}


	
