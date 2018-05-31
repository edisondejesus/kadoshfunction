<?php
	include'conexion.php';
	include'logic.php'; 

	$app = new Clinica();


	if(isset($_POST['doctor'])){

		$doctor = $_POST['doctor'];

			$app->doctores($conn,$doctor);

	}






?>