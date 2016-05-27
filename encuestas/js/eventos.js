var inicia = function() 
{

	var alta = function()
	{
		ocultar();
		$("#frmAltaEncuesta").on("submit",altaEncuesta);
		$("#frmAltaEncuesta").off("submit",consultaIndividual);

		$("#frmAltaEncuesta *").removeAttr("readonly");
		$("#boton-form").attr("value","Dar de alta");
		$("#txtNombre").attr("autofocus");
		$("#txtClave").css("display","none");
		$("#frmAltaEncuesta").show("slow");
	}

	var altaEncuesta = function()
	{
		event.preventDefault();
		var datos = $("#frmAltaEncuesta").serialize();
		var parametros = "accion=guardaEncuesta&"+datos+
		                 "&id="+Math.random();
		console.log(datos);
		                 
		$.ajax({
			beforeSend:function(){
				console.log("Validar alta de encuesta");
			},
			cache:false,
			type:"POST",
			dataType:"json",
			url:"php/funciones.php",
			data:parametros,
			success:function(response) {
				if(response.respuesta) {
					alert("Encuesta dada de alta");
					$("#frmAltaEncuesta")[0].reset();
					document.getElementById("txtNombre").focus();
				}
				else {
					alert("Hubo un problema");
				}
			},
			error:function(xhr,ajaxOptions,thrownError){
				console.log(thrownError);
			}
		});
		
	}

	var consulta = function()
	{
		event.preventDefault();
		ocultar();
		$("#tablaConsulta").show("slow");
		var parametros = "accion=consulta&id="+Math.random();

		$.ajax({
			beforeSend:function(){
				console.log("Validar consulta");
			},
			cache:false,
			type:"POST",
			dataType:"json",
			url:"php/funciones.php",
			data:parametros,
			success:function(response) {
				if(response.respuesta) {
					$("#tablaConsulta").html(response.tabla);
				}
				else {
					alert("Hubo un problema");
				}
			},
			error:function(xhr,ajaxOptions,thrownError){
				console.log(thrownError);
			}
		});
	}

	var baja = function()
	{
		event.preventDefault();
		ocultar();
		$("#frmAltaEncuesta").off("submit",altaEncuesta);
		$("#frmAltaEncuesta").on("submit",consultaIndividual);

		$("#frmAltaEncuesta *").attr("readonly","true");
		$("#boton-form").attr("value","Buscar");
		$("#txtNombre").removeAttr("autofocus");
		$("#txtClave").removeAttr("readonly");
		$("#txtClave").css("display","block");

		$("#frmAltaEncuesta").show("slow");
		document.getElementById("txtClave").focus();
	}

	var consultaIndividual = function()
	{
		event.preventDefault();
		var datos = $("#txtClave").val();
		var parametros = "accion=consultaIndividual&txtClave="+datos+"&id="+Math.random();
		$.ajax({
			beforeSend:function(){
				console.log("Validar consulta individual");
			},
			cache:false,
			type:"POST",
			dataType:"json",
			url:"php/funciones.php",
			data:parametros,
			success:function(response) {
				if(response.respuesta) {
					console.log(response);
					$("#txtNombre").val(response.nombreencuesta);
					$("#txtSemestre").val(response.semestre);
					$("#txtPregunta1").val(response.pregunta1);
					$("#txtRespuesta1").val(response.respuesta1);
					$("#txtPregunta2").val(response.pregunta2);
					$("#txtRespuesta2").val(response.respuesta2);
					$("#txtPregunta3").val(response.pregunta3);
					$("#txtRespuesta3").val(response.respuesta3);

					var r = confirm("Desea dar de baja la encuesta?");
					if (r)
						bajaEncuesta();
				}
				else {
					alert("No se encontró una encuesta con ese código");
				}
			},
			error:function(xhr,ajaxOptions,thrownError){
				console.log(thrownError);
			}
		});

	}

	var bajaEncuesta = function()
	{
		event.preventDefault();
		var datos = $("#txtClave").val();
		var parametros = "accion=bajaEncuesta&txtClave="+datos+"&id="+Math.random();
		$.ajax({
			beforeSend:function(){
				console.log("Validar baja");
			},
			cache:false,
			type:"POST",
			dataType:"json",
			url:"php/funciones.php",
			data:parametros,
			success:function(response) {
				if(response.respuesta) {
					alert("La encuesta fue dada de baja correctamente");
					$("#frmAltaEncuesta")[0].reset();
				}
				else {
					alert("No se encontró una encuesta con ese código");
				}
			},
			error:function(xhr,ajaxOptions,thrownError){
				console.log(thrownError);
			}
		});
	}

	var ocultar = function()
	{
		$("#frmAltaEncuesta").css("display","none");
		$("#frmAltaEncuesta *").val("");
		$("#frmAltaEncuesta").off("submit",altaEncuesta);
		$("#frmAltaEncuesta").off("submit",consultaIndividual);
		$("#tablaConsulta").css("display","none");
	}

	$("#btnAlta").on("click",alta);
	$("#btnConsulta").on("click",consulta);
	$("#btnBaja").on("click",baja);
	// $("#frmAltaEncuesta").on("submit",altaEncuesta);
}

$(document).on("ready",inicia);