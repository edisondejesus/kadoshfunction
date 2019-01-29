
	var control_f=false;
	var caractares_i="";
	var reference = 0;
	var  cantidad_r;
	var focus = true;
	var target_select="";
	var cantidad_proc= 0;
	var tipo_de_pago ="";

	function process_display(id_process){
		//para mostrar el procedimiento funcion lista
		process_on = true;

		if(process_on!=false){

			window.location.href=`process.php?id=${id_process}`;
		}

		process_on = false;

	}

	function type_pay(target){

		var interfaz_tipo_pago =`
			<div class='panel panel-body' id='slp${target}'>
					<div class='panel-heading'>Seleccione el tipo de pago<div>
					<div>
						<button class='btn btn-primary' id='efectivo'>Efectivo</button>
						<button class='btn btn-success' id='targeta'>Targeta</button>
						<button class='btn btn-info' id=;>Cheque</button>
					</div>	
			</div>
		`;

		$(`#tp${target}`).html(interfaz_tipo_pago);




	}

	function ventana_actualizacion(){

	
			var notificacion = `
			<div style='background:black;  position:absolute; z-index:4;opacity:0.8; color:gold; height:100%; width:100%;'>
				<h2 style='margin-left:40%'>Nuevas actualizaciones (01/10/2018)</h2>
				<h3 style='margin-left:30%'>- Problema del click solucionado si no cambie mause</h3>
				<h3 style='margin-left:30%'>- Ya puedes seleccionar el metodo de pago que saldra en la factura</h3>
				<h3 style='margin-left:30%'>- Ya puedes seleccionar la canitdad de procedimiento que vas a guardar</h3>
				<h3 style='margin-left:30%'>- Si registra X cuantidad de procedimientos tambien puedes removerla y se guardar en el sistema la resta de la cantidad que removiste</h3>
				<h3 style='margin-left:30%'>- Eliminar citas (disponible) saliendo una ventana de seguridad si aceptar o cancelar</h3>
				<h3 style='margin-left:50%'><button style='color:black;' id='entiendo'>Entiendo</button></h3>

			</div>
			`;

			$('#notificacion').html(notificacion);

			$('#entiendo').click(()=>{

				$.ajax({
					url:'metodos.php',
					type:'post',
					data:{
						leido:"confirmado"
					}


				}).done((data)=>{

						console.log(data);

						$('#notificacion').html("");


				});



			});
	}




	function select_process(target){

			/*
			cantidad_proc = prompt("Ingrese la cantidad de procedimiento");


				alert(cantidad_proc);
			*/
	}


	function select_hours(dato){
		
		if(dato=='remove'){

		 var long =	caractares_i.length;


		 	var new_string =  caractares_i.substring(long-1,0);
		 	caractares_i = new_string;

					$('#interfaz_hora_r').val(caractares_i);



		}else{
		caractares_i+= dato;

			
			$('#interfaz_hora_r').val(caractares_i);
        }


	}


	function descuento_manual(id_estatus){
		//aqui
		var infertaz_descuento=`
		<div style='left:500px; border-color:black; border:2px solid;  width:500px; margin-top:-200px; position:absolute; z-index:5' id='interfaz_d'>
			<div class='panel panel-default'>
					<input type='text' id='descuento_manual_d' class='form-control' placeholder='Digite el descuento'>
						<button class='btn btn-info' id='aplicar_descuento_manual'>Aplicar Descuento</button>
						<button class='btn btn-danger' id='cerrar'>Cerrar</button>

			</div>
		</div>
		`;

		$('#base_descuento').html(infertaz_descuento);


		$('#cerrar').click(()=>{

				$('#interfaz_d').remove();

		});

		$('#aplicar_descuento_manual').click(()=>{


				$.ajax({
					url:'metodos.php',
					type:'post',
					data:{
						aplicar_descuento_manual:true,
						id_estatus:id_estatus,
						monto:$('#descuento_manual_d').val()

					}


				}).done((data)=>{

							console.log(data);
							cargar_estatus();
				});


		});


	}



	function select_dr_update(id_doctor,img){

		$(`#doctor_id_a`).val(id_doctor);

		$('#doctor_img').html(`<img src='${img}' style='width:120px; height:120px; color:#337ab7; border:2px solid;' class='img-circle'><br>`);
		$('#doctor_img').hide();
		$('#doctor_img').show('slow');	

	}

	function doctor_up(){

			$.ajax({
						url:"metodos.php",
						type:"post",
						data:{
							doctor:""
						}
					}).done(function(resp){

						var data = JSON.parse(resp);
						var listas= "";

						for(var i=0;i<data.length;i++){


							listas+=`
								<li><a style='cursor:pointer;' onclick="select_dr_update(${data[i].id_doctor},'${data[i].foto_doctor}')">${data[i].nombre} ${data[i].apellido}<a></li>
							`;	


						}


							$('#doctores_update').html(listas);	


					});




	}


	function doctor_search(){
			reference=0;



		$('#doctor_s').keypress(function(){



					var valor =  $('#doctor_s').val();

					$.ajax({
						url:"metodos.php",
						type:"post",
						data:{
							doctor:valor
						}
					}).done(function(resp){

						var data = JSON.parse(resp);
						var listas= "";

						for(var i=0;i<data.length;i++){


							listas+=`<br>

							<div class='panel panel-default col-md-12' onclick='doctor(${data[i].id_doctor})' id='${data[i].id_doctor}'>

							<div class='col-md-2'>
							<img class='img-responsive img-circle' style='height:100px; width:100px;' src='${data[i].foto_doctor}' >
							</div>
							<div class='col-md-6'>			
									Dr.${data[i].nombre} ${data[i].apellido} ${data[i].descripcion}
							</div>
							</div>
						
							`;	


						}


							$('#doctor_view').html(listas);	


					});



		});
	}

	function activar_abono(){
			reference=0;


				$('#interfaz_abono').show('slow');

	

	}

	function  editar_cita(id_cita){
			reference=0;

		$.ajax({
			url:'metodos.php',
			type:'post',
			data:{
				load_1_cita:true,
				id_cita:id_cita

			}

		
		}).done((datos)=>{

			var data = JSON.parse(datos);
			var fecha  =  data.fecha_cita;
			var fecha_c="";
			var space=false;

				for(i=0;i<fecha.length;i++){


					if(fecha[i]==' '){
						space=true;
					}	

					if(space==false){

							fecha_c+=fecha[i];
					}
					


				}	

			var edit_form = `
			<div class='panel panel-default'>
				<div class='panel-heding'>Editar Cita</div>
				<strong>Paciente</strong><br>
				<input type='text' class='form-control' id='paciente_a' value='${data.paciente}'><br>
				<strong>Hora</strong><br>
				<input type='text' class='form-control' id='hora_a' value='${data.hora_minuto}'><br>
				<strong>Telefono</strong><br>
				<input type='text' value='${data.telefono}'  class='form-control' id='telefono_a'><br>
				<strong>Cedula</strong><br>
				<input type='text' class='form-control' class='form-control' value='${data.cedula}'><br>
				<strong>Asunto</strong><br>
				<textarea id='asunto_a' class='form-control'>${data.asunto}</textarea><br>
				<strong>DNI</strong><br>
				<input type='text' class='form-control' value='${data.dni}' id='dni_a'>
				<strong>Fecha cita</strong>
				<input type='date'  class='form-control' id='fecha_cita_a' value='${fecha_c}'><br>
				<strong>Cambiar doctor</strong><br>
				<div class='dropdown'>
					<button class='btn btn-primary dropdown-toggle' data-toggle='dropdown' >Doctores</button>
					<ul class='dropdown-menu' id='doctores_update'>
						<li>Gorito</li>
					<ul>
				</div>
				<strong>Doctor Select</strong>
				<div id='doctor_img'>
				<img class='img-circle' src='${data.foto_doctor}' style='height:120px; width:120px; color:#337ab7; border:solid 2px;'><br>

				</div>
				<input type='hidden' id='doctor_id_a' value='${data.id_doctor}'>
				<button class='btn btn-primary' id='actualizar_cita'>Actualizar</button>
				<button class='btn btn-info' onclick='citas_read()'>Atras</button>

			</div>
			`;

			doctor_up();

			$('#ejecutar').html(edit_form);





			$('#actualizar_cita').click(()=>{

				$.ajax({
					url:'metodos.php',
					type:'post',
					data:{
						update_1_cita:true,
						id_cita:data.id_cita,
						paciente:$('#paciente_a').val(),
						asunto:$('#asunto_a').val(),
						hora_minuto:$('#hora_a').val(),
						dni_a:$('#dni_a').val(),
						telefono:$('#telefono_a').val(),
						fecha_cita:$('#fecha_cita_a').val(),
						id_doctor_a:$('#doctor_id_a').val()


					}



				}).done((resp)=>{


						alert(resp);

				});




			});


		});







	}


	function eliminar_sub_cita(id_sub_cita){
			reference=0;
		$.ajax({
			url:'metodos.php',
			type:'post',
			data:{
				eliminar_sub_cita:true,
				id_sub_cita:id_sub_cita

			}


		}).done((data)=>{

			alert(data);
			cargar_estatus();
		});



	}

	function editar_sub_cita(id_sub_cita){
	reference=0;
			$.ajax({
				url:'metodos.php',
				type:'post',
				data:{
					cargar_1_sub_cita:true,
					id_sub_cita:id_sub_cita

				}


			}).done((data)=>{
				var dato = JSON.parse(data);
				var id_sub_cita = dato.id_sub_cita;
				var form_edit=`
				<div>
					<strong>Fecha cita</strong>
					<input type='date'/ class='form-control' value='${dato.dia}' id='fsub_cita'><br> 
					<strong>Hora sub cita</strong>
					<input type='text' class='form-control' value='${dato.hora}' id='hsub_cita'><br>
					<button class='btn btn-primary' id='acutalizar_sub_cita'>Actualizar sub_cita</button>
					<button onclick='cargar_estatus()' class='btn btn-primary'>Atras</button>
				</div>
				`;

				$('#ejecutar').html(form_edit);
					
				$('#acutalizar_sub_cita').click(()=>{

						$.ajax({
							url:'metodos.php',
							type:'post',
							data:{
								actualizar_sub_cita:true,
								fsub_cita:$('#fsub_cita').val(),
								hsub_cita:$('#hsub_cita').val(),
								id_sub_cita:id_sub_cita

							}


						}).done((data)=>{

								alert(data);

						});




				})





			});




	}


	function aplicar_descuento(tipo,id_estatus){
			reference=0;
		$.ajax({
			url:'metodos.php',
			type:'post',
			data:{
				aplicar_descuento:true,
				tipo:tipo,
				id_estatus:id_estatus	

			}


		}).done((data)=>{

			var resp = JSON.parse(data);
			console.log(resp);

			cargar_estatus();

		});


	}

	function eliminar_procedimiento(id_procedimiento){
			reference=0;
		$.ajax({
			url:'metodos.php',
			type:'post',
			data:{
				eliminar_process_a:true,
				id_procedimiento:id_procedimiento

			}


		}).done((data)=>{


			editar_procedimiento();

		});




	}


	function editar_process(id_procedimiento){

		$.ajax({
			url:'metodos.php',
			type:'post',
			data:{
				cargar_1_procedimiento:true,
				id_procedimiento:id_procedimiento

			}


		}).done((data)=>{



			var dato = JSON.parse(data);
				var id_procedimiento = dato.id_procedimiento;
				var formulario_process=`
				<button class='btn btn-primary' onclick='editar_procedimiento();'>Atras</button>
				<div class='panel panel-default'>
				<div class='panel-heading'>Editar Procedimiento</div>	
					<strong>Nombre procedimiento</strong><br>
					<input type='text' value='${dato.procedimiento}' id='process_name' class='form-control'><br>
					<strong>Precio</strong><br>
					<input type='text' value='${dato.precio}' id='process_price' class='form-control'>
					<input type='text' class='form-control' placeholder='Busca el procedimiento'>
					<button class='btn btn-primary' id='actualizar_process'>Actualizar procedimiento</button>	

				</div>
				`;

				$('#ejecutar').html(formulario_process);


				$('#actualizar_process').click(()=>{


						$.ajax({
							url:"metodos.php",
							type:'post',
							data:{
								actualizar_process_a:true,
								nombre_procedimiento:$('#process_name').val(),
								precio_procedimiento:$('#process_price').val(),
								id_procedimiento:id_procedimiento

							}


						}).done((data)=>{

								$('#ejecutar').html("<button class='btn btn-primary' onclick='editar_procedimiento();'>Atras</button><h2 style='color:green;'>Procedimiento editado con exito</h2>")
						});


				});

		});





	}




	function editar_procedimiento(){
			reference=0;
			$.ajax({
				url:'metodos.php',
				type:'post',
				data:{
					cargar_procedimientos:true,


				}


			}).done((data)=>{

				var datos = JSON.parse(data);

				var adpater_process=`<div class='panel panel-default'>`;


				datos.forEach((key)=>{



					adpater_process+=`
					<div  class='panel-heading'>${key.procedimiento} Precio:${key.precio}</div>
					<button class='btn btn-primary' onclick='editar_process(${key.id_procedimiento})' >Editar</button><button class='btn btn-danger' onclick='eliminar_procedimiento(${key.id_procedimiento})'>Eliminar</button>
					`;


				});

				adpater_process+=`</div>`;
				$('#ejecutar').html(adpater_process);


			});





	}

	function cargar_sub_citas(id_estatus){


			$.ajax({
				url:'metodos.php',
				type:'post',
				data:{
					cargar_sub_citas:true,
					id_estatus:id_estatus

				}

			}).done((data)=>{

				var datos = JSON.parse(data);
				var adapter_citas = `<h1>Historial de citas</h1><button onclick='cargar_estatus();' class='btn btn-primary'>Atras</button><div class='panel panel-default'>`;

				datos.forEach((key)=>{

					adapter_citas+=`<div class='panel-heading' style='background:darkblue;'>

						<strong>Horario de cita: ${key.dia} ${key.hora}</strong>
					</div><button onclick='editar_sub_cita(${key.id_sub_cita})' class='btn btn-primary'>Editar</button>
					<button class='btn btn-danger' onclick='eliminar_sub_cita(${key.id_sub_cita})'>Eliminar</button>
					`;


				});

				adapter_citas+=`</div>`;
					
				$('#ejecutar').html(adapter_citas);

			});



	}



	function agregar_sub_cita(id_estatus){
			reference=0;
			var formulario_sub_cita=`<button onclick='cargar_estatus();' class='btn btn-primary'>Atras</button>
			<div>
				<strong>Dia de cita</strong><br>
				<input type='date' id='dia_cita' class='form-control'><br>
				<strong>Hora cita</strong><br>
				<input type='text' id='hora_cita' class='form-control'><br>
				<button id='guardar_sub_cita' class='btn btn-primary'>Guardar sub cita</button>
			</div>
			`;

			$('#ejecutar').html(formulario_sub_cita);


			$('#guardar_sub_cita').click(()=>{


					$.ajax({
						url:'metodos.php',
						type:'post',
						data:{
							guardar_sub_cita:true,
							id_estatus:id_estatus,
							fecha_cita:$('#dia_cita').val(),
							hora_cita:$('#hora_cita').val()

						}


					}).done((data)=>{

						alert(data);
						cargar_estatus();

					});





			});


	}


	function buscando_citas(buscar){
			reference=0;
					$.ajax({

							url:'metodos.php',
							type:'post',
							data:{
				               citas_search:true,
				               filtro:buscar

							}


						}).done(function(resp){


								var data = JSON.parse(resp);
								citas=`<table class='table' border='1'>
								<tr>
									<th>Paciente</th>
									<th>Telefono</th>
									<th>Cedula</th>
									<th>Doctor</th>
									<th>Asunto</th>
									<th>Fecha</th>
									<th>Procesar</th>
									<th>Editar Cita</th>
									<th>Elimianr Cita</th>

								<tr>
								`;


								data.forEach((key)=>{


									citas+=`
									<tr>
										<td id='ci${key.id_cita}'>${key.paciente}</td>
										<td>${key.telefono}</td>
										<td>${key.nombre} ${key.apellido}</td>
										<td>${key.cedula}</td>
										<td>${key.asunto}</td>
										<td>${key.fecha_cita.substring(0,11)} ${key.hora_minuto}</td>
										<td><button class='btn btn-primary' onclick="process_display('${key.id_cita}')">Procesar</button></td>
										<td><button class='btn btn-info' onclick='editar_cita(${key.id_cita})'>Editar Cita</button></td>
										<td><button class='btn btn-danger' onclick='eliminar_cita(${key.id_cita})' >Eliminar</button></td>
									</tr>
									`;


								});

								citas+=`</table>`;

								$('#ejecutar').html(citas);


						});










	}


	function historial_procedimiento(id_estatus){
			//reference

		$.ajax({
			url:'metodos.php',
			type:'post',
			data:{

				load_process:true,
				id_estatus:id_estatus,
			}


		}).done((data)=>{

			var datos = JSON.parse(data);
		
			var procedimientos = `<div class='panel panel-default' id='process_list'>`;

			datos.forEach((key)=>{	

					procedimientos+=`<div class='panel-body'>
						<strong>Procedimiento ${key.procedimiento}</strong><br>
						<strong>Precio ${key.precio}</strong>|<strong>X ${key.cantidad}</strong>
						<button class='btn btn-danger' onclick="remover_procedimiento('${key.id_hostorial}','${key.precio}');">Remover</button>
						

					</div>`;

			});



			procedimientos+=`</div>`;

			if($('#process_list').val())
			$('#process_list').remove();

			if(reference==0){
					reference=1;
			   $('#ejecutar').append(procedimientos);

		    }
	
		});



	}





	function remover_procedimiento(id_historial,precio){
			reference=0;
			//remover procedimiento
		var cantidad_e = prompt("Cantidad que eliminar");
		 	//console.log(cantidad_e);

		$.ajax({
			url:'metodos.php',
			type:'post',
			data:{
				remover_procedimiento:true,
				id_historial:id_historial,
				cantidad:precio,
				cantidad_r:cantidad_e
			}

		}).done((data)=>{

				console.log(data);
				cargar_estatus();
		});




	}


	function eliminar_cita(id_cita){
				reference=0;

			var ventana_elimi = `
				<div class='panel panel-default' id='ven${id_cita}' style='z-index:3px; position:absolute; opacity:0.9; background:darkblue; margin-left:500px;'>
					<i style='color:white'>Eliminar Cita</i>
					<button id='eliminar_c' class='btn btn-danger'>Aceptar</button>
					<button id='cancelar_c' class='btn btn-primary'>Cancelar</button>
				</div>
			`;


			$(`#ci${id_cita}`).html(ventana_elimi);
 
			$('#cancelar_c').click(()=>{

					$(`#ven${id_cita}`).remove();


			});

			$('#eliminar_c').click(()=>{



						$.ajax({
						url:'metodos.php',
						type:'post',
						data:{
							eliminar_cita:true,
							id_cita:id_cita

						}


					}).done(function(data){

								alert(data);

							$(`#ven${id_cita}`).remove();
							citas_read();

					});


			});




				
					



	}



	function guardar_procedimiento(id_estatus,id_procedimiento){
			reference=0;
			var cantidad_p = prompt("Ingrese la cantidad de procedimiento");



			$.ajax({
				url:'metodos.php',
				type:'post',
				data:{
					agregar_procedimiento:true,
					id_estatus:id_estatus,
					id_procedimiento:id_procedimiento,
					cantidad_procedimiento:cantidad_p
				}

			}).done((resp)=>{

				console.log(resp);
				cargar_estatus();

			});


	}

	function generar_factura(id_estatus,id_factura){

					window.location= `factura.php?id_estatus=${id_estatus}&id_factura=${id_factura}`

			}

	function traer_facturas(){	

		var estatus_id = $('#id_estatus').val();
		$.ajax({
			url:'metodos.php',
			type:'post',
			data:{
				cargar_facturas:true,
				id_estatus:estatus_id

			}



		}).done((resp)=>{


		

				var data = JSON.parse(resp);
				var template="";
				data.forEach((key)=>{
					
					template+=`
						<div class='panel panel-default'>
							<div class='panel-heading'></div>
							<div class='panel-body'>
								<button class='btn btn-info' onclick='generar_factura(${key.id_estatus},${key.id_factura})'>Imprimir</button><br>
								<strong>CONCEPTO DE PAGO: ${key.concepto_pago}</strong><br>
								<strong>MONTO:${key.monto}</strong><br>
								<strong>FECHA DE PAGO:${key.fecha_pago}</strong><br>
								<strong>GANANCIA DOCTOR:${key.ganancia_doctor}</strong><br>
								<strong>GANANCIA DOCTOR:${key.ganancia_clinica}</strong><br>
								<strong>RESTO A PAGAR:${key.precio}</strong>
							</div>	
						</div>
					`;

				});

				$('#estatus_panel').append(template);

		})



	}



	function procesarPago(abono){
			reference=0;


		var monto = $('#abono_pagado').val();
		monto  = parseInt(monto);
		var tipo_de_pago = prompt("Seleccione el tipo de pago 1 -Efectivo  2 - Targeta 3 - Cheque")

		if(tipo_de_pago=="1"){

			tipo_de_pago = "efectivo";

		}else if(tipo_de_pago=="2"){

			tipo_de_pago = "targeta";

		}else if(tipo_de_pago=="3"){

			tipo_de_pago = "cheque";

		}else if(tipo_de_pago==""){

			alert("Tiene que seleccionar un tipo de pago");

			return;
		}


		$.ajax({
			url:'metodos.php',
			type:'post',
			data:{
				id_estatus:$('#id_estatus').val(),
				general_factura:true,
				abono:abono,
				monto:monto,
				type_pay:tipo_de_pago


			}


		}).done((resp)=>{

			console.log(resp);

			cargar_estatus();

		});





	}





	function create_estatus(){
			reference=0;
					$.ajax({
						url:'metodos.php',
						type:'post',
						data:{
							id_cita:$('#cita_id').val(),
							save_status:true

						}

					}).done(function(resp){

							console.log(resp);

							cargar_estatus();
					});


		}




		function  cargar_estatus(){
				reference=0;

				function dropdwon_process(){
						$.ajax({
							url:'metodos.php',
							type:'post',
							data:{
								cargar_procedimientos:true
							}


						}).done(function(reps){

							var datos = JSON.parse(reps);
							var procedimiento ="";
							var estatus = $('#id_estatus').val();

							datos.forEach(function(key){
											
											
											
											
			
								procedimiento+=`<li onclick='guardar_procedimiento(${estatus},${key.id_procedimiento})'><a style='cursor:pointer;'>${key.procedimiento} Precio:$${key.precio}</a></li>`;
								console.log(key);

							});


							$('#process_menu').html(procedimiento);
						

						});

					}

				
				$.ajax({
					url:'metodos.php',
					type:'post',
					data:{
						id_cita:$('#cita_id').val(),
						load_status:true

					}

				}).done((resp)=>{

					var data = JSON.parse(resp);
					traer_facturas();


					var template =`
					<div class='panel panel-default' id='estatus_panel'>
						<div class='panel-heading'>
						ESTATUS</div>
						<div class='panel-body'>`;
							if(data.precio==0){

								template+=`<strong style='color:green'>PAGADO COMPLETO</strong><br>`;	
							}else{

								template+=`<strong>PRECIO:$${data.precio}</strong><br>`;
							}

							template+=`
							<strong>NOMBRE DE PACIENTE: ${data.paciente}</strong><br>
							<strong>FECHA DE CITA: ${data.fecha_cita}</strong><br>
							<strong>DOCTOR: ${data.nombre} ${data.apellido}</strong><br>
							<input  type='hidden' id='id_estatus' value='${data.id_estatus}'>
							<button class='btn btn-success' onclick="procesarPago('completo')">Pago Completo</button>
							<button class='btn btn-primary' onclick='activar_abono();'>Pago Abonado</button>
							<button onclick='traer_facturas();' class='btn btn-info'>Ver facturas</button>
							<button class='btn btn-info' onclick='historial_procedimiento(${data.id_estatus})'>Ver procedimiento</button>
							<button class='btn btn-success' onclick='agregar_sub_cita(${data.id_estatus})'>Agregar sub_citas</button>
							<button class='btn btn-info' onclick='cargar_sub_citas(${data.id_estatus})' >Ver sub citas</button>

							<div class='dropdown'>
								<button class='btn btn-primary dropdown-toggle' data-toggle='dropdown'>Descuentos</button>
								<ul class='dropdown-menu'>
									<li><a style='cursor:pointer;' onclick="aplicar_descuento('a',${data.id_estatus});">Plan A</a></li>
									<li><a style='cursor:pointer;' onclick="aplicar_descuento('b',${data.id_estatus});">Plan B</a></li>
									<li><a style='cursor:pointer;' onclick="aplicar_descuento('c',${data.id_estatus});">Plan C</a></li>
									<li><a style='cursor:pointer; background:darkblue; color:white;' onclick="aplicar_descuento('d',${data.id_estatus});">Aplicar Seguro</a></li>

									<li style='background:gold'><a style='cursor:pointer;' onclick="descuento_manual(${data.id_estatus});">Descuento Manual</a></li>
								<ul>
							</div>
							<div id='base_descuento'></div>
							<div class='dropdown'><br>
								<strong>Buscar procedimiento</strong>
								<input type='text' class='form-control' id='w_procedimiento' placeholder='Buque el procedimiento'>
								<div id='procedimiento_r'></div>	
								<ul class='dropdown-menu' style='float:right' id='process_menu' onclick='dropdwon_process()'>
						
								</ul>
							</div>
							<div id='interfaz_abono' style='display:none'>
							<input id='abono_pagado' type='text' placeholder='digite el monto pagado'>
							<button class='btn btn-success'  onclick="procesarPago('abono')">OK</button>
							</div>
						</div>
					</div>
					`;


					$('#ejecutar').html(template);
					var id_estatus = $('#id_estatus').val();


					$('#w_procedimiento').keypress(function(){

							
						var datos="";
							
							$.ajax({
								url:'metodos.php',
								type:'post',
								data:{
									filtrar_procedimiento:true,
									key:$('#w_procedimiento').val()

								}
							}).done((data)=>{
									//get]
									var object_p = JSON.parse(data);
									object_p.forEach((key)=>{


											datos+=`<br><div class='panel-body' id="sp${key.id_procedimiento}" onclick="select_process(${key.id_procedimiento})">
													<div class='panel-heading'>
															<strong style='margin-left:1%;'>${key.procedimiento}<strong>
													</div>
													<button class='btn btn-success' onclick="guardar_procedimiento(${id_estatus},${key.id_procedimiento})">+Agregar Procedimiento</button>
													Costo:$ ${key.precio}|

											</div>

											<br>`;




									});

								$('#procedimiento_r').html(datos);


							});
						



					});

						



					dropdwon_process();
					cargar_facturas();


				});
	


		}





	function guardar_estatus(id_cita){
			reference=0;
		$.ajax({
			url:'metodos.php',
			type:'post',
			data:{
				action:'save_estatus',
				cita:id_cita

			}

		}).done(function(resp){

			console.log(resp);

		});

	}



	var id_s="";
		function doctor(id_doctor){

			
	 		if(id_s!=""){

	 			$(`#${id_s}`).css("background","none");
	 		}

			$('#id_doctor').val(id_doctor);

			$(`#${id_doctor}`).css("background","#00C6D7");
			id_s = id_doctor;

		}


	/*function borrar_cita(id_cita){

		$.ajax({
				url:"metodos.php",
				type:"post",
				data{
					id_eliminar:id_cita
				}


		}).done(function(resp){

				console.log(resp);

		});



	}*/

		function citas_read(){
					reference=0;
				$.ajax({
							url:'metodos.php',
							type:'post',
							data:{
				               cargar_citas_json:true,

							}


						}).done(function(resp){

								var data = JSON.parse(resp);
								citas=`<table class='table' border='1'>
								<tr>
									<th>Paciente</th>
									<th>Telefono</th>
									<th>Cedula</th>
									<th>Doctor</th>
									<th>Asunto</th>
									<th>Fecha</th>
									<th>Procesar</th>
									<th>Editar Cita</th>
									<th>Eliminar Cita</th>

								<tr>
								`;


								data.forEach((key)=>{


									citas+=`
									<tr>
										<td id='ci${key.id_cita}'>${key.paciente}</td>
										<td>${key.telefono}</td>
										<td>${key.cedula}</td>
										<td>${key.nombre} ${key.apellido}</td>
										<td>${key.asunto}</td>
										<td>${key.fecha_cita.substring(0,11)} ${key.hora_minuto}</td>
										<td><button class='btn btn-primary' onclick="process_display('${key.id_cita}')">Procesar</button></td>
										<td><button class='btn btn-info' onclick='editar_cita(${key.id_cita})'>Editar cita</button></td>
										<td><button class='btn btn-danger' onclick='eliminar_cita(${key.id_cita})' >Eliminar</button></td>
	
									</tr>
									`;


								});

								citas+=`</table>`;

								$('#ejecutar').html(citas);


						});
							
		}


	


$('document').ready(function(){


	$.ajax({
		url:'cello.txt'

	}).done((data)=>{

			if(data!=="confirmado"){
					ventana_actualizacion();
			}

	});

	$('#buscando').keypress(()=>{

		var data = $('#buscando').val();

			buscando_citas(data);
			



	});

	$('#agregar_procedimiento').click(()=>{


		var formulario_procedimiento = `
		<div>
			<strong>Nombre procedimiento</strong>
			<input type='text' id='nombre_procedimiento' class='form-control'><br>
			<strong>Precio</strong><br>
			<input type='text'  id='precio_procedimiento' class='form-control'><br>
			<button class='btn btn-primary' id='guardar_process'>Guardar procedimiento</button>
			<button class='btn btn-success' onclick='editar_procedimiento()'>Editar procedimientos</button>


		</div>
		`;
		$('#ejecutar').html(formulario_procedimiento);


		$('#guardar_process').click(()=>{
				reference=0;
				$.ajax({
					url:'metodos.php',
					type:'post',
					data:{
						save_process:true,
						nombre_procedimiento:$('#nombre_procedimiento').val(),
						precio_procedimiento:$('#precio_procedimiento').val()
					}


				}).done((resp)=>{
						
						if(resp=="success"){

							$('#ejecutar').html("<i>Procedimiento Guardado correctamente</i>");

						}

				});




		});




	});



			citas_read();	

		historial_procedimiento($('#id_estatus').val());


		$('#cita').click(function(){

			var count = 0;

			var formulario = `
			<div>
				<strong>Nombre de paciente</strong>
				<input type='text' id='paciente' class='form-control'>
					<strong>Telefono</strong>
				<input type='text' id='telefono' class='form-control'>
			<strong>Asunto</strong>
			<textarea id='asunto' class='form-control'></textarea>
			<strong>Cumple años</strong>
			<input type='date' id='hbd' class='form-control'>
			<strong>Cedula</strong>
			<input type='text' class='form-control' id='cedula'>
			<strong>Fecha de cita</strong>
			<input type='date' class='form-control' id='fecha_cita'>
			<strong>Hora de cita</strong>
			<input type='text' class='form-control' id='hora_minuto'> 
			<strong>Asignar doctor</strong>
			<input type='search' id='doctor_s' class='form-control' placeholder='Escriba el nombre del doctor'>
			<input type='hidden' id='id_doctor' >
			<div id='doctor_view'></div>
			<button class='btn btn-primary' id='guardar'>Guardar</button>
			</div>
			`;



			$('#ejecutar').html(formulario);

			/*
			$('#hora_minuto').hover(()=>{


			
				if(count==0){	
					count=1;

				var interfaz_hora= `
					<div class='panel panel-default' style='position:absolute;left:450px; top:-100px;' id='hora_select'>
						<div class='panel-heding'>Selecciona la hora</div>
						<div>
							<button class='btn btn-primary' onclick='select_hours(0)'>0</button>
							<button class='btn btn-primary' onclick='select_hours(1)'>1</button>
							<button class='btn btn-primary' onclick='select_hours(2)'>2</button><br>
							<button class='btn btn-primary' onclick='select_hours(3)'>3</button>
							<button class='btn btn-primary' onclick='select_hours(4)'>4</button>
							<button class='btn btn-primary' onclick='select_hours(5)'>5</button><br>
							<button class='btn btn-primary' onclick='select_hours(6)'>6</button>
							<button class='btn btn-primary' onclick='select_hours(7)'>7</button>
							<button class='btn btn-primary' onclick='select_hours(8)'>8</button><br>
							<button class='btn btn-primary' onclick='select_hours(9)'>9</button>
							<button class='btn btn-primary' onclick="select_hours(':')">:</button>
							<input type='text' id='interfaz_hora_r' >
							<br>
							<button class='btn btn-primary' onclick="select_hours('PM')">PM</button>
							<button class='btn btn-primary' onclick="select_hours('AM')">AM</button>

								<button class='btn btn-success'  id='aplicar'>Aplicar</button><br>
								<button class='btn btn-danger' id='cerrar_i'>Cerrar</button>
								<button class='btn btn-danger' id='cerrar_i' onclick="select_hours('remove')"><=</button>

						</div>
					</div>
				`;

				$(this).append(interfaz_hora);
				$('#cerrar_i').click(()=>{

						$('#hora_select').hide('slow',function(){

									$('#hora_select').remove();	

						});
					

				});
				$('#aplicar').click(()=>{

					$('#hora_minuto').val(caractares_i);

					$('#hora_select').remove();

				});



			}

			},()=>{
			
			});
			*/

			doctor_search();



				

				
			


				$('#guardar').click(function(){


					$.ajax({
						url:"metodos.php",
						type:"post",
						data:{	
							fecha_cita:$('#fecha_cita').val(),
							hora_minuto:$('#hora_minuto').val(),
							asunto:$('#asunto').val(),
							id_doctor:$('#id_doctor').val(),
							paciente:$('#paciente').val(),
							telefono:$('#telefono').val(),
							cedula:$('#cedula').val(),
							hbd:$('#hbd').val()

						}
					}).done(function(resp){

							console.log(resp);
							if(resp=="success"){

								$('#ejecutar').html("Cita registrada con exito");

							}
								$('#ejecutar').html("Cita registrada con exito");


					});




				});


		

		$.ajax({
			url:'metodos.php',
			type:'post',
			data:{
				cargar_procedimientos:true
			}


		}).done(function(reps){

			var datos = JSON.parse(reps);
			var procedimiento ="<select id='procedimiento_s'>";

			datos.forEach(function(key){

				procedimiento+=`<option value='${key.id_procedimiento}'>${key.procedimiento} PRECIO $${key.precio}</option>`;

			});

			procedimiento+="</select>";

			$('#lista_procedimiento').html(procedimiento);


		});


		});


		$('#citas').click(function(){

								

					citas_read();

				});


		$('#r_doctor').click(function(){


			var form = `
			<form method='post' enctype='multipart/form-data' action='metodos.php'>
				<strong>Nombre<strong>
				<input type='text' id='nombre' name='nombre' class='form-control'>
				<strong>Apellido<strong>
				<input type='text' id='apellido' name='apellido'  class='form-control'>
				<strong>DNI</strong>
				<input type='text'  id='dni' name='dni' class='form-control'>
				<strong>Clave<strong>
				<input type='password' id='clave' name='clave' class='form-control'>
				<strong>Especialidad<strong>
				<input type='text' id='especialidad' name='especialidad' class='form-control'>
				<strong>Descripcion</strong>
				<textarea name='descripcion' class='form-control'></textarea>
				<strong>Foto de perfil</strong>
				<input type='file' name='archivo' class='form-control'>
				<button class='btn btn-success'>Registrar</button>


			</form>
			`;



				$('#ejecutar').html(form);







		});


		$('#ingresos').click(()=>{

				var ingresos =`
				<div class='panel panel-default'>
					<div class='panel-heding'>Dashboard</div>
					<div class='panel-body'>
						<div id='detalles_ingreso'>
						</div>
						<div id='parametros'>
							<strong>Fecha inicial</strong>
							<input type='date' id='fecha_inicial' class='form-control'><br>
							<strong>Fecha final</strong>
							<input type='date' id='fecha_final' class='form-control'><br>
							<button class='btn btn-primary' id='fecha_process'>Ejecutar</button>
						<div>
					</div>
				</div>
				`;

			$('#ejecutar').html(ingresos);

			$.ajax({
				url:'metodos.php',
				type:'post',
				data:{
					ingresos_hoy:true
				}

			}).done((data)=>{

					$('#detalles_ingreso').html(`<strong style='font-size:28px'>Ingresos Hoy $${data}</strong>`);

			});



					$('#fecha_process').click(()=>{

							$.ajax({
								url:'metodos.php',
								type:'post',
								data:{
									ingreso_fechas:true,
									fecha_i:$('#fecha_inicial').val(),
									fecha_f:$('#fecha_final').val()
								}

							}).done((data)=>{


									$('#detalles_ingreso').html(`<strong style='font-size:28px;'>Ingresos $${data}</strong>`);

							});




				});



		});

	


});

