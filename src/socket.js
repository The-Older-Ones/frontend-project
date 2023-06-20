// import { useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
// import { setSocketID, setLobbyCode } from './store/slices/landingPageSlices/socketSlice';

const socketURL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:80/api/game';
const socketRouterURL = process.env.REACT_APP_SOCKET_ROUTER_URL;
const socket = io('http://localhost:80/api/game', {
	autoConnect: false,
	debug: true,
});

// Connect the Socket.io client
socket.connect();

socket.on('error', (error) => {
	console.error('Socket.io error:', error);
});

// Listen for the 'connect' event
socket.on('connected', (data) => {
	console.log(data.message);
});

// socket.on('gameCreated', function (data) {
// 	const dispatch = useDispatch();
// 	console.log('TEST gameCreated');
// 	console.log(data.gameId);
// 	dispatch(setLobbyCode(data.gameId));
// 	console.log(data.socketId);
// 	dispatch(setSocketID(data.socketId));
// 	console.log(data.playerName);
// });

export default socket;
