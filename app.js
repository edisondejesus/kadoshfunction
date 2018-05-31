
Vue.component('cabezera',{



	template:`<div class='row'>
		<div class='col-md-12' style='background:darkblue; height:80px; color:white;'>
			<strong>Odontology Powerful<strong>
		<div>

	</div>
	`,


});

Vue.component('login',{
	
	props:['cambiar'],

	template:`
	<div class='panel panel-default'>
		<div class='panel-heading'>Inicar Session</div>
		<div class='panel-body'>
			<input type='text' id='usuario' class='form-control'><br>
			<input type='password' id='clave' class='form-control'>
			<button class='btn btn-primary'>Login</button>
		</div>
	</div>

	`,
});




Vue.component('citas',{
	props:['data'],

	template:`
	<div>
	<div class="panel panel-default">	
		<div class="panel-body">
			<div class="panel-heading"><strong>Asunto:</strong>{{ data.asunto}}<br> <strong>Horario:</strong> {{data.hora_minuto}} |
				<strong>Paciente:</strong> {{data.paciente}}
			</div>
			<button class="btn btn-primary" v-on:click="">Procesesar</button>
					</div>
				</div>
	</div >

	`,


});


Vue.component('estatus',{


	props:['data'],
	template:`
	<div class='panel panel-default'>
		<div class='panel-heading'>estatus</div>
		<div class='panel-body'>

		</div>

	</div>
	`,

});


    new Vue({
		el:'#app',
		created:function(){

			this.cargar_citas();

		},
		data:{
			consultas:[{asunto:'tratamiento de canales'}],
			doctores:'',
			nalgas:0
		},
		methods:{

			cargar_citas:function(){

				$.ajax({
					url:'metodos.php',
					type:'post',
					data:{
						cargar_citas_json:true,
					}

				}).done((resp)=>{


					var json = JSON.parse(resp);


					this.consultas= json;
				});

			
			},
			estatus:function(){


					alert("hola");
			}

		},



	});


