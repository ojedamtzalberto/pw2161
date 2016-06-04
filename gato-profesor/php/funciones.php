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

function pideTurno()	
{
	$respuesta = false;
	conexion();
	$consulta = "select turno from turnos";
	$resultado = mysql_query($consulta);
	$turno = "";

	if(mysql_num_rows($resultado) > 0)
	{
		$respuesta = true;
		$registro = mysql_fetch_array($resultado);
		$turno = $registro["turno"];

		if($turno == 'X')
			$nuevoTurno = 'O';
		else
			$nuevoTurno = 'X';

		$consulta = sprintf("update turnos set turno = '%s'",$nuevoTurno);
		mysql_query($consulta);
	}

	$salidaJSON = array('respuesta' => $respuesta, 'turno' => $turno);
	print json_encode($salidaJSON);
}

function validaTurno()
{
	$respuesta = false;
	$turno = GetSQLValueString($_POST["turno"],"text");
	conexion();
	$consulta = sprintf("select * from jugadas where renglon = 0 and turno = %s limit 1",$turno);
	$resultado = mysql_query($consulta);

	if(mysql_num_rows($resultado) > 0)	
	{
		// Valida que sea su turno
		$respuesta = true;
	}

	$salidaJSON = array('respuesta' => $respuesta);
	print json_encode($salidaJSON);
}

function validaCasilla()
{
	$respuesta = true;
	$renglon = GetSQLValueString($_POST["renglon"],"long");
	$columna = GetSQLValueString($_POST["columna"],"long");
	$turno = GetSQLValueString($_POST["turno"],"text");
	conexion();
	$consulta = sprintf("select * from jugadas where renglon=%d and columna=%d",$renglon,$columna);
	$resultado = mysql_query($consulta);

	if(mysql_num_rows($resultado) > 0)
	{
		// Ya hay una jugada en esta casilla
		$respuesta = false;
	}
	else
	{
		// Agrega el registro de la nueva jugada
		$consulta = sprintf("update jugadas set renglon=%d, columna=%d where renglon=0",$renglon,$columna);
		mysql_query($consulta);
		// Agrega un registro para el siguiente turno
		if($turno == "'X'")
		{			
			$siguienteTurno = 'O';
		}
		else
		{			
			$siguienteTurno = 'X';
		}

		$consulta = sprintf("insert into jugadas(turno, renglon, columna) values ('%s',0,0)",$siguienteTurno);
		mysql_query($consulta);
	}

	$salidaJSON = array('respuesta' => $respuesta);
	print json_encode($salidaJSON);
}

function refrescar()
{
	$turno = array();
	$columna = array();
	$renglon = array();
	$jugadas = array();
	$pos = 0;
	conexion();
	$consulta = "select * from jugadas";
	$resultado = mysql_query($consulta);

	if(mysql_num_rows($resultado) > 0)
	{
		while($registro = mysql_fetch_array($resultado))
		{
			$renglon = $registro["renglon"];
			$columna = $registro["columna"];
			$turno = $registro["turno"];
			
			$jugadas[$pos] = array(
				"turno" => $turno,
				"columna" => $columna,
				"renglon" => $renglon);
			$pos++;
		}
	}

	$salidaJSON = array('jugadas' => $jugadas);
	print json_encode($salidaJSON);
}

function reiniciar()
{
	conexion();
	$delete = "delete from jugadas where 1";
	mysql_query($delete);
	$insert = "insert into jugadas (turno, renglon, columna) values ('X',0,0)";
	mysql_query($insert);
	$respuesta = true;
	$salidaJSON = array('respuesta' => $respuesta);
	print json_encode($salidaJSON);
}

function conexion()
{
	mysql_connect("u961938981_gato","u961938981_pw","ODG!2mS@n6");
	mysql_select_db("gato");
}

$accion = $_POST["accion"];
switch ($accion) {
	case 'pideTurno':
		pideTurno();
		break;
	case 'validaTurno':
		validaTurno();
		break;
	case 'validaCasilla':
		validaCasilla();
		break;
	case 'refrescar':
		refrescar();
		break;
	case 'reiniciar':
		reiniciar();
		break;
	default:
		# code...
		break;
}
?>