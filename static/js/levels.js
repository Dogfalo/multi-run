		//Levels Data
		//Each one contains the data in the first index, and allowable pieces to be placed next to it on the second index


		//Joins together pieces and returns an array of all the completed pieces. 
		function check_level(levels){
			// console.log(levels);
			//Check if the pieces can fit together, raise error 
			for (var i = 0; i < levels.length; i++){
				// console.log("i =", i);
				// console.log(levels[i]);
				// console.log(levels[i+1][2][0]);
				// console.log(levels[i][1][0]);
				// console.log("df");
				// console.log(levels[i+1][2][0].indexOf(levels[i][1][0]));
				if (levels[i+1][2][0].indexOf(levels[i][1][0]) === -1){
				 	// console.log("Error in Level Design: Illegal Level Design")
				 	return false;
				}
			return true;
			}  
		}

		function create_level(levels){
			var piece_size = 4;
			var level_array;
			var level_0 = new Array();
			var level_1 = new Array();
			var level_2 = new Array();
			var level_3 = new Array();
			var level_4 = new Array();
			var level_5 = new Array();
			var level_6 = new Array();
			var level_7 = new Array();
			if (check_level(levels)){
				// console.log("Attempting to join level...");
				// console.log("Size of Level = ", levels.length);
				for (var i = 0; i < levels.length; i++){
					// console.log(levels[i][0].slice(0, piece_size));
					level_0.push(levels[i][0].slice(0, piece_size));
					// console.log("level 0 = ", level_0);
					// console.log(level_0);
					level_1.push(levels[i][0].slice(4, piece_size+4));
					level_2.push(levels[i][0].slice(8, piece_size+8));
					level_3.push(levels[i][0].slice(12, piece_size+12));
					level_4.push(levels[i][0].slice(16, piece_size+16));
					level_5.push(levels[i][0].slice(20, piece_size+20));
					level_6.push(levels[i][0].slice(24, piece_size+24));
					level_7.push(levels[i][0].slice(28, piece_size+28));
				}
				// console.log(level_0.toString());
				level_array = level_0.concat(level_1, level_2, level_3, level_4, level_5, level_6, level_7);
				level_array = [].concat.apply([], level_array);
				return level_array;
			}
			else {
				// console.log("Error in creating level");
			}
		}

		var flat = new Array();
		flat[0] = [0, 0, 0, 0,
					0, 0, 0, 0,
					0, 0, 0, 0,
					0, 0, 0, 0,
					0, 0, 0, 0,
					0, 0, 0, 0,
					1, 1, 1, 1, 
					1, 1, 1, 1];
		flat[1] = ["flat"];
		flat[2] = ["flat","ramp_up", "ramp_flat", "ramp_down", "hole", "underpass", "platform", "step_up", "jump"];
		// console.log(flat);

		var ramp_up = new Array();
		ramp_up[0] = [0, 0, 0, 0,
					0, 0, 0, 0,
					0, 0, 0, 0,
					0, 0, 0, 1,
					0, 0, 1, 1,
					0, 1, 1, 1,
					1, 1, 1, 1, 
					1, 1, 1, 1];

		ramp_up[1] = ["flat", "hole", "underpass", "platform", "step_up", "step_down", "step_platform" ];

		var ramp_flat = new Array();
		ramp_flat[0] = [0, 0, 0, 0,
					0, 0, 0, 0,
					0, 0, 0, 0,
					1, 1, 1, 1,
					1, 1, 1, 1,
					1, 1, 1, 1,
					1, 1, 1, 1, 
					1, 1, 1, 1];

		var ramp_hole = new Array();
		ramp_hole[0] = [0, 0, 0, 0,
					0, 0, 0, 0,
					0, 0, 0, 0,
					0, 1, 1, 0,
					0, 0, 0, 0,
					0, 0, 0, 0,
					0, 0, 0, 0, 
					0, 0, 0, 0];

		var ramp_down = new Array();
		ramp_down[0] = [0, 0, 0, 0,
					0, 0, 0, 0,
					0, 0, 0, 0,
					1, 0, 0, 0,
					1, 1, 0, 0,
					1, 1, 1, 0,
					1, 1, 1, 1, 
					1, 1, 1, 1];

		var hole = new Array();
		hole[0] = [0, 0, 0, 0,
					0, 0, 0, 0,
					0, 0, 0, 0,
					0, 0, 0, 0,
					0, 0, 0, 0,
					0, 0, 0, 0,
					1, 0, 0, 1, 
					1, 0, 0, 1];

		var underpass = new Array();
		underpass[0] = [0, 0, 0, 0,
						 0, 0, 0, 0,
						 0, 0, 0, 0,
						 1, 1, 1, 1,
						 1, 1, 1, 1,
						 0, 0, 0, 0,
						 1, 1, 1, 1, 
						 1, 1, 1, 1];

		var platform = new Array();
		platform[0] = [0, 0, 0, 0,
						0, 0, 0, 0,
						0, 0, 0, 0,
						0, 0, 0, 0,
						1, 1, 1, 1,
						0, 0, 0, 0,
						1, 1, 1, 1, 
						1, 1, 1, 1];

		var step_up = new Array();
		step_up[0] =  [0, 0, 0, 0,
						0, 0, 0, 0,
						0, 0, 0, 0,
						0, 0, 1, 1,
						1, 1, 0, 0,
						0, 0, 0, 0,
						0, 0, 0, 0, 
						0, 0, 0, 0];

		var step_down = new Array();
		step_down[0] = [0, 0, 0, 0,
					0, 0, 0, 0,
					0, 0, 0, 0,
					1, 1, 0, 0,
					0, 0, 1, 1,
					0, 0, 0, 0,
					0, 0, 0, 0, 
					0, 0, 0, 0];


		var step_platform = new Array();
		step_platform[0] = [0, 0, 0, 0,
					0, 0, 0, 0,
					0, 0, 0, 0,
					1, 1, 1, 1,
					0, 0, 0, 0,
					0, 0, 0, 0,
					0, 0, 0, 0, 
					0, 0, 0, 0];


		var jump = new Array();
		jump[0] = [0, 0, 0, 0,
					0, 0, 0, 0,
					0, 0, 0, 0,
					0, 0, 0, 0,
					0, 0, 0, 0,
					0, 1, 1, 0,
					1, 1, 1, 1, 
					1, 1, 1, 1];

		// console.log([flat]);
		var Level_1 = create_level([flat, flat, flat, flat, flat, flat]);
		// console.log("Level_1 = ", Level_1);