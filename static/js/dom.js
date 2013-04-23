//Contains all the dom refersh functions
//Global variables
var canvasWidth;
var canvasHeight;

$(document).ready(function(){
	loadLogin();
});

//loads the login page
function loadLogin() {
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

 	//Add touch listeners
 	$("#login_button").hammer().on("tap", startLogin);
 	$("#register_button").hammer().on("tap", startRegister);
}

//loads the menu
function loadMenu() {
 	var menu = $("<ul>");
 	menu.append($("<li>").html("Create Lobby").attr("id","create_lobby_button"));
 	menu.append($("<li>").html("Join Lobby").attr("id", "join_lobby_button"));
 	menu.append($("<li>").html("Profile").attr("id","profile_button"));
 	menu.append($("<li>").html("Settings").attr("id","settings_button"));

 	var logout = $("<div>").html("logout").attr("id","logout_button").addClass("button");

 	var content_area = $("#content_area");
 	content_area.empty();
 	content_area.append(logout);
 	content_area.append(menu);

 	//Add touch listeners
 	$("#logout_button").hammer().on("tap", startLogout);
 	$("#create_lobby_button").hammer().on("tap", createLobby);
 	$("#join_lobby_button").hammer().on("tap", joinLobby);
 	$("#profile_button").hammer().on("tap", loadProfile);
 	$("#settings_button").hammer().on("tap", loadSettings);
}

//loads the canvas and init the game
function loadCanvas() {
 	$("body").html("Loaded!");

	canvasWidth = $(window).width();
	canvasHeight = $(window).height();

	var c = $("<canvas>").attr({id:"myCanvas", width:canvasWidth, height:canvasHeight}).html("Cannot Load!");

	$("body").html(c);

	initGame();
}

function createLobby() {

}

function joinLobby() {
	var menu = $("<ul>");
	var username = $("<div>").html("Username: " + usr);
	var chatbox = $("<form>").html("")
	
	menu.empty();
	menu.append($("<li>").html("Play").attr("id","play_button"));
	
	var back_button = $("<div>").html("back").attr("id", "back_button").addClass("button");
	
	var content_area = $("#content_area");
 	content_area.empty();
 	content_area.append(back_button);
 	content_area.append(menu);
 	content_area.append(chatbox);


	//Touch
	$("#back_button").hammer().on("tap", loadMenu);
	$("#play_button").hammer().on("tap", loadCanvas);
}

//loads the profile
function loadProfile() {
 	var username = $("<div>").html("Username: " + usr);

 	//Back Button
 	var back_button = $("<div>").html("back").attr("id", "back_button").addClass("button");
 
 	var content_area = $("#content_area");
 	content_area.empty();
	$("#content_area").append(back_button);
	$("#content_area").append(username);

	$("#back_button").hammer().on("tap", loadMenu);
}

//loads the settings
function loadSettings() {
	//Back Button
	var back_button = $("<div>").html("back").attr("id", "back_button").addClass("button");
	
	var content_area = $("#content_area");
	content_area.empty();
	$("#content_area").append(back_button);

	$("#back_button").hammer().on("tap", loadMenu);
}

function showNotification(message) { // type is "green" or "red"
  var notification = $("<div>").addClass("notification").html($("<p>").html(message));
  $("body").append(notification);
  notification.hide();
  notification.fadeIn(200, function() { // Fade in and then after 2 seconds, fade out
    setTimeout(function() { notification.fadeOut(400, function() {$(this).remove})}, 2000);
  });
}