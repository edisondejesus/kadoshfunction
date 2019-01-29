<?php
	include'conexion.php';
	include'logic.php'; 

	$app = new Clinica();

	Clinica::make_fiels();

	if(isset($_POST['doctor'])){ 
		$doctor = $_POST['doctor'];

			$app->doctores($conn,$doctor);

	}

	if(isset($_POST['leido'])){

		$leido = $_POST['leido'];
     
		file_put_contents("cello.txt", $leido);


	}	


	if(isset($_POST['id_doctor'])){

 		$fecha_cita= date('Y-m-d H:i:s');
		$hora_minuto = $_POST['hora_minuto'];
		$asunto = $_POST['asunto'];
		$id_doctor =$_POST['id_doctor'];
		$paciente = $_POST['paciente'];
		$id_procedimiento = $_POST['id_procedimiento'];
		$telefono = $_POST['telefono'];
		$cedula = $_POST['cedula'];
		$hbd = $_POST['hbd'];

		$app->crear_cita($fecha_cita,$hora_minuto,$asunto,$id_doctor,$paciente,$telefono,$cedula,$hbd,$conn);


	}


	if(isset($_POST['clave'])){

		$clave=  $_POST['clave'];
		$nombre = $_POST['nombre'];
		$apellido = $_POST['apellido'];
		$dni = $_POST['dni'];
		$especialidad =$_POST['especialidad'];
		$foto_tp = $_FILES['archivo']['tmp_name'];
		$descripcion = $_POST['descripcion'];
		$fecha = date('ymdis');

			$archivo_guardado="imagenes/";
			$archivo_guardado.=$fecha.$_FILES['archivo']['name']; 


			move_uploaded_file($foto_tp,$archivo_guardado);


		$app->guardar_doctor($nombre,$apellido,$clave,$dni,$especialidad,$descripcion,$archivo_guardado,$conn);


	}

	if(isset($_POST['id_eliminar'])){

		$id = $_POST['id_eliminar'];

		$app->eliminar_cita($id,$conn);




	}else if(isset($_POST['cargar_procedimientos'])){

		$result=$app->procedimientos($conn);
		echo $result;

	}else if(isset($_POST['save_status'])){


		$cita =  $_POST['id_cita'];

		 if($app->crear_status($cita,$conn)=="ya esta cita tiene un estatus"){


		 		echo" ok";
		 }else{

		 	echo " ok";
		 }

	}else if(isset($_POST['load_status'])){

		$id_cita = $_POST['id_cita'];

			$app->cargar_status($id_cita,$conn);

	}else if(isset($_POST['general_factura'])){


		$monto  = $_POST['monto'];
		$id_estatus = $_POST['id_estatus'];
		$abono = $_POST['abono'];
		$tipo_de_pago =  $_POST['type_pay'];
		if($abono=="abono"){

			$concepto_pago = "abono";
		}else{

			$concepto_pago= "completo";
		}

	
		$app->generar_factura($monto,$id_estatus,$concepto_pago,$abono,$conn,$tipo_de_pago);

	}else if(isset($_POST['cargar_facturas'])){

		$id_estatus = $_POST['id_estatus'];


		$app->traer_facturas($id_estatus);



	}else if(isset($_POST['cargar_citas'])){

				$app->citas_general($conn,'assoc');

	}else if(isset($_POST['cargar_citas_json'])){

				$app->citas_general($conn,'json');


	}else if(isset($_POST['agregar_procedimiento'])){

			$id_estatus = $_POST['id_estatus'];
			$id_procedimiento = $_POST['id_procedimiento'];
			$cantidad_p = $_POST['cantidad_procedimiento'];
			$app->agregar_procedimiento($id_estatus,$id_procedimiento,$cantidad_p);
	}else if(isset($_POST['generar_reporte'])){

 			$id_cita = $_POST['id_cita'];
 			$id_estatus = $_POST['id_estatus'];

 			$app->generar_reporte($id_estatus,$id_cita);


	}else if(isset($_POST['ingresos_hoy'])){


		$app->ingresos_hoy();

	}else if(isset($_POST['ingreso_fechas'])){

		$fecha_i = $_POST['fecha_i'];
		$fecha_f = $_POST['fecha_f'];

		$app->ingresos_rango($fecha_i,$fecha_f);


	}else if(isset($_POST['eliminar_cita'])){

		$id_cita = $_POST['id_cita'];

		$app->eliminar_cita($id_cita);

	}else if(isset($_POST['remover_procedimiento'])){

			$id_historial = $_POST['id_historial'];
			$cantidad = $_POST['cantidad'];
			$cantidad_r = $_POST['cantidad_r'];
			remover_procedimiento($id_historial,$cantidad,$cantidad_r);

	}else if(isset($_POST['load_process'])){

		$id_estatus = $_POST['id_estatus'];

			cargar_procedimientos($id_estatus);

	}else if(isset($_POST['citas_search'])){

		$data = $_POST['filtro'];
			citas_search($data);

	}else if(isset($_POST['save_process'])){

			$nombre_procedimiento = $_POST['nombre_procedimiento'];
			$precio = $_POST['precio_procedimiento'];

				agregar_procedimiento($nombre_procedimiento,$precio);
	}else if(isset($_POST['guardar_sub_cita'])){
		$id_estatus = $_POST['id_estatus'];
		$fecha = $_POST['fecha_cita'];
		$hora = $_POST['hora_cita'];

			agregar_sub_cita($id_estatus,$fecha,$hora);
	}else if(isset($_POST['cargar_sub_citas'])){

			$id_estatus  = $_POST['id_estatus'];

			cargar_sub_citas($id_estatus);



	}else if(isset($_POST['cargar_1_procedimiento'])){

			$id_procedimiento = $_POST['id_procedimiento'];

			cargar_1_procedimiento($id_procedimiento);

	}else if(isset($_POST['actualizar_process_a'])){

		$id_procedimiento = $_POST['id_procedimiento'];
		$precio_procedimiento = $_POST['precio_procedimiento'];
		$nombre_procedimiento = $_POST['nombre_procedimiento'];

			editar_procedimiento($nombre_procedimiento,$precio_procedimiento,$id_procedimiento);


	}else if(isset($_POST['eliminar_process_a'])){

		$id_procedimiento = $_POST['id_procedimiento'];
			eliminar_procedimiento($id_procedimiento);

	}else if(isset($_POST['aplicar_descuento'])){

			$id_estatus = $_POST['id_estatus'];
			$tipo = $_POST['tipo'];

			descuentos($tipo,$id_estatus);


			
	}else if(isset($_POST['eliminar_sub_cita'])){

			$id_sub_cita = $_POST['id_sub_cita'];
			eliminar_sub_cita($id_sub_cita);
			
	}else if(isset($_POST['cargar_1_sub_cita'])){
			$id_sub_cita = $_POST['id_sub_cita'];

			cargar_1_sub_cita($id_sub_cita);
	}else if(isset($_POST['actualizar_sub_cita'])){

			$id_sub_cita = $_POST['id_sub_cita'];
			$fsub_cita = $_POST['fsub_cita'];
			$hsub_cita = $_POST['hsub_cita'];

			actualizar_sub_cita($id_sub_cita,$fsub_cita,$hsub_cita);

	}else if(isset($_POST['load_1_cita'])){

		$id_cita  = $_POST['id_cita'];

		load_1_cita($id_cita);


	}else if(isset($_POST['update_1_cita'])){

		$id_cita  = $_POST['id_cita'];
		$paciente = $_POST['paciente'];
		$asunto= $_POST['asunto'];
		$hora_minuto = $_POST['hora_minuto'];
		$fecha_cita = $_POST['fecha_cita'];
		$id_doctor = $_POST['id_doctor_a'];

		update_1_cita($id_cita,$paciente,$hora_minuto,$asunto,$fecha_cita,$id_doctor);

	}else if(isset($_POST['filtrar_procedimiento'])){

		$key = $_POST['key'];
		$app->buscar_procedimientos($key);

		
	}else if(isset($_POST['aplicar_descuento_manual'])){

			$id_estatus = $_POST['id_estatus'];
			$monto = $_POST['monto'];



			descuentos('a',$id_estatus,'descuento_manual',$monto);


	}
?>