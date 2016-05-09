var indice = 0;
var texto = "";

var buscaComics = function(comics) 
{
	$("#comics").html("");
	for(i = 0; i < comics.length; i++) 
	{
		$("#comics").append(comics[i].name + "<br>");
	}
}

var inicio = function() 
{
	var consulta = function(nombre) 
	{						
		$("#tnombre").html("Nombre");
		$("#tdescripcion").html("Descripcion");
		$("#tcomics").html("Comics");
		$("span").html("Nueva Búsqueda");

		$.ajax({
		  beforeSend:function(){
		  	console.log("Espere...");
		  },
		  url: 'http://gateway.marvel.com/v1/public/characters?ts=1&apikey=bea995e868107cd12460cb451c07672f&hash=bda0fe37ac3585131a4397887dc98b08&nameStartsWith='+nombre,
		  dataType: 'json',
		  success: function(data){
		  console.log(data);		  		 
		  // Mostramos la información en el HTML	
		  if(data.data.results.length == 0) 
		  {
		  	alert("No existe un superhéroe con ese nombre");		  	
		  	return;
		  }	  
		  $("#nombre").html(data.data.results[indice].name);
		  $("#imagen").html('<img src="' + data.data.results[indice].thumbnail.path + '.' + data.data.results[indice].thumbnail.extension + '" />');
		  $("#descripcion").html(data.data.results[indice].description);
		  buscaComics(data.data.results[indice].comics.items);
		  document.getElementById("inputBusqueda").value = "";
		  //Siguiente superhéroe
		  if(data.data.results[indice + 1] != null) 
		  {		  	
		  	$("#siguiente").html("Siguiente: (" + data.data.results[indice+1].name + ")");		  	
		  }
		  else
		  {
		  	$("#siguiente").html("");
		  }
		  //Anterior
		  if(indice-1 >= 0)
		  {
		  	$("#anterior").html("Anterior: (" + data.data.results[indice-1].name + ")");		  	
		  }
		  else
		  {
		  	$("#anterior").html("");		  	
		  }

		  },
		  error:function(xhr,error,throws){
		  	console.log("Ocurrio un error");
		  }		  
		});
		
	}

	var buscarClic = function()
	{
		indice = 0;
		texto = $("#inputBusqueda").val();
		consulta(texto);
	}

	var buscarEnter = function(tecla) 
	{
		if(tecla.which == 13) //Si la tecla presionada es enter
		{
			indice = 0;
			texto = $("#inputBusqueda").val();
			consulta(texto);
		}
	}

	var siguiente = function()
	{		
		indice++;
		consulta(texto);		
	}

	var anterior = function()
	{
		indice--;
		consulta(texto);
	}

	$("#boton").on("click",buscarClic);
	$("#siguiente").on("click",siguiente);
	$("#anterior").on("click",anterior);
	$("#inputBusqueda").on("keypress",buscarEnter);	
	$("#inputBusqueda").focus();	
}

$(document).on("ready",inicio);