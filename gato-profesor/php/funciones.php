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
	$consulta = "select turno from turnos limit 1";
	$consultaJugadas = "select * from jugadas";
	$resultado = mysql_query($consulta);
	$turno = "";

	if(mysql_num_rows($resultado) > 0)
	{
		$respuesta = true;
		$registro = mysql_fetch_array($resultado);
		$turno = $registro["turno"];

		$consulta = sprintf("delete from turnos where turno = '%s'",$turno);
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
	$empate = false;
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

	$consultaJugadas = "select * from jugadas";
	$consultaTurnos = "select * from turnos";
	$resultadoJugadas = mysql_query($consultaJugadas);
	$resultadoTurnos = mysql_query($consultaTurnos);
	if(mysql_num_rows($resultadoJugadas) > 9 && mysql_num_rows($resultadoTurnos) > 0)
	{
		$empate = true;
	}

	$salidaJSON = array('respuesta' => $respuesta, 'empate' => $empate);
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
	mysql_connect("localhost","root","");
	mysql_select_db("gato");
}

function insertaTurno()
{
	$turno = GetSQLValueString($_POST["turno"],"text");
	conexion();
	$insert = sprintf("insert into turnos values (%s)",$turno);
	mysql_query($insert);

	$respuesta = true;
	$salidaJSON = array('respuesta' => $respuesta);
	print json_encode($salidaJSON);
}

function cuentaJugadas()
{
	$jugadas = 0;
	conexion();
	$consulta = "select turno from jugadas";
	$resultado = mysql_query($consulta);
	$jugadas = mysql_num_rows($resultado);

	$salidaJSON = array('jugadas' => $jugadas);
	print json_encode($salidaJSON);
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
	case 'insertaTurno':
		insertaTurno();
		break;
	case 'cuentaJugadas':
		cuentaJugadas();
		break;
	default:
		# code...
		break;
}
?>