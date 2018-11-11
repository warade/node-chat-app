const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

var {generateMessage} = require('./utils/message');
publicPath = path.join(__dirname, '../public');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
const port = process.env.PORT || 3000;
app.use(express.static(publicPath));

io.on('connection', (socket) => {
	console.log('User connected from server side!');
	socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app!'));
	socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined!'));
	socket.on('createMessage', (message) => {
		console.log('createMessage', message);
		io.emit('newMessage', generateMessage(message.from, message.text));
		// socket.broadcast.emit('newMessage', {
		// 	from: message.from,
		// 	text: message.text,
		// 	createdAt: new Date().getTime()
		// });
	});
	socket.on('disconnect', () => {
		console.log('User disconnected from server side!');
	});
});

server.listen(port, () => {
	console.log(`running on port ${port}`);
});