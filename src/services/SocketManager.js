import { io } from 'socket.io-client';
import { store } from '../store/store'; // import your Redux store
import { setLobbyCode, setHostSocketID, setPlayerSocketId } from '../store/slices/landingPageSlices/lobbySlice';
import { setRounds, setPlayerNumber, setCategories, setPlayers, setGuestGameCategories } from '../store/slices/gameSlices/gameSettingSlice';
import { setQuestion, setAnswers, setIsChosen, setChosenCategory, setChosenPoints, newQuestionSelected, setRightAnswer, setEveryoneAnswered } from '../store/slices/gameSlices/gameSlice';
import { setRoute } from '../store/slices/routeSlice';

class SocketManager {
	constructor() {
		// *** Here we initialize and configure our socket.io connection ***
		const URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:80/api/';

		this.socket = io(`${URL}game`, {
			autoConnect: false,
			debug: true,
		});

		/**
		 * * Socket.io event listeners
		 * * Here we set up our socket.io event listeners
		 * * For each event that we want to listen for, we define a callback function
		 * * that will be executed when the event is received
		 */

		this.socket.on('error', (error) => {
			console.error('Socket.io error:', error);
		});

		this.socket.on('connected', (data) => {
			console.log(data.message);
		});

		this.socket.on('disconnect', (reason) => {
			console.log('disconnect Event');
			console.log(reason);
		});

		this.socket.on('reconnect', (attemptNumber) => {
			console.log('reconnect Event');
			console.log(attemptNumber);
		});

		// this.socket.on('lobbyMemberUpdated', (data) => {
		// 	console.log('lobbyMemberUpdated Event');
		// 	// TODO: Add your implementation here
		// });

		this.socket.on('playerLeft', (data) => {
			console.log('playerLeft Event');
			// TODO: Add your implementation here
		});

		this.socket.on('updatedHost', (data) => {
			console.log('updatedHost Event');
			// TODO: Add your implementation here
		});

		this.socket.on('updatedRounds', (data) => {
			console.log('updatedRounds Event');
			// TODO: Add your implementation here
		});

		this.socket.on('updatedPlayerNumber', (data) => {
			console.log('updatedPlayerNumber Event');
			// TODO: Add your implementation here
		});

		this.socket.on('updateExtension', (data) => {
			console.log('updateExtension Event');
			// TODO: Add your implementation here
		});

		this.socket.on('resetLobby', (data) => {
			console.log('resetLobby Event');
			// TODO: Add your implementation here
		});

		this.socket.on('gameFinished', (data) => {
			console.log('gameFinished Event');
			// TODO: Add your implementation here
		});

		this.socket.on('gameExtended', (data) => {
			console.log('gameExtended Event');
			// TODO: Add your implementation here
		});

		this.socket.on('roundFinished', (data) => {
			console.log('roundFinished Event');
			// TODO: Add your implementation here
		});

		this.socket.on('synchronizedLobby', (data) => {
			console.log('synchronizedLobby Event');
			// TODO: Add your implementation here
		});

		this.socket.on('gameCreated', (data) => {
			console.log('SocketManager gameCreated:');
			console.log(data);
			store.dispatch(setLobbyCode(data.gameId));
			store.dispatch(setCategories(data.settings.list));
			store.dispatch(setPlayerNumber(data.settings.playerNumber));
			store.dispatch(setRounds(data.settings.rounds));
			store.dispatch(setHostSocketID(data.socketId));
			store.dispatch(setPlayers([{ socketId: data.socketId, playerName: data.hostName }]));
		});

		this.socket.on('startedGame', (data) => {
			console.log('Started Game Event');
			store.dispatch(setGuestGameCategories(data.list));
			store.dispatch(setRoute('/pointSelection'));
		});

		this.socket.on('joinedLobby', (data) => {
			console.log('Joined Lobby Event');
			store.dispatch(setPlayers(data.settings.lobbyMember));
			console.log(data.socketId);
			store.dispatch(setPlayerSocketId(data.socketId));
			store.dispatch(setCategories(data.settings.list));
		});

		this.socket.on('playerJoined', (data) => {
			console.log('Player Joined Event');
			store.dispatch(setPlayers([{ socketId: data.playerId, playerName: data.playerName }]));
		});

		this.socket.on('givenQuestion', (data) => {
			console.log('givenQuestion Event');
			store.dispatch(setQuestion(data.question));
			store.dispatch(setAnswers(data.allAnswers));
			store.dispatch(setIsChosen(true));
			store.dispatch(setChosenCategory(data.category));
			store.dispatch(setChosenPoints(data.difficulty));
			store.dispatch(newQuestionSelected());
			store.dispatch(setRoute('/quiz'));
		});

		this.socket.on('playerAnswered', (data) => {
			console.log('playerAnswered Event');
			console.log(data);
		});

		this.socket.on('roundFinished', (data) => {
			console.log('roundFinished Event');
			console.log(data);
			store.dispatch(setRightAnswer(data.rightAnswer));
			store.dispatch(setEveryoneAnswered(!data.everyoneAnswered)); // !everyoneAnswered
			store.dispatch(setRounds(data.roundsLeft));
		});

		this.socket.on('synchronizedLobby', (data) => {
			console.log('synchronizedLobby Event');
			console.log(data);
			store.dispatch(setPlayers(data.data));
		});
	}

	// *** Socket.io event emitters ***
	connect() {
		this.socket.connect();
	}

	disconnect() {
		this.socket.disconnect();
	}

	createGame(playerName, token) {
		this.socket.emit('createGame', { playerName, token });
	}

	joinLobby(lobbyCode, ign, accessToken) {
		this.socket.emit('joinLobby', {
			gameId: lobbyCode,
			playerName: ign,
			token: accessToken || undefined,
		});
	}

	// TODO: Add your implementation here
	updateHost() {
		this.socket.emit('updateHost');
	}

	// TODO: Add your implementation here
	setRounds(rounds) {
		this.socket.emit('setRounds', { rounds: rounds });
	}

	// TODO: Add your implementation here
	setPlayerNumber(playerNumber) {
		this.socket.emit('setPlayerNumber', { playerNumber: playerNumber });
	}

	startGame(gameCategories) {
		this.socket.emit('startGame', { list: gameCategories });
	}

	giveQuestion(chosenCategory, chosenPoints) {
		this.socket.emit('giveQuestion', { category: chosenCategory, difficulty: chosenPoints });
	}

	setAnswer(answer) {
		this.socket.emit('setAnswer', { answer: answer });
	}

	// TODO: Add your implementation here
	setExtension() {
		this.socket.emit('setExtension');
	}

	// TODO: Add your implementation here
	newGame() {
		this.socket.emit('newGame');
	}

	// TODO: Add your implementation here
	lobbySynchro(dataToSend) {
		this.socket.emit('lobbySynchro', dataToSend);
	}
}

// We export a new instance of the SocketManager class
// This means that whenever we import this file, we'll be working with the same SocketManager instance
// This is important because we want to have a single socket.io connection that's used throughout our app
const socketManager = new SocketManager();

export default socketManager;
