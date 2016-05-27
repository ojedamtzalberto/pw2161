<?php 

function GetSQLValueString($theValue, $theType, $theDefinedValue = "", $theNotDefinedValue = "") 
{
  $theValue = get_magic_quotes_gpc() ? stripslashes($theValue) : $theValue;

  $theValue = function_exists("mysql_real_escape_string") ? mysql_real_escape_string($theValue) : mysql_escape_string($theValue);

  switch ($theType) {
    case "text":
      $theValue = ($theValue != "") ? "'" . $theValue . "'" : "NULL";
      break;    
    case "long":
    case "int":
      $theValue = ($theValue != "") ? intval($theValue) : "NULL";
      break;
    case "double":
      $theValue = ($theValue != "") ? "'" . doubleval($theValue) . "'" : "NULL";
      break;
    case "date":
      $theValue = ($theValue != "") ? "'" . $theValue . "'" : "NULL";
      break;
    case "defined":
      $theValue = ($theValue != "") ? $theDefinedValue : $theNotDefinedValue;
      break;
  }
  return $theValue;
}

function guardaEncuesta()
{
	$respuesta = false;
	// var d = new Date();
	// var fecha = d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear();	
	$txtNombre = GetSQLValueString($_POST["txtNombre"],"text");
	$txtPregunta1 = GetSQLValueString($_POST["txtPregunta1"],"text");
	$txtRespuesta1 = GetSQLValueString($_POST["txtRespuesta1"],"text");
	$txtPregunta2 = GetSQLValueString($_POST["txtPregunta2"],"text");
	$txtRespuesta2 = GetSQLValueString($_POST["txtRespuesta2"],"text");
	$txtPregunta3 = GetSQLValueString($_POST["txtPregunta3"],"text");
	$txtRespuesta3 = GetSQLValueString($_POST["txtRespuesta3"],"text");
	$txtSemestre = GetSQLValueString($_POST["txtSemestre"],"long");
	$fecha = GetSQLValueString(date("Y/m/d"),"text");

	$conexion = mysql_connect("localhost","root","");
	mysql_select_db("progweb");
	$guarda = sprintf ("insert into encuestas(nombreencuesta, pregunta1, respuesta1, pregunta2, respuesta2, pregunta3, respuesta3, fechaencuesta, semestre) values (%s,%s,%s,%s,%s,%s,%s,%s,%d)",$txtNombre,$txtPregunta1,$txtRespuesta1,$txtPregunta2,$txtRespuesta2,$txtPregunta3,$txtRespuesta3,$fecha,$txtSemestre);
	mysql_query($guarda);

	if(mysql_affected_rows() > 0) 
	{
		$respuesta = true;
	}
	$salidaJSON = array('respuesta' => $respuesta);
	print json_encode($salidaJSON);
}

function consulta()
{
	$respuesta = false;
	$conexion = mysql_connect("localhost","root","");
	mysql_select_db("progweb");
	$consulta = "select * from encuestas order by claveencuesta";
	$resultado = mysql_query($consulta);
	$tabla = "";
	if (mysql_num_rows($resultado) > 0)
	{
		$respuesta = true;
		$tabla.= "<tr>";
		$tabla.= "<th>Clave</th>";
		$tabla.= "<th>Nombre</th>";
		$tabla.= "<th>Pregunta 1</th>";
		$tabla.= "<th>Respuesta 1</th>";
		$tabla.= "<th>Pregunta 2</th>";
		$tabla.= "<th>Respuesta 2</th>";
		$tabla.= "<th>Pregunta 3</th>";
		$tabla.= "<th>Respuesta 3</th>";
		$tabla.= "</tr>";
		while ($registro = mysql_fetch_array($resultado))
		{
			$tabla.= "<tr>";
			$tabla.= "<td>".$registro["claveencuesta"]."</td>";
			$tabla.= "<td>".$registro["nombreencuesta"]."</td>";
			$tabla.= "<td>".$registro["pregunta1"]."</td>";
			$tabla.= "<td>".$registro["respuesta1"]."</td>";
			$tabla.= "<td>".$registro["pregunta2"]."</td>";
			$tabla.= "<td>".$registro["respuesta2"]."</td>";
			$tabla.= "<td>".$registro["pregunta3"]."</td>";
			$tabla.= "<td>".$registro["respuesta3"]."</td>";
			$tabla.= "</tr>";
		}
	}
	$salidaJSON = array('respuesta' => $respuesta, 'tabla' => $tabla);
	print json_encode($salidaJSON);
}

function consultaIndividual()
{
	$respuesta = false;
	$clave = GetSQLValueString($_POST["txtClave"],"text");
	$conexion = mysql_connect("localhost","root","");
	mysql_select_db("progweb");
	$consulta = sprintf("select * from encuestas where claveencuesta = %s limit 1",$clave);
	$resultado = mysql_query($consulta);

	$nombreencuesta = "";
	$pregunta1 = "";
	$respuesta1 = "";
	$pregunta2 = "";
	$respuesta2 = "";
	$pregunta3 = "";
	$respuesta3 = "";
	$semestre = "";

	if (mysql_num_rows($resultado) > 0)
	{
		$registro = mysql_fetch_array($resultado);
		$respuesta = true;
		$nombreencuesta = $registro["nombreencuesta"];
		$pregunta1 = $registro["pregunta1"];
		$respuesta1 = $registro["respuesta1"];
		$pregunta2 = $registro["pregunta2"];
		$respuesta2 = $registro["respuesta2"];
		$pregunta3 = $registro["pregunta3"];
		$respuesta3 = $registro["respuesta3"];
		$semestre = $registro["semestre"];
	}

	$salidaJSON = array('respuesta' => $respuesta, 'nombreencuesta' => $nombreencuesta, 'pregunta1' => $pregunta1, 'respuesta1' => $respuesta1, 'pregunta2' => $pregunta2, 'respuesta2' => $respuesta2, 'pregunta3' => $pregunta3, 'respuesta3' => $respuesta3, 'semestre' => $semestre);
	print json_encode($salidaJSON);
}

function bajaEncuesta()
{
	$respuesta = false;
	$clave = GetSQLValueString($_POST["txtClave"],"long");
	$conexion = mysql_connect("localhost","root","");
	mysql_select_db("progweb");
	$queryBaja = sprintf("delete from encuestas where claveencuesta = %d",$clave);
	mysql_query($queryBaja);

	if(mysql_affected_rows() > 0)
		$respuesta = true;

	$salidaJSON = array('respuesta' => $respuesta);
	print json_encode($salidaJSON);
}

$accion = $_POST["accion"];
switch ($accion) {
	case 'guardaEncuesta':
		guardaEncuesta();
		break;
	case 'consulta':
		consulta();
		break;
	case 'consultaIndividual':
		consultaIndividual();
		break;
	case 'bajaEncuesta':
		bajaEncuesta();
		break;
	default:
		# code...
		break;
}

?>