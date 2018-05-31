$('document').ready(function(){
var rojo=0;
var amarillo=0;
var verde = 0;
var upgrade=0;
var config;

		
 
	$.ajax({
		url:'config.json',
		type:'post'
	
	}).done(function(resp){
	
		//loading
		var config = resp;
		function broken(){
			var sound = soundManager.createSound({
		   		    	url:`${config.items[0].sonido}`,
		  				volume:100
		   		   });	
			sound.play();
		}



		function squad(){


		   squad.prototype.squad_red=function(number){

		   		    if($(`#post${number}`).attr("class")){
		   		    		console.log("slot en uso..");
		   		    }else{
		   		    	rojo++;
		   		    	var sound = soundManager.createSound({url:`${config.efectos[0].sonido}`,volume:100});	
		   		    	$("#Puntos_rojo").html(rojo);
		   		  
		   		    	var squad_r = $(`#post${number}`);
						squad_r.css("background-image",`url(${config.items[0].imagen_item})`);
						squad_r.addClass("activo");
						squad_r.click(function(){
						squad_r.onclick=function(){

							console.log("ups");
						}


							broken();
						$(`#post${number}`).html("");
						if(rojo>0){
						rojo--;
						}
						if(upgrade==0){
								score++;
								$('#socre').html(score);
						}else{


						}

						$("#Puntos_rojo").html(rojo);
		   		    
							squad_r.css("background","");
							squad_r.removeClass("activo");
							



						});



		   		    } 			
		   }

		   	squad.prototype.squad_green=function(number){

		   		    if($(`#post${number}`).attr("class")){
		   		    		console.log("slot en uso..");
		   		    }else{
		   		    	verde++;
		   		    	var sound = soundManager.createSound({url:`${config.efectos[0].sonido}`,volume:100});	
		   		    	$("#Puntos_verde").html(verde);
		   		         var sound_green =	sound.play();
		   		    	var squad_v = $(`#post${number}`);
						squad_v.css("background-image",`url(${config.items[1].imagen_item})`);
						squad_v.addClass("activo");
						squad_v.click(function(){
							broken();
						if(verde>0){
						verde--;
						if(upgrade==""){
								score++;
								$('#socre').html(score);
						}

						}
						$("#Puntos_verde").html(verde);
					
							squad_v.css("background","");
							squad_v.removeClass("activo");
						});



		   		    }

		   			

		   }


		   	squad.prototype.squad_yellow=function(number){

		   		    if($(`#post${number}`).attr("class")){
		   		    		console.log("slot en uso..");
		   		    }else{
		   		    	amarillo++;
		   		    	var sound = soundManager.createSound({url:`${config.efectos[0].sonido}`,volume:100});	
		   		    	$("#Puntos_yellow").html(amarillo);
		   		    	sound.play();
		   		    	var squad_a = $(`#post${number}`);
						squad_a.css("background-image",`url(${config.items[2].imagen_item})`);
						squad_a.addClass("activo");
						squad_a.click(function(){
						if(amarillo>0){
						amarillo--;
						if(upgrade==""){
								score++;
								$('#score').html(score);
						}

						}
						$("#Puntos_amarilllo").html(amarillo);
							broken();			

							squad_a.css("background","");
							squad_a.removeClass("activo");
						});



		   		    }

		   			

		   }





				

				
		} 

		var  red_prod= 	window.setInterval(function(){

				var cuadro_rojo  = new squad();
				

		
					cuadro_rojo.squad_red(aleatorio(0,29));

			
			},1000);

		var green_prod = window.setInterval(function(){

				var cuadro_green = new squad();
				cuadro_green.squad_green(aleatorio(0,29));



		},900);


		var  yellow_prod= window.setInterval(function(){

				var cuadro_amarillo = new squad();
				cuadro_amarillo.squad_yellow(aleatorio(0,29));


		},850);





				//checke over

			var evaluador_over =setInterval(function(){

					if(rojo==6 || verde==6 || amarillo==6){

							console.log("game over");
							clearInterval(red_prod);
							clearInterval(green_prod);
							clearInterval(yellow_prod);
							clearInterval(evaluador_over);

					}


				},500);





	});




});