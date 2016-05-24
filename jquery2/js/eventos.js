var iniciaApp = function()
{
	var validarEntrada = function(){
		//Invalida los eventos que no corresponden a esta función.
		event.preventDefault();
		var usuario = $("#txtUsuario").val();
		var clave = $("#txtClave").val();
		//Validaciones
		//1.- Que no sean vacíos:
		if(usuario == ""){
			alert("El usuario no debe ser vacío");
			$("#txtUsuario").focus();
		}
		if(clave == ""){
			alert("La contraseña no debe ser vacío");
			$("#txtClave").focus();
		}
		//2.- Verificar usuario y contraseña:
		var parametros = "accion=validaEntrada"+
						 "&usuario="+usuario+
						 "&clave="+clave+
						 "&id="+Math.random();
		$.ajax({
			beforeSend: function(){
				console.log("Validar al usuario");
			},
			cache: false,
			type: "POST",
			dataType: "json",
			url: "php/funciones.php",
			data: parametros,
			success: function(response){
				if (response.respuesta){
					$("#datosUsuario").hide();
					$("nav").show("slow");
				} else{
					alert("Usuario/contraseña incorrecto(s)");
				}
			},
			error: function(xhr,ajaxOptions,thrownError){
				console.log("Algo salió mal");
			}
		});
		
		console.log("Se disparó el Submit");
	}

	var Altas = function()
	{
		//Mostramos el formulario
		$("#altaUsuarios").show("slow");
		$("#altaUsuarios h2").html("Alta Usuarios");
		//Enciendo la función de AltaUsuario
		$("#frmAltaUsuarios").on("submit",AltaUsuario);
		//Apago la función de BajaUsuario para el mismo botón
		$("#frmAltaUsuarios").off("submit",BajaUsuario);
	}

	var AltaUsuario = function()
	{
		event.preventDefault();
		// alert($("#frmAltaUsuarios").serialize());
		var datos = $("#frmAltaUsuarios").serialize();
		var parametros = "accion=guardaUsuario&"+datos+
						 "&id="+Math.random();
		$.ajax({
			beforeSend: function(){
				console.log("Validar al usuario");
			},
			cache: false,
			type: "POST",
			dataType: "json",
			url: "php/funciones.php",
			data: parametros,
			success: function(response){
				if(response.respuesta)
				{
					alert("Usuario registrado correctamente");
				}
				else
				{
					("No se pudo guardar la información");
				}
			},
			error: function(xhr,ajaxOptions,thrownError){
				console.log("Algo salió mal");
			}
		})
	}

	var Bajas = function()
	{
		$("#altaUsuarios").show("slow");
		$("#altaUsuarios h2").html("Baja de Usuarios");
		//Apago la función de AltaUsuario
		$("#frmAltaUsuarios").off("submit",AltaUsuario);
		//Enciendo la función de BajaUsuario para el mismo botón
		$("#frmAltaUsuarios").on("submit",BajaUsuario);
	}

	var BajaUsuario = function()
	{
		event.preventDefault();
		//var datos = $("frmAltaUsuarios").serialize();
		var datos = "txtNombreUsuario="+$("#txtNombreUsuario").val();
		var parametros = "accion=bajaUsuario&"+datos+
						 "&id="+Math.random();
		$.ajax({
			beforeSend:function(){
				console.log("Baja al usuario");
			},
			cache: false,
			type: "POST",
			dataType: "json",
			url: "php/funciones.php",
			data:parametros,
			success: function(response){				
				if(response.respuesta)
				{
					alert("Usuario dado de baja correctamente");
				}
				else
				{
					alert("No se pudo dar de baja la información");
				}
			},
			error:function(xhr,ajax,thrownError){

			}
		});
	}

	var Consultas = function()
	{
		$("#consultasUsuarios").show("slow");
		var parametros = "accion=consultas"+
						 "&id="+Math.random();
		$.ajax({
			beforeSend:function(){
				console.log("Consulta de usuarios");
			},
			cache: false,
			type: "POST",
			dataType: "json",
			url: "php/funciones.php",
			data:parametros,
			success: function(response){
				if(response.respuesta)
				{
					$("#tablaConsultas").html("");
					$("#tablaConsultas").append(response.tabla);
				}
			},
			error:function(xhr,ajax,thrownError){
				console.log("Ha ocurrido un error: "+thrownError);
			}
		});
	}

	var BajaDinamica = function()
	{
		var usuario = $(this).attr("id");
		var datos = "txtNombreUsuario="+usuario;
		var parametros = "accion=bajaUsuario&"+datos+
						 "&id="+Math.random();
		$.ajax({
			beforeSend:function(){
				console.log("Baja al usuario");
			},
			cache: false,
			type: "POST",
			dataType: "json",
			url: "php/funciones.php",
			data:parametros,
			success: function(response){				
				if(response.respuesta)
				{
					alert("Usuario dado de baja correctamente");
				}
				else
				{
					alert("No se pudo dar de baja la información");
				}
			},
			error:function(xhr,ajax,thrownError){

			}
		});
	}

	$("#frmValidaEntrada").on("submit",validarEntrada);
	$("#btnAltas").on("click",Altas);
	$("#frmAltaUsuarios").on("submit",AltaUsuario);
	$("#btnBajas").on("click",Bajas);	
	$("#btnConsultas").on("click",Consultas);
	// Eventos dinámicos
	$("#tablaConsultas").on("click","button",BajaDinamica);
	// Otra forma
	// $("#tablaConsultas > button").on("click",BajaDinamica);
}
$(document).on("ready",iniciaApp);