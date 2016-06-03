// Variables Globales
// PLDC = Se usan en todo el código.
var turno 			= false;
var letraCasilla 	= "";
var cuentaJuego		= 0;
var cuentaJugadas 	= 0;

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

	var escribe = function() 
	{
		var letra = "";
		letraCasilla = this.id;
		// if(letraCasilla == "&nbsp;")
		console.log(letraCasilla);
		if(letraCasilla !="X" && letraCasilla!="O") 
		{
			if(!turno) 
				letra = "X";
			else
				letra = "O";
			$("#"+letraCasilla).html(letra);

			turno = !turno;
			cuentaJugadas++;
		}
		//Para saber quien ganó, validamos la jugada
		validaJugada(letra);
	}

	var reiniciarConteo = function() 
	{
		localStorage.removeItem("webCuentaJuego");
	}

	var validaJugada = function(letra) 
	{
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
			localStorage.webCuentaJuego = cuentaJuego;
		}
		else if(ganador == false && cuentaJugadas == 9)
		{
			alert("¡Empate!");
			localStorage.webCuentaJuego = cuentaJuego;
		}
	}

	$("td").on("click",escribe);
	$("#btn-reiniciar").on("click",reiniciarConteo);
}

$(document).on("ready",iniciaGato);