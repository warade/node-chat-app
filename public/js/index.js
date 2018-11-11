var socket = io();
socket.on('connect', function () {
	console.log('User connected from client side!');
});
socket.on('disconnect', function () {
	console.log('User disconnected from client side!');
});
socket.on('newMessage', function (message) {
	console.log('New message!', message);
});