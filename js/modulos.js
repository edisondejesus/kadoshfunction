

	var control_f=false;

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


				$('#interfaz_abono').show('slow');

	

	}

	function  editar_cita(id_cita){


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
				<strong>Asunto</strong>
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

		$.ajax({
			url:'metodos.php',
			type:'post',
			data:{
				aplicar_descuento:true,
				tipo:tipo,
				id_estatus:id_estatus	

			}


		}).done((data)=>{

			alert(data);

			cargar_estatus();

		});


	}

	function eliminar_procedimiento(id_procedimiento){

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
									<th>Doctor</th>
									<th>Asunto</th>
									<th>Fecha</th>
									<th>Procesar</th>
									<th>Editar Cita</th>

								<tr>
								`;


								data.forEach((key)=>{


									citas+=`
									<tr>
										<td>${key.paciente}</td>
										<td>${key.telefono}</td>
										<td>${key.nombre} ${key.apellido}</td>
										<td>${key.asunto}</td>
										<td>${key.fecha_cita} ${key.hora_minuto}</td>
										<td><button class='btn btn-primary' onclick="location.href='process.php?id=${key.id_cita}';">Procesar</button></td>
										<td><button class='btn btn-info' onclick='eliminar_cita(${key.id_cita})'>Editar Cita</button></td>

									</tr>
									`;


								});

								citas+=`</table>`;

								$('#ejecutar').html(citas);


						});










	}


	function historial_procedimiento(id_estatus){

		$.ajax({
			url:'metodos.php',
			type:'post',
			data:{

				load_process:true,
				id_estatus:id_estatus
			}


		}).done((data)=>{

			var datos = JSON.parse(data);
		
			var procedimientos = `<div class='panel panel-default' id='process_list'>`;

			datos.forEach((key)=>{	

					procedimientos+=`<div class='panel-body'>
						<strong>Procedimiento ${key.procedimiento}</strong><br>
						<strong>Precio ${key.precio}</strong>
						<button class='btn btn-danger' onclick="remover_procedimiento('${key.id_hostorial}','${key.precio}');">Remover</button>
					</div>`;

			});



			procedimientos+=`</div>`;

			if($('#process_list').val())
			$('#process_list').remove();


			$('#ejecutar').append(procedimientos);

		});



	}





	function remover_procedimiento(id_historial,precio){


		$.ajax({
			url:'metodos.php',
			type:'post',
			data:{
				remover_procedimiento:true,
				id_historial:id_historial,
				cantidad:precio
			}

		}).done((data)=>{

				console.log(data);
				cargar_estatus();
		});




	}


	function eliminar_cita(id_cita){

			alertify.confirm("Seguro que deseas eliminar esta cita?",()=>{

					$.ajax({
						url:'metodos.php',
						type:'post',
						data:{
							eliminar_cita:true,
							id_cita:id_cita

						}


					}).done(function(data){

							alertify.success(data);



					});





			},
			()=>{



			}
			);




	}



	function guardar_procedimiento(id_estatus,id_procedimiento){

			$.ajax({
				url:'metodos.php',
				type:'post',
				data:{
					agregar_procedimiento:true,
					id_estatus:id_estatus,
					id_procedimiento:id_procedimiento
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
		


		var monto = $('#abono_pagado').val();
		monto  = parseInt(monto);

		$.ajax({
			url:'metodos.php',
			type:'post',
			data:{
				id_estatus:$('#id_estatus').val(),
				general_factura:true,
				abono:abono,
				monto:monto


			}


		}).done((resp)=>{

			console.log(resp);

			cargar_estatus();

		});





	}





	function create_estatus(){

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
								<ul>
							</div>
							<div class='dropdown'>
							<button class='btn btn-primary dropdown-toggle' data-toggle='dropdown'>+ procedimiento</button>		
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
					dropdwon_process();
					cargar_facturas();


				});
	


		}





	function guardar_estatus(id_cita){

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
									<th>Doctor</th>
									<th>Asunto</th>
									<th>Fecha</th>
									<th>Procesar</th>
									<th>Editar Cita</th>
								<tr>
								`;


								data.forEach((key)=>{


									citas+=`
									<tr>
										<td>${key.paciente}</td>
										<td>${key.telefono}</td>
										<td>${key.nombre} ${key.apellido}</td>
										<td>${key.asunto}</td>
										<td>${key.fecha_cita} ${key.hora_minuto}</td>
										<td><button class='btn btn-primary' onclick="location.href='process.php?id=${key.id_cita}';">Procesar</button></td>
										<td><button class='btn btn-info' onclick='editar_cita(${key.id_cita})'>Editar cita</button></td>

									</tr>
									`;


								});

								citas+=`</table>`;

								$('#ejecutar').html(citas);


						});
							
		}


	


$('document').ready(function(){

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

			
			$('#hora_minuto').hover(()=>{

				function select_hours(dato){
						alert('mierda!!');

						$('#interfaz_hora_r').val(dato);

				}

			
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
							<button class='btn btn-primary' onclick="select_hours(":")">:</button>
							<input type='text' id='interfaz_hora_r' >
							<br>
							<button class='btn btn-primary'>PM</button>
							<button class='btn btn-primary'>AM</button>

								<button class='btn btn-success'>Aplicar</button><br>
								<button class='btn btn-danger'>Cerrar</button>



						</div>
					</div>
				`;

				$(this).append(interfaz_hora);
			}

			},()=>{
			
			});
			

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
							telefono:$('#telefono').val()

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

