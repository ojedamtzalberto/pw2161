// Variables Globales
// PLDC = Se usan en todo el código.
var letraCasilla 	= "";
var cuentaJuego		= 0;
var turno 			= '';

function iniciaGato() {
	// Eliminar la variable de localStorage
	// localStorage.removeItem("webCuentaJuego");
	// Preguntar si el navegador es compatible con localStorage.
	if(typeof(Storage) != "undefined") 
	{
		if(localStorage.webCuentaJuego) 
		{
			cuentaJuego = localStorage.webCuentaJuego;
			cuentaJuego++;
		}
		else 
		{
			cuentaJuego = 1;
		}
		document.getElementById("tituloJuego").innerHTML = "Juego del Gato (#" +cuentaJuego+")";
	}
	else
		alert("¡Utiliza un navegador actualizado!");

	var escribe = function(idCasilla) 
	{
		letraCasilla = $("#"+idCasilla).html();
		// if(letraCasilla == "&nbsp;")
		console.log(letraCasilla);

		$("#"+idCasilla).html(turno);
		//Para saber quien ganó, validamos la jugada
		validaJugada(turno);
	}

	var reiniciarConteo = function() 
	{
		localStorage.removeItem("webCuentaJuego");
	}

	var validaJugada = function(letra) 
	{
		cuentaJugadas(function(jugadas){
			console.log("JUGADAS JUGADAS " + jugadas);
			var ganador = false;
			var b11 = document.getElementById("unouno").innerHTML;
			var b12 = document.getElementById("unodos").innerHTML;
			var b13 = document.getElementById("unotres").innerHTML;
			var b21 = document.getElementById("dosuno").innerHTML;
			var b22 = document.getElementById("dosdos").innerHTML;
			var b23 = document.getElementById("dostres").innerHTML;
			var b31 = document.getElementById("tresuno").innerHTML;
			var b32 = document.getElementById("tresdos").innerHTML;
			var b33 = document.getElementById("trestres").innerHTML;
			// Jugadas
			// Renglones
			if(b11==b12 && b12==b13 && b11!="&nbsp;")
				ganador = true;
			else if(b21==b22 && b22==b23 && b21!="&nbsp;")
				ganador = true;
			else if(b31==b32 && b32==b33 && b31!="&nbsp;")
				ganador = true;
			// Columnas
			else if(b11==b21 && b21==b31 && b11!="&nbsp;")
				ganador = true;
			else if(b12==b22 && b22==b32 && b12!="&nbsp;")
				ganador = true;
			else if(b13==b23 && b23==b33 && b13!="&nbsp;")
				ganador = true;
			// Diagonales
			else if(b11==b22 && b22==b33 && b11!="&nbsp;")
				ganador = true;
			else if(b13==b22 && b22==b31 && b13!="&nbsp;")
				ganador = true;
			// ¿Alguien ganó?
			if(ganador) 
			{
				alert("GANADOR! " + letra);
				cuentaJuego++;
				localStorage.webCuentaJuego = cuentaJuego;
				reiniciar();
			}
			else if(ganador == false && jugadas == 10)
			{
				alert("¡Empate!");
				cuentaJuego++;
				localStorage.webCuentaJuego = cuentaJuego;
				reiniciar();
			}
		});
	}

	// Se llama al dar clic en el botón empezar, va y busca el turno en la tabla turnos y se lo asigna
	var asignaTurno = function()
	{
		event.preventDefault();

		if(turno != '')
		{
			alert("Ya tienes un turno asignado");
			return;
		}

		var parametros = "accion=pideTurno"+
						 "&id="+Math.random();
		$.ajax({
			beforeSend: function(){
				console.log("Pide turno");
			},
			cache: false,
			type: "POST",
			dataType: "json",
			url: "php/funciones.php",
			data: parametros,
			success: function(response){
				if(response.respuesta)
				{
					alert("Tu turno es " + response.turno + "!");
					turno = response.turno;					
				}
				else
				{
					alert("No se pudo asignar un turno");
				}
			},
			error: function(xhr,ajaxOptions,thrownError){
				console.log(thrownError);
			}
		});
	}

	// Se verifica que sea el turno del jugador
	var validaTurno = function()
	{
		idCasilla = this.id;
		var datos = "turno="+turno;
		var parametros = "accion=validaTurno&"+datos+
						 "&id="+Math.random();
		$.ajax({
			beforeSend: function(){
				console.log("Valida Turno");
			},
			cache: false,
			type: "POST",
			dataType: "json",
			url: "php/funciones.php",
			data: parametros,
			success: function(response){
				if(response.respuesta)
				{
					validaCasilla(idCasilla);
				}
				else
				{
					alert("No es tu turno");
				}
			},
			error: function(xhr,ajaxOptions,thrownError){
				console.log(thrownError);
			}
		});
	}

	// Se verifica que la casilla no esté ocupada
	// Si no está ocupada realiza la jugada
	var validaCasilla = function(idCasilla)
	{
		var renglon = $("#"+idCasilla).attr("value").toString().charAt(0);
		var columna = $("#"+idCasilla).attr("value").toString().charAt(1);

		var datos = "renglon=" + renglon + "&columna=" + columna + "&turno=" + turno;
		var parametros = "accion=validaCasilla&"+datos+
						 "&id="+Math.random();
		$.ajax({
			beforeSend: function(){
				console.log("Valida Casilla");
			},
			cache: false,
			type: "POST",
			dataType: "json",
			url: "php/funciones.php",
			data: parametros,
			success: function(response){
				if(response.respuesta)
				{
					escribe(idCasilla);
				}
				else
				{
					alert("Casilla ocupada");
				}
			},
			error: function(xhr,ajaxOptions,thrownError){
				console.log(thrownError);
			}
		});
	}

	var refrescar = function()
	{
		// Primero se valida jugada para ver si el otro jugador gana al momento de refrescar
		validaJugada();
		var parametros = "accion=refrescar&"+
						 "&id="+Math.random();
		$.ajax({
			beforeSend: function(){
				console.log("Refrescar jugadas");
			},
			cache: false,
			type: "POST",
			dataType: "json",
			url: "php/funciones.php",
			data: parametros,
			success: function(response){				
				console.log(response);
				$("table td").html("&nbsp");

				for(i = 0; i < response.jugadas.length; i++)
				{
					var columna = response.jugadas[i].columna;
					var renglon = response.jugadas[i].renglon;
					var valor   = response.jugadas[i].turno;
					var value = renglon + "" + columna;

					$("td[value=\'"+value+"\']").html(valor);
				}
				// var value = columna + "" + renglon;
				// $("td[value=\'"+value+"\']").html("X");
			},
			error: function(xhr,ajaxOptions,thrownError){
				console.log(thrownError);
			}
		});
	}

	// Borra los registros de la tabla jugadas y limpia el tablero
	var reiniciar = function()
	{
		var parametros = "accion=reiniciar&"+
						 "&id="+Math.random();
		$.ajax({
			beforeSend: function(){
				console.log("Reiniciar jugadas");
			},
			cache: false,
			type: "POST",
			dataType: "json",
			url: "php/funciones.php",
			data: parametros,
			success: function(response){						
				$("table td").html("&nbsp");
			},
			error: function(xhr,ajaxOptions,thrownError){
				console.log(thrownError);
			}
		});
	}

	// Si el usuario cierra la pestaña o el navegador, su turno se agrega a la base de datos
	// para que esté disponible
	var quitaTurno = function()
	{		
		if(turno == '')
			return;

		var datos = "turno=" + turno;
		var parametros = "accion=insertaTurno&"+datos+
						 "&id="+Math.random();
						 console.log(turno);
		$.ajax({
			beforeSend: function(){
				console.log("Quita Turno");
			},
			cache: false,
			type: "POST",
			dataType: "json",
			url: "php/funciones.php",
			data: parametros,
                        async: false,
			success: function(response){						
				console.log("Se ha quitado el turno");
			},
			error: function(xhr,ajaxOptions,thrownError){
				console.log(thrownError);
			}
		});
	}

	// Regresa la cantidad de jugadas que hay registradas en la tabla jugadas
	function cuentaJugadas(jugadas)
	{
		var parametros = "accion=cuentaJugadas"+
						 "&id="+Math.random();
		$.ajax({
			beforeSend: function(){
				console.log("Cuenta Jugadas");
			},
			cache: false,
			type: "POST",
			dataType: "json",
			url: "php/funciones.php",
			data: parametros,
			success: function(response){			
				jugadas(response.jugadas);
			},
			error: function(xhr,ajaxOptions,thrownError){
				console.log(thrownError);
			}
		});
	}

	$("td").on("click",validaTurno);
	$("#btn-reiniciar").on("click",reiniciarConteo);
	$("#btn-empezar").on("click",asignaTurno);
	$("#btn-refrescar").on("click",refrescar);
	$(window).on("beforeunload",quitaTurno);
}

$(document).on("ready",iniciaGato);	