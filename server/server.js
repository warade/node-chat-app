const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
publicPath = path.join(__dirname, '../public');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
const port = process.env.PORT || 3000;
app.use(express.static(publicPath));

io.on('connection', (socket) => {
	console.log('User connected from server side!');
	socket.on('disconnect', () => {
		console.log('User disconnected from server side!');
	})
});

server.listen(port, () => {
	console.log(`running on port ${port}`);
});