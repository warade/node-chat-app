const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

var {generateMessage, generateLocationMessage} = require('./utils/message');
var {isRealString} = require('./utils/validation');
var {Users} = require('./utils/users');
publicPath = path.join(__dirname, '../public');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
const port = process.env.PORT || 3000;
app.use(express.static(publicPath));
var users = new Users();

io.on('connection', (socket) => {
	console.log('User connected from server side!');
	// socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app!'));
	// socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined!'));
	
	socket.on('join', (params, callback) => {
		if(!isRealString(params.name) || !isRealString(params.room)) {
			return callback('Name and Room name are required!');
		}
		socket.join(params.room);
		users.removeUser(socket.id);
		users.addUser(socket.id, params.name, params.room);
		io.to(params.room).emit('updateUserList', users.getUserList(params.room));
		socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app!'));
		socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined!`));
		callback();
	});

	socket.on('createMessage', (message, callback) => {
		var user = users.getUser(socket.id);
		if(user && isRealString(message.text)) {
			io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
		}
		callback();
	});
	socket.on('createLocationMessage', (coords) => {
		var user = users.getUser(socket.id);
		if(user) {
			io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
		}
	});
	socket.on('disconnect', () => {
		var user = users.removeUser(socket.id);
		if(user) {
			io.to(user.room).emit('updateUserList', users.getUserList(user.room));
			io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left!`));
		}
		console.log('User disconnected from server side!');
	});
});

server.listen(port, () => {
	console.log(`running on port ${port}`);
});