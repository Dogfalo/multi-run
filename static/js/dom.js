//Contains all the dom refersh functions
//Global variables
var canvasWidth;
var canvasHeight;
var user;
var images;

var music;
var musicList = ['sound/airbrushed.mp3', 'sound/blackout_city.mp3'];
var menuMusic = new Audio("sound/koji_pocket.mp3");
var socket;

$(document).ready(function(){
	images = new Images();
	usr = new User();
	initSock();
	checkLogin();
});

//loads the login page
function loadLogin() {
	removeHammer();
	var username = $("<input>").attr("type","text").attr("id","login_username").attr("placeholder","Username");
	var password = $("<input>").attr("type","password").attr("id","login_password").attr("placeholder","Password");

	var login = $("<div>").html("Log In").attr("id","login_button").addClass("button");
	var register = $("<div>").html("Register").attr("id","register_button").addClass("button");

	var content_area = $("#content_area");
 	content_area.empty();

 	content_area.append(username);
 	content_area.append(password);
 	content_area.append(login);
 	content_area.append(register);

 	var navbar = $('#navbar');
 	navbar.empty();

 	//Add touch listeners
 	$("#login_button").hammer().on("tap", startLogin);
 	$("#register_button").hammer().on("tap", startRegister);
}

//loads the menu
function loadMenu() {
	removeHammer();
	// Load menu music and loop it
	menuMusic.addEventListener('ended', function() {
    	this.currentTime = 0;
    	this.play();
	}, false);
	menuMusic.play();

 	var menu = $("<ul>");
 	menu.append($("<li>").html("Create A Game").attr("id","create_game_button"));
 	menu.append($("<li>").html("Join A Game").attr("id", "join_game_button"));
 	menu.append($("<li>").html("Profile").attr("id","profile_button"));

 	var content_area = $("#content_area");
 	content_area.empty();
 	content_area.append(menu);

 	// Create navbar
 	var navbar = $('#navbar');
 	navbar.empty();
 	var settings_button = $("<img>").attr("src", "images/gear.png").attr('id', 'settings_button').height('30px').width('30px');
 	var logout = $("<div>").html("logout").attr("id","logout_button").addClass("button");

 	navbar.append(settings_button);
 	navbar.append(logout);

 	//Add touch listeners
 	$("#logout_button").hammer().on("tap", startLogout);
 	$("#create_game_button").hammer().on("tap", loadCreateGame);
 	$("#join_game_button").hammer().on("tap", loadFindGame);
 	$("#profile_button").hammer().on("tap", loadProfile);
 	$("#settings_button").hammer().on("tap", loadSettings);
}

//loads the canvas and init the game
function loadCanvas(players_init, lobby_name) {
	removeHammer();

	canvasWidth = $(window).width();
	canvasHeight = $(window).height();

	var c = $("<canvas>").attr({id:"myCanvas", width:canvasWidth, height:canvasHeight}).html("Cannot Load!");

	$("body").html(c);

	initGame(players_init, lobby_name);
}

function loadCreateGame() {
	removeHammer();
 	//UI
 	//Content area
	var create_lobby = $("<div>").html("Create Lobby").attr("id","create_lobby_button").addClass("button");
	var lobby_name_input = $("<input>").attr("type","text").attr("id","lobby_name").attr("placeholder","Lobby Name");

	var content_area = $("#content_area");
	content_area.empty();
	content_area.append(lobby_name_input);
	content_area.append(create_lobby);

	//Navbar
 	var back_button = $("<div>").html("back").attr("id", "back_button").addClass("button");

 	var navbar = $('#navbar');
 	navbar.empty();
 	navbar.append(back_button);

 	//Add touch listeners
	$("#back_button").hammer().on("tap", loadMenu);
 	$("#create_lobby_button").hammer().on("tap", function(){
 		var	lobby_name = $("#lobby_name").val();
 		socket.emit('create_lobby',{'username': usr.name, 'lobby_name': lobby_name, 'charNum': usr.charNum});
 	});
}

function loadFindGame() {
	removeHammer();
	//UI
 	var lobby_name_input = $("<input>").attr("type","text").attr("id","lobby_name").attr("placeholder","Lobby Name");
 	var join_lobby = $("<div>").html("Join Lobby").attr("id","join_lobby_button").addClass("button");

 	var content_area = $("#content_area");
 	content_area.empty();
 	content_area.append(lobby_name_input);
 	content_area.append(join_lobby);

 	//navbar
 	var back_button = $("<div>").html("back").attr("id", "back_button").addClass("button");

 	var navbar = $('#navbar');
 	navbar.empty();
 	navbar.append(back_button);

 	//Touch 
	$("#back_button").hammer().on("tap", loadMenu);
	$("#join_lobby_button").hammer().on("tap", function(){
 		socket.emit('join_lobby',{'username': usr.name, 'lobby_name': $("#lobby_name").val(), 'charNum': usr.charNum});
 	});
}

function loadLobby(data) {
	removeHammer();
	var title = $("<h1>").html(data.lobby_name + " Waiting for players");
	var lobby_name = $("<h2>").html("Lobby: " + data.lobby_name);
	var players_count = $("<h2>").html("Players: " + String(data.players_init.length) + "/4").attr("id", "count");
	var start_game = $("<div>").html("Ready").attr("id","ready_button").addClass("button");
	var players = $("<ul>").attr("id", "players");

	for(var i = 0; i < data.players_init.length; i++){
		var player = $("<li>").html(data.players_init[i].name);
		player.addClass(data.players_init[i].status);
		players.append(player);
	}

	var content_area = $("#content_area");
	content_area.empty();
	content_area.append(title);
	content_area.append(lobby_name);
	content_area.append(players_count);
	content_area.append(players);
	content_area.append(start_game);

	//Navbar
 	var back_button = $("<div>").html("back").attr("id", "back_button").addClass("button");

 	var navbar = $('#navbar');
 	navbar.empty();
 	navbar.append(back_button);

	$("#ready_button").hammer().on("tap", function(){
		socket.emit('ready_game', {'lobby_name': usr.lobby_name, 'username': usr.name});
	});
	$("#back_button").hammer().on("tap", function(){
		socket.emit('leave_lobby', {'username': usr.name, 'lobby_name': usr.lobby_name});
		loadMenu();
	});
}

//loads the profile
function loadProfile() {
	removeHammer();
 	var username = $("<div>").html("Username: " + usr.name);

 	//Back Button
 	var back_button = $("<div>").html("back").attr("id", "back_button").addClass("button");
 
 	var content_area = $("#content_area");
 	content_area.empty();
	$("#content_area").append(back_button);
	$("#content_area").append(username);

	var back_button = $("<div>").html("back").attr("id", "back_button").addClass("button");

 	var navbar = $('#navbar');
 	navbar.empty();
 	navbar.append(back_button);

	$("#back_button").hammer().on("tap", loadMenu);
}

//loads the settings
function loadSettings() {
	removeHammer();
	
	var content_area = $("#content_area");
	content_area.empty();

	var back_button = $("<div>").html("back").attr("id", "back_button").addClass("button");
 	var navbar = $('#navbar');
 	navbar.empty();
 	navbar.append(back_button);

	$("#back_button").hammer().on("tap", loadMenu);
}

function showNotification(message) {
	var notification = $("<div>").addClass("notification").html($("<p>").html(message));
	$("body").append(notification);
	notification.hide();
	notification.slideDown(200, function() { // Fade in and then after 2 seconds, fade out
		setTimeout(function() { notification.slideUp(400, function() {$("div").remove(".notification")})}, 2000);
	});
}

//Loads title and content area
function loadContent() {
	removeHammer();
	var navbar = $("<div>").attr("id","navbar");
	var title = $("<h1>").html("Multi-Run");
	var content_area = $("<div>").attr("id","content_area");
	var body = $("body");

	body.empty();
	body.append(navbar);
	body.append(title);
	body.append(content_area);
}

function removeHammer(){
	$("#login_button").hammer().off("tap");
	$("#register_button").hammer().off("tap");
	$("#logout_button").hammer().off("tap");
	$("#create_game_button").hammer().off("tap");
	$("#join_game_button").hammer().off("tap");
	$("#profile_button").hammer().off("tap");
	$("#settings_button").hammer().off("tap");
	$("#create_lobby_button").hammer().off("tap");
	$("#back_button").hammer().off("tap");
	$("#join_lobby_button").hammer().off("tap");
	$("#start_button").hammer().off("tap");
}