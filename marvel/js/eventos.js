var indice = 0;
var texto = "";

var inicio = function() {

	var clicBoton = function() 
	{		
		indice = 0;
		texto = $("#txtBusqueda").val();
		
		$.ajax({
		  beforeSend:function(){
		  	console.log("Espere...");
		  },
		  url: 'http://gateway.marvel.com/v1/public/characters?ts=1&apikey=bea995e868107cd12460cb451c07672f&hash=bda0fe37ac3585131a4397887dc98b08&nameStartsWith='+texto,
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
		  document.getElementById("txtBusqueda").value = "";

		  },
		  error:function(xhr,error,throws){
		  	console.log("Ocurrio un error");
		  }		  
		});
		
	}

	$("#boton").on("click",clicBoton);
}

$(document).on("ready",inicio);