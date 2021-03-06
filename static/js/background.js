function Background() {
	this.clouds = new Array();
	this.cloudSpawnTime = 10;
	this.mountains = new Array();
	this.mountainSpawnTime = 15;
	this.backgroundImg = new Image();
	this.backgroundImg.src = 'images/background.png'; // gradient start: a9c2ff | gradient end: 7391d5

	this.update = function() {
		//Cloud stuff
		//Check for and delete clouds that have moved off screen
		for(var i = 0; i < this.clouds.length;){
			if((this.clouds[i].x + this.clouds[i].w) < 0) {
				this.clouds.splice(i,1);
			} else {
				this.clouds[i].update();
				i++;
			}
		}
		//Add clouds at a reasonable frequency
		if(this.clouds.length < 4 && this.cloudSpawnTime === 0 && Math.random() > 0.9) {
			//Random type 0-1
			var type = Math.floor((Math.random()*2));
			//Random size 1-2
			var size = Math.floor((Math.random()*2)+1);
			this.clouds.push(new Cloud(type, size));
			this.cloudSpawnTime = 100;
		}
		if(this.cloudSpawnTime > 0){
			this.cloudSpawnTime--;
		}

		//mountain stuff
		//Check for and delete mountains that have moved off screen
		for (var i = 0; i < this.mountains.length;){
			if((this.mountains[i].x + this.mountains[i].w) < 0) {
				this.mountains.splice(i, 1);
			}
			else {
				this.mountains[i].update();
				i++;
			}
		}

		//Add mountains at a reasonable frequency
		if(this.mountains.length < 3 && this.mountainSpawnTime === 0 && Math.random() > 0.9) {
			//Random type 0-2
			var type = Math.floor((Math.random()*3));
			//Random size 1-2
			var size = (Math.random())+1;
			this.mountains.push(new Mountain(type, size));
			this.mountainSpawnTime = 100;
		}
		if(this.mountainSpawnTime > 0){
			this.mountainSpawnTime--;
		}
	}

	this.draw = function() {
		ctx.save();
		//background
		ctx.fillStyle = ctx.createPattern(this.backgroundImg, 'repeat-x');
		ctx.fillRect(0, 0, canvasWidth, canvasHeight);

		//mountains
		for(var i in this.mountains){
			this.mountains[i].draw();
		}

		//clouds
		for(var i in this.clouds){
			this.clouds[i].draw();
		}

		ctx.restore();
	}
}