var contador = 0;
var c11="1", c12="2", c13="3", c21="4", c22="5", c23="6", c31="7", c32="8", c33="9";

function accion(id) {	
	var td = document.getElementById(id);
	console.log(td);

	if(contador%2==0 && td.innerText == "") {
		td.innerText = "O";		
		contador++;
		asigna(td);
	}		
	else if(td.innerText == "") {
		td.innerText = "X";
		contador++;
		asigna(td);
	}
	console.log(contador);
}

function asigna(elemento) {
	if(elemento.id == c11)
		c11 = elemento.innerText;
	else if(elemento.id == c12)
		c12 = elemento.innerText;
	else if(elemento.id == c13)
		c13 = elemento.innerText;
	else if(elemento.id == c21)
		c21 = elemento.innerText;
	else if(elemento.id == c22)
		c22 = elemento.innerText;
	else if(elemento.id == c23)
		c23 = elemento.innerText;
	else if(elemento.id == c31)
		c31 = elemento.innerText;
	else if(elemento.id == c32)
		c32 = elemento.innerText;
	else if(elemento.id == c33)
		c33 = elemento.innerText;

	revisa(elemento);
}

function revisa(elemento) {
	if((c11==c12 & c12==c13) || (c11==c21 && c21==c31) || (c11==c22 && c22==c33) || (c12==c22 && c22==c32) || (c13==c23 && c23==c33) 
		||(c21==c22 && c22==c23) || (c31==c32 && c32==c33) || (c13==c22 && c22==c31)) {
		alert("GANA " + elemento.innerText + "!");
		limpiar();
	}
	else if(contador == 9) {
		alert("EMPATE");
		limpiar();
	}
		
}

function limpiar() {
	var cuadros = document.getElementsByTagName("td");
	for(i=0; i<cuadros.length; i++) {
		cuadros[i].innerText = "";
	}
	c11="1"; c12="2"; c13="3"; c21="4"; c22="5"; c23="6"; c31="7"; c32="8"; c33="9";
	contador = 0;
	console.log(contador);
}

document.onkeypress = function(evt) {
	evt = evt || window.event;
	var charCode = evt.keyCode || evt.which;
	var charStr = String.fromCharCode(charCode);
	accion(charStr);
}
