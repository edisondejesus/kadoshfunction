
function Edison(speed,emit){
		var speed= speed;
		var emit= $(`#${emit}`);
		


		Edison.prototype.run=function(right,end,src){


			var interval = window.setInterval(function(){
							console.log(right,end,src);

				var nex = right;

				emit.css("background-image",`url(${src})`);
			
				emit.css("background-position",`${right}px`);
				right+=right;

				if(right>=end){

					right=100;
					//emit.html("");	
					//clearInterval(interval);

				}

					


				//$(this.emit).html(this.emit);


			},speed);
				

	}

	

}