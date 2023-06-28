import { io } from 'socket.io-client';
import { store } from '../store/store'; // import your Redux store
import { setLobbyCode, setHostSocketID, setPlayerSocketId } from '../store/slices/landingPageSlices/lobbySlice';
import { setRounds, setPlayerNumber, setCategories, setPlayers, setGuestGameCategories } from '../store/slices/gameSlices/gameSettingSlice';
import {
	setQuestion,
	setAnswers,
	setIsChosen,
	setChosenCategory,
	setChosenPoints,
	newQuestionSelected,
	setRightAnswer,
	setEveryoneAnswered,
	setLeaderboard,
} from '../store/slices/gameSlices/gameSlice';
import { setRoute } from '../store/slices/routeSlice';

class SocketManager {
	constructor() {
		// *** Here we initialize and configure our socket.io connection ***
		// const URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:80/api/';
		const URL = process.env.REACT_APP_BACKEND_URL || 'https://triviosa-backend-4250240969d4.herokuapp.com/api';
		console.log(URL);
		// this.socket = io(`${URL}game`, {
		// 	autoConnect: false,
		// 	debug: true,
		// });
		this.socket = io('https://triviosa-backend-4250240969d4.herokuapp.com/api/game', {
			autoConnect: false,
			debug: true,
		});

		this.loggingEnabled = null;

		/**
		 * * Socket.io event listeners
		 * * Here we set up our socket.io event listeners
		 * * For each event that we want to listen for, we define a callback function
		 * * that will be executed when the event is received
		 */

		this.socket.on('error', (data) => {
			if (this.loggingEnabled) {
				console.error('[Event Listener] Socket.io error event:', data);
			}
		});

		this.socket.on('connected', (data) => {
			if (this.loggingEnabled) {
				console.log('[Event Listener] Socket.io connected event:', data);
			}
			// console.log(data.message);
		});

		this.socket.on('disconnect', (data) => {
			if (this.loggingEnabled) {
				console.log('[Event Listener] Socket.io disconnect event:', data);
			}
		});

		this.socket.on('reconnect', (data) => {
			if (this.loggingEnabled) {
				console.log('[Event Listener] Socket.io reconnect event:', data);
			}
		});

		this.socket.on('playerLeft', (data) => {
			if (this.loggingEnabled) {
				console.log('[Event Listener] Socket.io playerLeft event:', data);
			}
			// TODO: Add your implementation here
			store.dispatch(setPlayerSocketId(data.playerId));
		});

		this.socket.on('updatedHost', (data) => {
			if (this.loggingEnabled) {
				console.log('[Event Listener] Socket.io updatedHost event:', data);
			}
			store.dispatch(setHostSocketID(data.newHost));
		});

		this.socket.on('updatedRounds', (data) => {
			if (this.loggingEnabled) {
				console.log('[Event Listener] Socket.io updatedRounds event:', data);
			}
			// TODO: Add your implementation here
		});

		this.socket.on('updatedPlayerNumber', (data) => {
			if (this.loggingEnabled) {
				console.log('[Event Listener] Socket.io updatedPlayerNumber event:', data);
			}
			// TODO: Add your implementation here
		});

		this.socket.on('updateExtension', (data) => {
			if (this.loggingEnabled) {
				console.log('[Event Listener] Socket.io updateExtension event:', data);
			}
			console.log('updateExtension Event');
			// TODO: Add your implementation here
		});

		this.socket.on('resetLobby', (data) => {
			if (this.loggingEnabled) {
				console.log('[Event Listener] Socket.io resetLobby event:', data);
			}
			console.log('resetLobby Event');
			// TODO: Add your implementation here
		});

		this.socket.on('gameFinished', (data) => {
			if (this.loggingEnabled) {
				console.log('[Event Listener] Socket.io gameFinished event:', data);
			}
			store.dispatch(setRoute('/scoreboard'));
			store.dispatch(setLeaderboard(data.leaderboard));
			// TODO: Add your implementation here
		});

		this.socket.on('gameExtended', (data) => {
			if (this.loggingEnabled) {
				console.log('[Event Listener] Socket.io gameExtended event:', data);
			}
			// TODO: Add your implementation here
		});

		this.socket.on('roundFinished', (data) => {
			if (this.loggingEnabled) {
				console.log('[Event Listener] Socket.io roundFinished event:', data);
			}
			// TODO: Add your implementation here
		});

		this.socket.on('synchronizedLobby', (data) => {
			if (this.loggingEnabled) {
				console.log('[Event Listener] Socket.io error event:', data);
			}
			store.dispatch(setPlayers(data.data));
		});

		this.socket.on('gameCreated', (data) => {
			if (this.loggingEnabled) {
				console.log('[Event Listener] Socket.io gameCreated event:', data);
			}
			store.dispatch(setLobbyCode(data.gameId));
			store.dispatch(setCategories(data.settings.list));
			store.dispatch(setPlayerNumber(data.settings.playerNumber));
			store.dispatch(setRounds(data.settings.rounds));
			store.dispatch(setHostSocketID(data.socketId));
			store.dispatch(setPlayers([{ socketId: data.socketId, playerName: data.hostName }]));
		});

		this.socket.on('startedGame', (data) => {
			if (this.loggingEnabled) {
				console.log('[Event Listener] Socket.io startedGame event:', data);
			}
			store.dispatch(setGuestGameCategories(data.list));
			store.dispatch(setRoute('/pointSelection'));
		});

		this.socket.on('joinedLobby', (data) => {
			if (this.loggingEnabled) {
				console.log('[Event Listener] Socket.io joinedLobby event:', data);
			}
			store.dispatch(setPlayers(data.settings.lobbyMember));
			store.dispatch(setPlayerSocketId(data.socketId));
			store.dispatch(setCategories(data.settings.list));
		});

		this.socket.on('playerJoined', (data) => {
			if (this.loggingEnabled) {
				console.log('[Event Listener] Socket.io playerJoined event:', data);
			}
			store.dispatch(setPlayers([{ socketId: data.playerId, playerName: data.playerName }]));
		});

		this.socket.on('givenQuestion', (data) => {
			if (this.loggingEnabled) {
				console.log('[Event Listener] Socket.io givenQuestion event:', data);
			}
			store.dispatch(setQuestion(data.question));
			store.dispatch(setAnswers(data.allAnswers));
			store.dispatch(setIsChosen(true));
			store.dispatch(setChosenCategory(data.category));
			store.dispatch(setChosenPoints(data.difficulty));
			store.dispatch(newQuestionSelected());
			store.dispatch(setRoute('/quiz'));
		});

		this.socket.on('playerAnswered', (data) => {
			if (this.loggingEnabled) {
				console.log('[Event Listener] Socket.io playerAnswered event:', data);
			}
			store.dispatch(setPlayerSocketId(data.playerId));
		});

		this.socket.on('roundFinished', (data) => {
			if (this.loggingEnabled) {
				console.log('[Event Listener] Socket.io roundFinished event:', data);
			}
			store.dispatch(setRightAnswer(data.rightAnswer));
			store.dispatch(setEveryoneAnswered(!data.everyoneAnswered)); // !everyoneAnswered
			store.dispatch(setRounds(data.roundsLeft));
			store.dispatch(setRoute('/pointSelection'));
		});
	}

	// *** Socket.io event emitters ***

	connect() {
		if (this.loggingEnabled) {
			console.log('[Event Emitter] Socket.io connect event');
		}
		this.socket.connect();
	}

	disconnect() {
		if (this.loggingEnabled) {
			console.log('[Event Emitter] Socket.io disconnect event');
		}
		this.socket.disconnect();
	}

	createGame(playerName, token) {
		if (this.loggingEnabled) {
			console.log('[Event Emitter] Socket.io createGame event:', { playerName, token });
		}
		this.socket.emit('createGame', { playerName, token });
	}

	joinLobby(lobbyCode, ign, accessToken) {
		if (this.loggingEnabled) {
			console.log('[Event Emitter] Socket.io joinLobby event:', { lobbyCode, ign, accessToken });
		}
		this.socket.emit('joinLobby', {
			gameId: lobbyCode,
			playerName: ign,
			token: accessToken || undefined,
		});
	}

	// TODO: Add your implementation here
	updateHost() {
		if (this.loggingEnabled) {
			console.log('[Event Emitter] Socket.io updateHost event');
		}
		this.socket.emit('updateHost');
	}

	// TODO: Add your implementation here
	setRounds(rounds) {
		if (this.loggingEnabled) {
			console.log('[Event Emitter] Socket.io setRounds event:', { rounds });
		}
		this.socket.emit('setRounds', { rounds });
	}

	// TODO: Add your implementation here
	setPlayerNumber(playerNumber) {
		if (this.loggingEnabled) {
			console.log('[Event Emitter] Socket.io setPlayerNumber event:', { playerNumber });
		}
		this.socket.emit('setPlayerNumber', { playerNumber });
	}

	startGame(gameCategories) {
		if (this.loggingEnabled) {
			console.log('[Event Emitter] Socket.io startGame event:', { gameCategories });
		}
		this.socket.emit('startGame', { list: gameCategories });
	}

	giveQuestion(chosenCategory, chosenPoints) {
		if (this.loggingEnabled) {
			console.log('[Event Emitter] Socket.io giveQuestion event:', { chosenCategory, chosenPoints });
		}
		this.socket.emit('giveQuestion', { category: chosenCategory, difficulty: chosenPoints });
	}

	setAnswer(answer) {
		if (this.loggingEnabled) {
			console.log('[Event Emitter] Socket.io setAnswer event:', { answer });
		}
		this.socket.emit('setAnswer', { answer });
	}

	// TODO: Add your implementation here
	setExtension() {
		if (this.loggingEnabled) {
			console.log('[Event Emitter] Socket.io setExtension event');
		}
		this.socket.emit('setExtension');
	}

	// TODO: Add your implementation here
	newGame() {
		if (this.loggingEnabled) {
			console.log('[Event Emitter] Socket.io newGame event');
		}
		this.socket.emit('newGame');
	}

	// TODO: Add your implementation here
	lobbySynchro(dataToSend) {
		if (this.loggingEnabled) {
			console.log('[Event Emitter] Socket.io lobbySynchro event:', { dataToSend });
		}
		this.socket.emit('lobbySynchro', dataToSend);
	}

	// Additional methods for enabling/disabling logging

	enableLogging() {
		this.loggingEnabled = true;
	}

	disableLogging() {
		this.loggingEnabled = false;
	}
}

// We export a new instance of the SocketManager class
// This means that whenever we import this file, we'll be working with the same SocketManager instance
// This is important because we want to have a single socket.io connection that's used throughout our app
const socketManager = new SocketManager();

export default socketManager;
