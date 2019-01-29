<?php
	include'logic.php';

	$u  = "b0";
	$valor  = 200000000;

	$c = Clinica::comprobante_fiscal();
 	$valor_actual= $c+1;



		echo $u;
		echo $valor+$valor_actual;
?>