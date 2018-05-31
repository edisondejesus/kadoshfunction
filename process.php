<?php
	include'master.php';


if(isset($_GET['id'])){


	$id_cita = $_GET['id'];
	$smarty->assign("cita_id",$id_cita);
}

	$smarty->display("module/process.tpl");






?>