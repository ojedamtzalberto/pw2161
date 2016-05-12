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
		var parametros = "accion=validaEntrada"+
						 "&usuario="+usuario+
						 "&clave="+clave+
						 "&id="+Math.random();
		$.ajax({
			beforeSend:function(){
				console.log("Validar al usuario");
			},
			cache: false,
			type: "POST",
			dataTye: "json",
			url: "php/funciones.php",
			data: parametros,
			success: function(response){

			},
			error: function(xhr,ajaxOptionX,thrownError){
				console.log("Algo saió mal");
			}
		});
		console.log("Se disparó el submit");
	}
	$("#frmValidaEntrada").on("submit",validarEntrada);
}
$(document).on("ready",iniciaApp);