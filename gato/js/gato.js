var turno = true;
var c11="11", c12="12", c13="13", c21="21", c22="22", c23="23", c31="31", c32="32", c33="33";

function accion(td) {		
	if(turno && td.innerText == "") 
		td.innerText = "O";			
	else if(td.innerText == "")
		td.innerText = "X";		
	
	turno = !turno;	
	asigna(td);
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

	revisa();
}

function revisa() {
	if((c11==c12 & c12==c13) || (c11==c21 && c21==c31) || (c11==c22 && c22==c33) || (c12==c22 && c22==c32) || (c13==c23 && c23==c33) 
		||(c21==c22 && c22==c23) || (c31==c32 && c32==c33) || (c13==c22 && c22==c31))
		ganaste();
}

function ganaste() {
	alert("GANASTE!");
}