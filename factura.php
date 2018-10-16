<?php
	include'conexion.php';
	include'logic.php';


	$factura = new Clinica();
	$id_estatus = $_GET['id_estatus'];
	$id_factura = $_GET['id_factura'];


	$datos = $factura->generar_reporte($id_estatus,$id_factura);


	#print_r($datos);
?>
<!DOCTYPE html>
<html>
<head>
	<title>Factura generada</title>

	<script language="Javascript">
		window.onload=function(){


				var ficha = document.getElementById("factura");
			  var ventimp = window.open(' ', 'popimpr');
			  ventimp.document.write( ficha.innerHTML );
			  ventimp.document.close();
			  ventimp.print( );
			  ventimp.close();







		}


	</script>
</head>
<body>
	


		
		
	<div style="height:550px; width: 280px;  margin:auto;" id="factura">
	



	    	    <div style="width:800px; display: inline-flex;margin-left: 20px">
						<strong>CLINICA DENTAL KADOSH OR SRL</strong>
				</div>

				 <div style="width:800px; display: inline-flex;">
						<strong style="font-size:12px;">C/San Antonio #33A Los Alcarrizos Santo Domingo,R.D</strong>
	   					
				</div>


				 <div style="width:800px; display: inline-flex;">
						<strong>RNC: 131-76629-3</strong>
				</div>
				 <div style="width:800px; display: inline-flex;">
	      		<strong>Fecha: 			<?php  echo $datos['factura']->fecha_pago;  ?></strong>

	    		</div>

	   			 <div style="width:800px; display: inline-flex;">
	   				
	    			<strong ><?php echo "Recibo #:".$datos['factura']->id_factura;   ?></strong>
				</div>

				 <div style="width:800px; display: inline-flex;">
						<strong>Tel: 809-620-8641</strong>
	   				
				</div>
     	

	     	<div style="width:800px; display: inline-flex;">
			<strong>Paciente: 	<?php echo $datos['cita']->paciente;   ?></strong>


	    	</div>

	    <div style="width:800px; display: inline-flex;">
	   		<strong>Doctor:<?php  echo " ".$datos['cita']->nombre." ".$datos['cita']->apellido;  ?></strong>


	    </div>

	    	<div style="width:800px; display: inline-flex;">
	      		<strong>Historial de procedimientos<strong>
	      		<?php
	      		$total = 0;

				echo "<br>";
	      			for($i=0;$i<count($datos['historial_p']);$i++){

	      					echo  "<br><strong style='background:#F1F1F1;'>".$datos['historial_p'][$i]['procedimiento'] ." $".$datos['historial_p'][$i]['precio'].".00</strong>
	      					"."<strong>X ".$datos['historial_p'][$i]['cantidad']."</strong>
	      					";
	      					echo "$".$datos['historial_p'][$i]['cantidad'] * $datos['historial_p'][$i]['precio'];
	      					$total+= $datos['historial_p'][$i]['cantidad'] * $datos['historial_p'][$i]['precio'];
	      			}



	      		?>

	    	</div>

	    	<?php

	    		if($datos["factura"]->concepto_pago!="completo"){
	    		


	      				echo "<strong style='margin-left:30%; '>Total:$ ".$total.".00</strong><br>";

	   					echo "<strong style='margin-left:30%;'>Abono:$".$datos['factura']->monto."</strong>";
	   			 

	    			echo "<br><strong style='margin-left:25%;'>Resto a pagar: $".(float)$datos['status']->precio.".00</strong>";




	    		}else{
	    		


	      				echo "<strong style='margin-left:15%; margin-top:3%;'>Total $".$total.".00</strong>";

	      				echo "</br>Monto:$". $datos['factura']->monto; 


	    		}


	    	?>


	   

	    	<div style="width:800px; display: inline-flex;">
	      	
	      		<strong>Concepto de pago: 			<?php  echo $datos['factura']->concepto_pago;  ?></strong>

	    	</div>

	    	 <div style="width:800px; display: inline-flex;">
	      	
	      		<strong>Tipo de pago: 			<?php  echo $datos['factura']->tipo_de_pago;  ?></strong>

	    	</div>

	    	

	    
	      
	    	<div style="width:800px; display: inline-flex;">
	   			<strong>Doctor:<?php  echo " ".$datos['cita']->nombre." ".$datos['cita']->apellido;  ?></strong>
	   		
	   			
	    	</div>


	    	<div style="width:800px; display: inline-flex;">
	      	

	    			<strong>Firma _____________________________</strong>
	    	</div>


	    	<div style="width:800px; display: inline-flex;">
	      	

	    			<strong>*****************************************</strong>
	    	</div>



	    

	</div>
	



</body>
</html>


<style type="text/css">
	

strong	{

	margin-top: 2px;

}


</style>