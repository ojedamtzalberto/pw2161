var turno = true;

function accion(element){	
	var obj = document.getElementsByName(element);
		
	if(turno && obj[0].innerHTML == "") {
		obj[0].innerHTML = "O";
		turno = false;
	}	
	else if(obj[0].innerHTML == ""){
		obj[0].innerHTML = "X";
		turno = true;
	}
}