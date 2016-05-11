var iniciaApp = function()
{
	var validarEntrada = function()
	{
		// Invalida los eventos que no corresponden a esta función
		event.preventDefault();
		var usuario = $("#txtUsuario").val();
		var clave = $("#txtClave").val();
		console.log("Se disparó el submit");
		// ************* Validaciones ************
		// 1.- Que no sean vacíos
		if(usuario == "")
		{
			alert("El usuario no debe ser vacío");
			$("#txtUsuario").focus();
		}
		if(clave == "")
		{
			alert("La clave no debe ser vacía");
			$("#txtClave").focus();
		}
		// 2.- Verificar usuario y contraseña
		if(usuario=="pw" && clave=="1234")
		{
			// alert("Bienvenido "+usuario);
			// Dar entrada al usuario
			$("#datosUsuario").hide();
			$("nav").show("slow");
		}
		else 
		{
			alert("Usuario y/o contraseña incorrectos");
			$("#txtUsuario").val("");
			$("#txtClave").val("");
			$("#txtUsuario").focus();
		}
		console.log("Se disparó el submit");
	}
	$("#frmValidaEntrada").on("submit",validarEntrada);
}
$(document).on("ready",iniciaApp);