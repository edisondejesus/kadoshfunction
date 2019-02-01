<?php
	include'conexion.php';

class Clinica 
{
	
	public function __construct(){


	}




		public static function login($nombre,$clave,$conn){


			$sql =  "select * from doctor where clave='$clave' & nombre='$nombre'";
			$search = $conn->query($sql);

			if($search->num_rows>0){

				echo "ready..";
			}else{

				echo "usuario o contraseña incorrectos";
			}




		}

	public static function make_fiels(){

			global $conn;

			$sql =  "alter table factura add cmf int";
			$exec = $conn->query($sql);
			$sql = "alter table cita add cedula varchar(200),add fecha_nacimiento date";
			$exec =$conn->query($sql);




	}

	public static function comprobante_fiscal(){
			global $conn;
			
			$sql = "select cmf from factura order by id_factura desc limit 1";
			$get_cmf = $conn->query($sql);
			$get_cmf = mysqli_fetch_object($get_cmf);

			return $get_cmf->cmf;

	}


	public static function show_cmf(){

				$u  = "b0";
				$valor  = 200000000;

				$c = Clinica::comprobante_fiscal();
			 	$valor_actual= $c;
					echo $u;
					echo $valor+$valor_actual;
			//pasar valor actual a la factura
	}

	function generar_reporte($id_estatus,$id_factura){
    

			$data_list =[
				'historial_p'=>[],
				'factura'=>[],
				'status'=>[],
				'cita'=>[]
			];

			$historial_p= [];
    		global $conn;
			$sql = "select  * from historial_p as h inner join procedimiento as p on h.id_procedimiento=p.id_procedimiento where id_estatus=?";
			$data = $conn->prepare($sql);
			$data->bind_param('i',$id_estatus);
			$data->execute();
			$rows = $data->get_result();		

			foreach ($rows as $key) {
			

					$historial_p[] = $key;

			}

			$data_list['historial_p'] = $historial_p;


			$sql = "select * from factura where id_factura=?";
			$data = $conn->prepare($sql);
			$data->bind_param('i',$id_factura);
			$data->execute();
			$row1 = $data->get_result();

			$data_list['factura'] = mysqli_fetch_object($row1); 
			


			#serach status 

			$sql = "select  * from estatus where id_estatus=?";
			$resp = $conn->prepare($sql);
			$resp->bind_param('i',$id_estatus);
			$resp->execute();
			$info = $resp->get_result();
			
			$data_list['status'] =  mysqli_fetch_object($info);
			
		 	$id_cita =  $data_list['status']->id_cita;
 			
		 	$sql = "select * from cita inner join doctor  on  cita.id_doctor=doctor.id_doctor where id_cita=?";
		 	$ok = $conn->prepare($sql);
		 	$ok->bind_param('i',$id_cita);
		 	$ok->execute();
		  $data_list['cita']=  mysqli_fetch_object($ok->get_result());



			return $data_list;



	}



	function traer_facturas($id_estatus){

		global $conn;

		$sql = "select * from factura as f  inner join estatus as s on  s.id_estatus=f.id_estatus where f.id_estatus='$id_estatus' order by fecha_pago desc";
		$resp = $conn->query($sql);
		$data = [];
		foreach ($resp as $key) {
		
			$data[] = $key;
		}

		echo json_encode($data);


	}



	function actualizar_estatus($id_estatus,$monto){

		global $conn;
		$sql = "select precio from estatus where id_estatus='$id_estatus'";
		$resp = $conn->query($sql);
		foreach ($resp as $key) {
			
				$precio = $key['precio'];
		}	

		$total = $precio - $monto;

		#actualizando estatus

		$sql = "update estatus set precio='$total' where id_estatus='$id_estatus'";
		$process = $conn->query($sql);
		if($process){
			echo " nitido..";
		}else{
			echo "error! :(";
		}

		
	}


	 function citas_general($conn,$conf){


				$sql = "select * from cita inner join doctor as dr on cita.id_doctor=dr.id_doctor order by fecha_cita desc limit 100";
				$resp = $conn->query($sql);
				$data = [];
				foreach ($resp as $key) {
					
						$data[]= $key;
				}

			if($conf=="assoc"){

				return $data;

			}else if($conf=="json"){

					echo json_encode($data);

			}


		}

	


 function crear_cita($fecha_cita,$hora_minuto,$asunto,$id_doctor,$paciente,$telefono,$cedula,$hbd,$conn){
 				

				$sql = "insert into cita(fecha_cita,hora_minuto,asunto,id_doctor,paciente,telefono,cedula,fecha_nacimiento) values(?,?,?,?,?,?,?,?)";
				$ok = $conn->prepare($sql);
				$ok->bind_param('sssissss',$fecha_cita,$hora_minuto,$asunto,$id_doctor,$paciente,$telefono,$cedula,$hbd);
				$ok->execute() or die("no se registro");
				echo "success";


		}

	function consulta_pendiente($id_doctor,$conn){


				$sql = "select * from cita where id_doctor='$id_doctor'";
				$process =  $conn->query($sql);
				$data = [];
				foreach ($process as $key) {
						
						$data[] = $key;
				}

				echo json_encode($data);
		}

		function generar_factura($monto,$id_estatus,$concepto_pago,$abono=false,$conn,$tipo_de_pago){

			#debug 
			$cmf = Clinica::comprobante_fiscal()+1;

			$dia = date("ymd");
			echo $monto." ".$id_estatus." ".$concepto_pago." ".$abono;
		

		 	 $ganancia_doctor =($monto * 40) /100;
			 $ganancia_clinica  = ($monto * 60) /100;
		
			$fecha_pago = date('Y-m-d H:i:s');


			if($abono=="abono"){
							$this->actualizar_estatus($id_estatus,$monto);

				$sql = "insert into factura (monto,concepto_pago,id_estatus,ganancia_clinica,ganancia_doctor,fecha_pago,dia,tipo_de_pago,cmf)values(?,?,?,?,?,?,?,?,?)";
				$guardar = $conn->prepare($sql);
				$guardar->bind_param('dsiddsssi',
					$monto,
					$concepto_pago,
					$id_estatus,
					$ganancia_clinica,
					$ganancia_doctor,
					$fecha_pago,
					$dia,
					$tipo_de_pago,
					$cmf
				);

				$guardar->execute();



			}else{
				#registrando pago completo
				//echo "COMPLETO ACTIVO..";

				$sql = "select precio from estatus where id_estatus='$id_estatus'";
				$resp = $conn->query($sql);
				foreach ($resp as $key) {
				
					$precio = $key['precio'];
				}

				$monto = $precio;


				$this->actualizar_estatus($id_estatus,$monto);

		 	 		$ganancia_doctor =($monto * 40) /100;
					$ganancia_clinica  = ($monto * 60) /100;



				
				$sql = "insert into factura (monto,concepto_pago,id_estatus,ganancia_clinica,ganancia_doctor,fecha_pago,dia,cmf,tipo_de_pago)values(?,?,?,?,?,?,?,?,?)";
				$guardar = $conn->prepare($sql);
				$guardar->bind_param('dsiddssis',
					$monto,
					$concepto_pago,
					$id_estatus,
					$ganancia_clinica,
					$ganancia_doctor,
					$fecha_pago,
					$dia,
					$cmf,
					$tipo_de_pago

				);

				$guardar->execute();





			}



		}


		function doctores($conn,$buscar){


				$sql  = "select * from doctor where nombre like '%$buscar%' || apellido like '%$buscar%'";
			
			$data = [];
			$result = $conn->query($sql);

			foreach ($result as $key) {
					
					$data[] = $key;
			}

			echo json_encode($data);

		}


		function guardar_doctor($nombre,$apellido,$clave,$dni,$especilidad,$descripcion,$ruta_imagen,$conn){


				#verificando exitencia
				$sql = "select from doctor where nombre='$nombre' & apellido='$apellido'";
				$process = $conn->query($sql);

				if($process->num_rows>0){

					echo "Este doctor ya esta registrado";
				}else{



					$sql = "insert into doctor(nombre,apellido,clave,dni,especialidad,descripcion,foto_doctor)values(?,?,?,?,?,?,?)";
								$run  = $conn->prepare($sql);
								$run->bind_param('sssssss',
									$nombre,
									$apellido,
									$clave,
									$dni,
									$especilidad,
									$descripcion,
									$ruta_imagen
								);

								$run->execute();

				}


			header("location:index.php");
		


		}

		function eliminar_cita($id){

			global $conn;

			$sql = "delete from cita where id_cita='$id'";
			$process = $conn->query($sql);

			if($process){
				echo "success";
			}


		}


		function procedimientos($conn){


				$sql = "select * from procedimiento";
				$result = $conn->query($sql);
				$data = [];

				foreach ($result as $key) {
			
							$data[] = $key;
				}

				echo  json_encode($data);

		}


		function guardar_procedimiento($id_procedimiento,$id_cita,$conn){

			#buscar procedimiento
			$sql = "select * from  procedimiento where id_procedimiento='$id_procedimiento'";
			$respuesta = $conn->query($sql);
			$procedimiento = [];
			foreach ($respuesta as $key) {

					$procedimiento[] = $key;
			}

			$precio = $procedimiento[0]['precio'];

			#guardar status
			$sql = "insert into estatus(precio,id_cita)values(?,?)";
			$goro = $conn->prepare($sql);
			$goro->bind_param('ii',$precio,$id_cita);
			$goro->execute();


		}


		function cargar_status($id_cita,$conn){


				$sql ="select  * from  estatus inner join cita  on cita.id_cita=estatus.id_cita inner join doctor on  cita.id_doctor=doctor.id_doctor where estatus.id_cita='$id_cita'";
				$process = $conn->query($sql);
				$data = [];

				foreach ($process as $key) {
				
						$data[] = $key;
				}

				$id_estatus = $data[0]['id_estatus'];
				
				#verificando si hay procedimiento guardado
				$sql = "select * from historial_p where id_estatus='$id_estatus'";
				$data = $conn->prepare($sql);
			

				if($data->num_rows<1){
					#actualziar estatus
					#nuevos cambios
					/*
					$sql = "update estatus set precio=0 where id_estatus=?";
					$update = $conn->prepare($sql);
					$update->bind_param('i',$id_estatus);
					$update->execute();

					*/

				}

				echo json_encode($key);



		}



		function crear_status($id_cita,$conn){
			
			$sql = "select  id_cita,id_procedimiento from cita where id_cita='$id_cita'";
			$resp = $conn->query($sql);

			$data = [];


			foreach ($resp as $key) {

				$data[] = $key;

			}

				$id_cita = $data[0]["id_cita"];
				$id_procedimiento = $data[0]["id_procedimiento"];
				#buscando el procedimiento para sacar el precio
				$sql = "select * from procedimiento where id_procedimiento='$id_procedimiento'";
				$resp =  $conn->query($sql);
				foreach ($resp as $key) {
				
					$data[] = $key;
				}

				$precio=$data[1]['precio'];


				#verficando si existe un status
				$sql = "select * from  estatus where id_cita='$id_cita'";
				$resp  = $conn->query($sql);

				if($resp->num_rows>0){

                  	echo "Ya esta cita tiene un estatus";

				}else{

					#regitrando status
					$sql = "insert into estatus(id_cita,precio)values(?,?)";
					$ready = $conn->prepare($sql);
					$ready->bind_param('ii',$id_cita,$precio);
					$ready->execute();
				}



		}

		function agregar_procedimiento($id_estatus,$id_procedimiento,$cantida_p){
			 
			global $conn;

			$sql = "select * from procedimiento where id_procedimiento=?";
			$save = $conn->prepare($sql);
			$save->bind_param('i',$id_procedimiento);
			$save->execute();
			$data = $save->get_result();
			$precio = 0;
			foreach ($data as $key) {

					$precio =$key['precio'] * $cantida_p;	
			}

			$sql = "select * from estatus where id_estatus=?";
			$save = $conn->prepare($sql);
			$save->bind_param('i',$id_estatus);
			$save->execute();
			$data = $save->get_result();

			foreach ($data as $key) {
				
				$precio_estatus = $key['precio'];		
			}

			$total = $precio_estatus + $precio;

			#actualizar status

			$sql ="update estatus set precio=? where id_estatus=?";
			$save = $conn->prepare($sql);
			$save->bind_param('di',$total,$id_estatus);
			$save->execute();



			$fecha_agregado = date('ymd');
				#Registrar procedimiento en el estatus actual para luego ser calculado
			$sql = "insert into historial_p(id_estatus,id_procedimiento,fecha_agregado,cantidad)values(?,?,?,?)";
			$ok = $conn->prepare($sql);
			$ok->bind_param('iisi',$id_estatus,$id_procedimiento,$fecha_agregado,$cantida_p);
			$ok->execute();
		
			#actualizando estatus con el nuevo agregado 
		
		

		}

		#Buscando procedimientos

		function buscar_procedimientos($param){

			global $conn;
			$sql = "select * from procedimiento where procedimiento like '%$param%'";
			$data = $conn->query($sql);
			$arrays=[];
			foreach($data as $key){

				$arrays[] = $key;

			}
			echo json_encode($arrays);


		}

		function ingresos_hoy(){
			global $conn;
			$hoy = date('ymd');


			$sql = "select sum(monto)ingresos from factura where dia='$hoy'";
			$resp = $conn->query($sql);
			$data = mysqli_fetch_object($resp);


			echo $data->ingresos;



		}

		function ingresos_rango($fecha_inicial,$fecha_final){

			global $conn;
			$sql = "select sum(monto)ingresos from factura where dia>='$fecha_inicial' and dia<='$fecha_final'";
			$resp = $conn->query($sql);
			$data = mysqli_fetch_object($resp);


			echo $data->ingresos;




		}




}


	function eliminar_cita($id_cita){

			global $conn;
				$sql = "delete from cita where id_cita=?";
				$ejecutar = $conn->prepare($sql);
				$ejecutar->bind_param('i',$id_cita);
				$ejecutar->execute() or die("error no se pudo eliminar cita");

				echo "cita eliminada con exito";



		}

	function  cargar_procedimientos($id_estatus){

		global $conn;
			$sql=  "select * from historial_p as hp inner join procedimiento as p on hp.id_procedimiento=p.id_procedimiento where hp.id_estatus=?";
			$save = $conn->prepare($sql);
			$save->bind_param('i',$id_estatus);
			$save->execute();
			$result = $save->get_result();
			$data =[];
			foreach ($result as $key) {
					
					$data[] = $key;
			}

			echo json_encode($data);

	}


	function  remover_procedimiento($id_historial,$precio,$cantida_r){
		global $conn;
		
		echo "esta es la canitdad a restar ".$cantida_r;

		//Buscando el id del estatus para actualizarlo ahora

		$sql = "select * from historial_p where id_hostorial=?";
		$listo = $conn->prepare($sql);
		$listo->bind_param('i',$id_historial);
		$listo->execute();
		$result = $listo->get_result();
		$result = mysqli_fetch_object($result);
		$id_estatus = $result->id_estatus;
		$cantidad_a = $result->cantidad;
		$cantidad_a-=$cantida_r;



		#actualizando valor actual de este producto

		$sql_a = "update historial_p set cantidad=? where id_hostorial=?";
		$act = $conn->prepare($sql_a);
		$act->bind_param('ii',
			$cantidad_a,
			$id_historial
		);
		$act->execute() or die("Problemas al actualizar la cantidad actual");
		#buscando nuevo valor de cantidad
		 $sql = "select * from historial_p where id_hostorial=?";
		$listo = $conn->prepare($sql);
		$listo->bind_param('i',$id_historial);
		$listo->execute();
		$result = $listo->get_result();
		$cant = mysqli_fetch_object($result);
		$cant = $cant->cantidad;


		#borrando historial del estatus actual

	if($cant==0){
				$sql = "delete from historial_p where id_hostorial=?";
				$listo= $conn->prepare($sql);
				$listo->bind_param('i',$id_historial);
				$listo->execute() or die("tenemos un problema");

	}

				//Buscando el valor del estatus actual
				$sql = "select * from estatus where id_estatus=?";
				$listo = $conn->prepare($sql);
				$listo->bind_param('i',$id_estatus);
				$listo->execute();
				$result = $listo->get_result();
				$valor_a = mysqli_fetch_object($result);
				$valor_a =  $valor_a->precio;
				#restandole el procedimiento al esatus removido
				$valor_a-=$precio * $cantida_r;

				#actualizando estatus
				$sql = "update estatus set precio=? where id_estatus=?";
				$ready  = $conn->prepare($sql);
				$ready->bind_param('di',$valor_a,$id_estatus);
				$ready->execute() or die("error al actualizar status");

				echo  "sucess estatus actualizado con exito";


}


	function citas_search($data){
		global $conn;
			
		$sql = "select * from cita inner join doctor as dr on cita.id_doctor=dr.id_doctor   where paciente like '%$data%' order by fecha_cita desc";
			$resp  = $conn->query($sql);


			$data = [];
				foreach ($resp as $key) {
					
						$data[]= $key;
				}

		

				echo json_encode($data);





	}

	function agregar_procedimiento($nombre,$precio){

			global $conn;
			$sql ="insert into procedimiento(procedimiento,precio)values(?,?)";
			$ready = $conn->prepare($sql);
			$ready->bind_param('sd',$nombre,$precio);
			$ready->execute() or die("error no se guardo");
			echo "success";



	}

	function agregar_sub_cita($id_estatus,$dia,$fecha){

		global $conn;
		$sql = "insert into sub_cita(dia,hora,id_estatus)values(?,?,?)";
		$guardar = $conn->prepare($sql);
		$guardar->bind_param('ssi',$dia,$fecha,$id_estatus);
		$guardar->execute() or die("error no se pudo guardar");

		echo "Sub cita guardad con exito!";
	
		#buscando cita relaccionada con el estatus para ponerla actual
		$sql = "select id_cita from estatus where id_estatus=?";
		$guardar = $conn->prepare($sql);
		$guardar->bind_param('i',$id_estatus);
		$guardar->execute();
		$result = $guardar->get_result();
		$id_cita  = mysqli_fetch_object($result);
		$id_cita = $id_cita->id_cita;

		#actualizando cita como reciente;
		$fecha_cita =  date('Y-m-d H:i:s');

		$sql ="update cita set fecha_cita=? where id_cita=?";
		$update = $conn->prepare($sql);
		$update->bind_param('si',$fecha_cita,$id_cita);
		$update->execute() or die("error no se pudo actualizar la cita");
		echo "success";




	}

	function descuentos($tipo,$id_estatus,$conf='planes',$descuento_manual=0){

		global $conn;
						$sql = "select * from estatus where id_estatus=?";
						$leer =  $conn->prepare($sql);
						$leer->bind_param('i',$id_estatus);
						$leer->execute();
						$data = $leer->get_result();
						$total_estatus  = mysqli_fetch_object($data);
						$total_estatus = $total_estatus->precio;

		if($conf=='planes'){

						

						$descuesto_a=5;
						$descuento_b=10;
						$descuento_c=15;



				switch ($tipo) {
					case 'a':
							$descuento  = ($total_estatus * $descuesto_a) /100;
							$total_estatus-=$descuento;
							$sql = "update estatus set precio=? where id_estatus=?";
							$actualizar = $conn->prepare($sql);
							$actualizar->bind_param('di',
								$total_estatus,
								$id_estatus
							);

							$actualizar->execute() or die("algo salio mal");
								$resp = [
								'estatus'=>'success',
								'descuento'=>$descuento

							];


							echo json_encode($resp);


						break;
				
					case 'b':
							$descuento  = ($total_estatus * $descuento_b) /100;
							$total_estatus-=$descuento;
							$sql = "update estatus set precio=? where id_estatus=?";
							$actualizar = $conn->prepare($sql);
							$actualizar->bind_param('di',
								$total_estatus,
								$id_estatus
							);

							$actualizar->execute() or die("algo salio mal");

							$resp = [
								'estatus'=>'success',
								'descuento'=>$descuento

							];


							echo json_encode($resp);




						
						break;
				

					case 'c':
							$descuento  = ($total_estatus * $descuento_c) /100;
							$total_estatus-=$descuento;
							$sql = "update estatus set precio=? where id_estatus=?";
							$actualizar = $conn->prepare($sql);
							$actualizar->bind_param('di',
								$total_estatus,
								$id_estatus
							);

							$actualizar->execute() or die("algo salio mal");

								$resp = [
								'estatus'=>'success',
								'descuento'=>$descuento

							];


							echo json_encode($resp);


						
						break;


				   case 'd':
				   			//descuento de seguro
				   			$descuento  = ($total_estatus * 30) /100;
							$total_estatus-=$descuento;
							$sql = "update estatus set precio=? where id_estatus=?";
							$actualizar = $conn->prepare($sql);
							$actualizar->bind_param('di',
								$total_estatus,
								$id_estatus
							);

							$actualizar->execute();

								$resp = [
								'estatus'=>'success',
								'descuento'=>$descuento

							];


							echo json_encode($resp);
							

		
				   	break;


				}

		}else if($conf=='descuento_manual'){

   
				$change =$total_estatus-$descuento_manual;

							$sql = "update estatus set precio=? where id_estatus=?";
							$actualizar = $conn->prepare($sql);
							$actualizar->bind_param('di',
								$change,
								$id_estatus
							);

							$actualizar->execute() or die("erorr aplicando el descuento 'C'");
							echo "descuento a aplicado correctamente!";



		}


	}

	function cargar_sub_citas($id_estatus){
		global $conn;

		$sql = "select * from sub_cita where id_estatus=?";
		$leer = $conn->prepare($sql);
		$leer->bind_param('i',$id_estatus);
		$leer->execute();
		$resultado =  $leer->get_result();
		$data = [];

		foreach ($resultado as $key) {
		  		
				$data[] = $key;

		  }  


		  echo json_encode($data);


	}


	function cargar_1_procedimiento($id_procedimiento){

		global $conn;

		$sql = "select * from procedimiento where id_procedimiento=?";
		$read  = $conn->prepare($sql);
		$read->bind_param('i',$id_procedimiento);
		$read->execute();
		$result  = $read->get_result();
		
		$data =  mysqli_fetch_object($result);

		echo json_encode($data);


	}

	function editar_procedimiento($name_process,$precio,$id_procedimiento){

		global $conn;
			$sql = "update procedimiento set procedimiento=?,precio=? where id_procedimiento=?";
			$update = $conn->prepare($sql);
			$update->bind_param('sdi',
				$name_process,
				$precio,
				$id_procedimiento

			);
			$update->execute() or die("no se pudo acutalizar procedimiento");

			echo "success";

	}


	function eliminar_procedimiento($id_procedimiento){


		global $conn;
			$sql = "delete from procedimiento where id_procedimiento=?";
			$borrar = $conn->prepare($sql);
			$borrar->bind_param('i',$id_procedimiento);
			$borrar->execute() or die("no se pudo eliminar");

			echo "sucess";
	}


	function eliminar_sub_cita($id_sub_cita){

			global $conn;
			$sql = "delete from sub_cita where id_sub_cita=?";
			$delete= $conn->prepare($sql);
			$delete->bind_param('i',$id_sub_cita);
			$delete->execute() or die("error no se pudo eliminar sub cita");
			echo "success";

	}
	function actualizar_sub_cita($id_sub_cita,$fsub_cita,$hsub_cita){

		global $conn;
		#echo $id_sub_cita." ".$fsub_cita." ".$hsub_cita." ";
		#actualizar usb cita
		$sql = "update sub_cita set dia=?,hora=? where id_sub_cita=?";
		$update = $conn->prepare($sql);
		$update->bind_param('ssi',
			$fsub_cita,
			$hsub_cita,
			$id_sub_cita
		);
		$update->execute() or die("error no se pudo actualizar sub cita");

		echo "success";



	}



	function cargar_1_sub_cita($id_sub_cita){

		global $conn;

		$sql = "select * from sub_cita where id_sub_cita=?";
		$serach = $conn->prepare($sql);
		$serach->bind_param('i',$id_sub_cita);
		$serach->execute();
		$data = $serach->get_result();
		$data = mysqli_fetch_object($data);
		echo json_encode($data);


	}

	function load_1_cita($id_cita){
		global $conn;

		$sql = "select * from cita  as c inner join doctor as d on c.id_doctor=d.id_doctor  where id_cita=?";
		$read = $conn->prepare($sql);
		$read->bind_param('i',$id_cita);
		$read->execute();
		$datos = $read->get_result();
		$datos  =  mysqli_fetch_object($datos);

		echo json_encode($datos);



	}

	function update_1_cita($id_cita,$paciente,$hora_minuto,$asunto,$fecha_cita,$id_doctor,$telefono,$dni){


		global $conn;

		$sql = "update cita set paciente=?,hora_minuto=?,asunto=?,fecha_cita=?,id_doctor=?,telefono=?,dni=? where id_cita=?";
		$update = $conn->prepare($sql);
			$update->bind_param('ssssiiss',
				$paciente,
				$hora_minuto,
				$asunto,
				$fecha_cita,
				$id_doctor,
				$id_cita,
				$telefono,
				$dni
		);
		$update->execute() or die("tenemos un problema no se actualizo");


		echo "success";





	}



?>
