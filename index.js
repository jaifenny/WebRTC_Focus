'use strict';

//Loading dependencies & initializing express
var os = require('os');
var express = require('express');
var app = express();
var https = require('https');
//For signalling in WebRTC
var socketIO = require('socket.io');
var fs = require('fs');
var path = require('path');

app.use(express.static('public'))

app.get("/", function(req, res){
	res.render("index.ejs");
});

var sslServer = https.createServer({
  key:fs.readFileSync(path.join(__dirname,'cert','key.pem')),
  cert: fs.readFileSync(path.join(__dirname,'cert','cert.pem'))
},app);

sslServer.listen(process.env.PORT||3000);

var io = socketIO(sslServer);

io.sockets.on('connection', function(socket) {
  // Convenience function to log server messages on the client.
  // Arguments is an array like object which contains all the arguments of log(). 
  // To push all the arguments of log() in array, we have to use apply().
  function log() {
    var array = ['Message from server:'];
    array.push.apply(array, arguments);
    socket.emit('log', array);
  }

  //Defining Socket Connections
  socket.on('message', function(message, room) {
//0501-add
   var t1;
   t1=String(message);
   if(t1.includes("Ask")){
      socket.in(room).emit('Ask', room);
   }
   if(t1.includes("Sendask")){//0514
      socket.in(room).emit('Sendask',message, room);//0514
   }//0514
//0711add
   if(t1.includes("Click_focus")){
      socket.in(room).emit('Click_focus',message, room);
   }
   if(t1.includes("state_2")){
      message=String(message).split(":");
      message=message[1];
      socket.in(room).emit('state_2',message, room);
   }
   if(t1.includes("Student_num")){
      s_id=String(message).split(":");
      s_id=s_id[1];//id
      message=numClients+1;
      message=s_id+","+message;
      socket.in(room).emit('Student_num',message, room);
   }
//0711
//0717add
   if(t1.includes("q_choice")){
      message=String(message).split("q_choice");
      message=message[1];
      socket.in(room).emit('q_state',message, room);
   }
   if(t1.includes("question_1")){
      message=String(message).split("question_1: ");
      message=message[1];
      socket.in(room).emit('question_1',message, room);
   }
//0717!
   if(t1.includes("asyn_choice")){//0819
      message=String(message).split("asyn_choice");//0819
      message=message[1];//0819
      socket.in(room).emit('asyn_choice',message, room);//0819
   }
   if(t1.includes("Sendvideo")){//0809
      socket.in(room).emit('Sendvideo',message, room);//0809
   }//0809
   if(t1.includes("video_newin")){//0809
      socket.in(room).emit('video_newin',message, room);//0809
   }//0809
   if(t1.includes("asynQuestion")){//0819
      message=String(message).split("asynQuestion: ");
      message=message[1];
      socket.in(room).emit('asynQuestion',message, room);//0819
   }//0819
   if(t1.includes("asyn_newin")){//0819
      message=String(message).split("asyn_newin: ");
      message=message[1];
      socket.in(room).emit('asyn_newin',message, room);//0819
   }//0819
//0501!
   //424 log('Client said: ', message);
    log('', message,room);
    // for a real app, would be room-only (not broadcast)
    socket.in(room).emit('message', message, room);
  });

 var numClients=0,s_id;//0711
 var testid; //423!
  socket.on('create or join', function(room) {
//0423!
   testid=String(room).split(",");
   room=testid[0];
   testid=String(testid[1]);

    log('Received request to create or join room ' + room);
    var clientsInRoom = io.sockets.adapter.rooms[room];
    numClients = clientsInRoom ? Object.keys(clientsInRoom.sockets).length : 0;//0711
    log('Room ' + room + ' now has ' + numClients + ' client(s)');
    if (numClients === 0) {
      //studentID='A';
      socket.join(room);
      log('Client ID ' + socket.id + ' created room ' + room);    
      socket.emit('created', room, socket.id);
     // socket.in(room).emit('identity', numClients);//0515
    } else if (numClients === 1) {
      //studentID='B';
      log('Client ID ' + socket.id + ' joined room ' + room);    
      io.sockets.in(room).emit('join', room);
      socket.join(room);
      socket.emit('joined', room, socket.id);
      io.sockets.in(room).emit('ready');
     // socket.in(room).emit('identity', numClients);//0515
    } else { // max two clients   
	//0703add
	log('Client ID ' + socket.id + ' joined room ' + room);    
      io.sockets.in(room).emit('join', room);
      socket.join(room);
      socket.emit('joined', room, socket.id);
      io.sockets.in(room).emit('ready');
	//0703
     //0703delete socket.emit('full', room);
    }
  });
  
	socket.on('ipaddr', function() {
	  var ifaces = os.networkInterfaces();
	  for (var dev in ifaces) {
		ifaces[dev].forEach(function(details) {
		  if (details.family === 'IPv4' && details.address !== '127.0.0.1') {
			socket.emit('ipaddr', details.address);
		  }
		});
	  }
	});
 
	socket.on('bye', function(){
	  console.log('received bye');
	});
  
  });


