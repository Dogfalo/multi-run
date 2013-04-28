var mongo = require('mongodb');

global.mongoConfig = {
    host: 'dbh85.mongolab.com',
    port: 27857,
    dbName: 'multirun'
}

// ========================
// ==== Express server ====
// ========================

var express = require("express");
var app = express();

// ========================
// === Socket.io server ===
// ========================

var util = require("util")
var io = require('socket.io').listen(8888);
var clients = new Object();
var lobby_names = new Object();
var private_lobby_list = new Array();
var public_lobby_list = [{'name': 'Alpha', 'players': []}, {'beta': 'Alpha', 'players': []}];

// Tell socket io to listen for new connections
io.sockets.on("connection", function(socket)
    //Create Lobby
    socket.on('create_lobby', function(data) {
        if(!isPrivateLobby(data.lobby_name)){
            var player = {'name': data.username, 'id': socket.id};
            var lobby = {'name': data.lobby_name, 'players': [player], 'status': 'waiting'};

            socket.join(data.lobby_name);
            socket.emit('create_lobby_status', {'success': true, 'lobby_name': data.lobby_name, 'players': private_lobby_list[ private_lobby_list.push(lobby)-1].players,'player_id': 1});
        } else {
            socket.emit('create_lobby_status', {'success': false, 'reason': "Lobby name already exist"});
        }
    });

    //Start Game
    socket.on('start_game', function(data) {
        console.log(data)
    });

    //Join lobby
    socket.on('join_lobby', function(data){
        var status = getPrivateLobby(data);
        if(status >= 0){
            //Succesfully joined lobby
            var player = {'name': data.username, 'id': socket.id};
            socket.join(data.lobby_name);
            socket.emit('join_status', {'success': true, 'players': private_lobby_list[status].players, 'player_id': private_lobby_list[status].players.push(player)});
            io.sockets.in(data.lobby_name).emit('lobby_update',{'players': private_lobby_list[status].players});
        }else if (status === -1){
            //Lobby full
            socket.emit('join_status', {'success': false, 'reason': "Lobby full"});
        }else if (status === -2){
            //Lobby doesn't exist
            socket.emit('join_status', {'success': false, 'reason': "Lobby doesn't exist"});
        }
    });

    //Leave lobby
    socket.on('leave_lobby', function(data) {

    });
});

var getRooms = function() {
 return Object.keys(io.sockets.manager.rooms);
}

var playerCount = function(room) {
    return io.sockets.clients(room).length;
}

// get array of clients in a room
var getClientsInRoom = function(socketId, room){
    // get array of socket ids in this room
    var socketIds = io.sockets.manager.rooms['/' + room];
    var clients = [];
 
    if(socketIds && socketIds.length > 0){
        // push every client to the result array
        for(var i = 0, len = socketIds.length; i < len; i++){
            // check if the socket is not the requesting
            // socket
            if(socketIds[i] != socketId){
                clients.push(chatClients[socketIds[i]]);
            }
        }
    }
    return clients;
}

function getPrivateLobby(data) {
    for(var i = 0; i < private_lobby_list.length; i++){
        if(private_lobby_list[i].name === data.lobby_name){
            if(private_lobby_list[i].players.length > 4){
                //No space in lobby
                console.log(private_lobby_list[i].players.length);
                return -2;
            }
            return i;
        }
    }
    //No such lobby
    return -1;
}

//returns true if the lobby name is in the provate lobby list
function isPrivateLobby(name){
    for(var i = 0; i < private_lobby_list.length; i++){
        if(private_lobby_list[i].name === name){
            return true;
        }
    }
    return false;
}


// ========================
// === MongoDB ===
// ========================

var mongoExpressAuth = require('mongo-express-auth');

mongoExpressAuth.init({
    mongo: { 
        host: global.mongoConfig.host,
        port: global.mongoConfig.port,
        dbName: global.mongoConfig.dbName,
        usrName: 'app',
        pwd: 'Mc20467y',
        collectionName: 'accounts'
    }
}, function(){
       console.log('ready on port 3000');
       app.listen(3000);
});

app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({ secret: 'r-))wvhta+#4@tw1mie8+k&o*uj0)h$mi2#&5*rn-gby%7^pk)' }));
app.use('/', express.static(__dirname + '/static/'));

//===========================
//  routes
//===========================


//This is for debugging purposes
//Delete before release
app.get('/me', function(req, res){
    mongoExpressAuth.checkLogin(req, res, function(err){
        if (err)
            res.send(err);
        else {
            mongoExpressAuth.getAccount(req, function(err, result){
                if (err)
                    res.send(err);
                else 
                    res.send(result);
            });
        }
    });
});

app.post('/login', function(req, res){
    mongoExpressAuth.login(req, res, function(e){
        if (e)
            res.send(e);
        else {
            mongoExpressAuth.getAccount(req, function(err, result){
                if (err)
                    res.send(err);
                else {
                    res.send({
                        "username": result.username,
                        "success": true
                    });
                }
            });
        }
    });
});

app.post('/logout', function(req, res){
    mongoExpressAuth.logout(req, res);
    res.send({"success": true});
});

app.post('/register', function(req, res){
    mongoExpressAuth.register(req, function(err){
        if (err)
            res.send(err);
        else
            res.send({"success": true});
    });
});