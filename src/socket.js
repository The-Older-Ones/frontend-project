import { io } from 'socket.io-client';

const socket = io('http://localhost:80/api/game', {
	autoConnect: false,
});

// Connect the Socket.io client
socket.connect();

// Listen for the 'connect' event
socket.on('connected', (data) => {
	console.log(data.message);
});

socket.on('gameCreated', function (data) {
	console.log(data.gameId);
	console.log(data.socketId);
	console.log(data.playerName);
});

export default socket;
