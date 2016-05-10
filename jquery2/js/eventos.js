var iniciaApp = function()
{
	var validarEntrada = function()
	{
		var usuario = $("#txtUsuario").val();
		var clave = $("txtClave").val();
		console.log("Se disparó el submit");
		if(usuario == "")
		{
			alert("El usuario no debe ser vacío");
			$("#txtUsuario").focus();
		}
		if(clave =="")
		{
			alert("La clave no debe ser vacía");
			$("#txtClave").focus();
		}
		if(usuario != "abc" && clave != "123")
		{
			alert("Usuario y/o contraseña invalidos");
		}
		else 
		{

		}
	}
	$("#frmValidaEntrada").on("submit",validarEntrada);
}
$(document).on("ready",iniciaApp);