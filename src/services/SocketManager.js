import { io } from 'socket.io-client';
import { store } from '../store/store'; // import your Redux store
import { setLobbyCode, setHostSocketID, setPlayerSocketId, setHost } from '../store/slices/landingPageSlices/lobbySlice';
import { setRounds, setPlayerNumber, setCategories, setPlayers, setGuestGameCategories, setCurrentPlayerIndex, setAvatarUpdate } from '../store/slices/gameSlices/gameSettingSlice';
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
	setGameFinished,
} from '../store/slices/gameSlices/gameSlice';
import { setRoute } from '../store/slices/routeSlice';
import { toast } from 'react-toastify';

class SocketManager {
	constructor() {
		// *** Here we initialize and configure our socket.io connection ***
		// const URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:80/api/';
		const URL = process.env.REACT_APP_BACKEND_URL || 'https://triviosa-backend-4250240969d4.herokuapp.com/api';
		console.log(URL);

		this.socket = io('https://triviosa-backend-4250240969d4.herokuapp.com/api/game', {
			autoConnect: false,
			debug: true,
		});

		this.loggingEnabled = null;

		this.avatarIndex = 0;

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

			if (data.message === 'Lobby is full') {
				toast.error('Lobby is full. You will get redirected.', {
					position: 'top-center',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: 'light',
				});
				store.dispatch(setRoute('/'));
			}
		});

		this.socket.on('connected', (data) => {
			if (this.loggingEnabled) {
				console.log('[Event Listener] Socket.io connected event:', data);
			}
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

		// TODO: Add your implementation here
		this.socket.on('playerLeft', (data) => {
			if (this.loggingEnabled) {
				console.log('[Event Listener] Socket.io playerLeft event:', data);
			}
			store.dispatch(setPlayerSocketId(data.playerId));
		});

		// TODO: Add your implementation here
		this.socket.on('updatedHost', (data) => {
			if (this.loggingEnabled) {
				console.log('[Event Listener] Socket.io updatedHost event:', data);
			}
			store.dispatch(setHostSocketID(data.newHost));
		});

		// TODO: Add your implementation here
		this.socket.on('updatedRounds', (data) => {
			if (this.loggingEnabled) {
				console.log('[Event Listener] Socket.io updatedRounds event:', data);
			}
			store.dispatch(setRounds(data.rounds));
		});

		// TODO: Add your implementation here
		this.socket.on('updatedPlayerNumber', (data) => {
			if (this.loggingEnabled) {
				console.log('[Event Listener] Socket.io updatedPlayerNumber event:', data);
			}
			store.dispatch(setPlayerNumber(data.playerNumber))
		});

		// TODO: Add your implementation here
		this.socket.on('updateExtension', (data) => {
			if (this.loggingEnabled) {
				console.log('[Event Listener] Socket.io updateExtension event:', data);
			}
		});

		// TODO: Add your implementation here
		this.socket.on('resetLobby', (data) => {
			if (this.loggingEnabled) {
				console.log('[Event Listener] Socket.io resetLobby event:', data);
			}
		});

		this.socket.on('gameFinished', (data) => {
			if (this.loggingEnabled) {
				console.log('[Event Listener] Socket.io gameFinished event:', data);
			}
			store.dispatch(setGameFinished(true));
			store.dispatch(setRightAnswer(data.rightAnswer));
			store.dispatch(setEveryoneAnswered(true));
			store.dispatch(setLeaderboard(data.leaderboard));
			store.dispatch(setRoute('/scoreboard'));
		});

		// TODO: Add your implementation here
		this.socket.on('gameExtended', (data) => {
			if (this.loggingEnabled) {
				console.log('[Event Listener] Socket.io gameExtended event:', data);
			}
		});

		this.socket.on('gameCreated', (data) => {
			if (this.loggingEnabled) {
				console.log('[Event Listener] Socket.io gameCreated event:', data);
			}
			store.dispatch(setLobbyCode(data.gameId));
			store.dispatch(setCategories(data.settings.list));
			store.dispatch(setPlayerNumber(data.settings.playerNumber));
			store.dispatch(setRounds(data.settings.rounds));
			store.dispatch(setHost(true));
			store.dispatch(setPlayerSocketId(data.socketId));
			store.dispatch(setPlayers([{ socketId: data.socketId, playerName: data.hostName, avatarIndex: this.avatarIndex }]));
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
			data.settings.lobbyMember.forEach(player => {
				if(player.socketId == this.socket.id){
					player.avatarIndex = this.avatarIndex
				}
			});
			store.dispatch(setPlayers(data.settings.lobbyMember));
			store.dispatch(setRounds(data.settings.rounds));
			store.dispatch(setPlayerNumber(data.settings.playerNumber));
			store.dispatch(setPlayerSocketId(data.socketId));
			store.dispatch(setCategories(data.settings.list));
			this.socket.emit("lobbySynchro", { flag: 'SYNC_AVATAR', data: { socketId: this.socket.id, avatarIndex: this.avatarIndex } })
		});

		this.socket.on('playerJoined', (data) => {
			if (this.loggingEnabled) {
				console.log('[Event Listener] Socket.io playerJoined event:', data);
			}
			store.dispatch(setPlayers([{ socketId: data.playerId, playerName: data.playerName }]));
			this.socket.emit("lobbySynchro", { flag: 'SYNC_AVATAR', data: { socketId: this.socket.id, avatarIndex: this.avatarIndex } })
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

		// TODO: Add your implementation here
		this.socket.on('playerAnswered', (data) => {
			if (this.loggingEnabled) {
				console.log('[Event Listener] Socket.io playerAnswered event:', data);
			}
		});

		this.socket.on('roundFinished', (data) => {
			if (this.loggingEnabled) {
				console.log('[Event Listener] Socket.io roundFinished event:', data);
			}

			// Retrieve the current state of the game from the store
			let state = store.getState().gameSettings;
			let currentPlayerIndex = state.currentPlayerIndex;
			let players = state.players;

			// Increment the currentPlayerIndex, and reset to 0 if we've gone through all players
			currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
			store.dispatch(setCurrentPlayerIndex(currentPlayerIndex));

			store.dispatch(setRightAnswer(data.rightAnswer));
			store.dispatch(setEveryoneAnswered(!data.everyoneAnswered)); // !everyoneAnswered
			store.dispatch(setRounds(data.roundsLeft));
			store.dispatch(setLeaderboard(data.leaderboard));
			store.dispatch(setRoute('/pointSelection'));
		});

		this.socket.on('synchronizedLobby', (data) => {
			console.log(data);
			if (this.loggingEnabled) {
				console.log('[Event Listener] Socket.io error event:', data);
			}
			if (data.flag === 'GAME_CATEGORIES') {
				store.dispatch(setGuestGameCategories(data.data));
			}
			if (data.flag === 'SYNC_PLAYER_LIST') {
				store.dispatch(setPlayers(data.data));
			}
			if (data.flag === 'SYNC_AVATAR') {
				store.dispatch(setAvatarUpdate(data.data));
			}
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

	createGame(playerName, token, avatarIndex) {
		if (this.loggingEnabled) {
			console.log('[Event Emitter] Socket.io createGame event:', { playerName, token });
		}
		this.avatarIndex = avatarIndex;
		this.socket.emit('createGame', { playerName, token });
	}

	joinLobby(lobbyCode, ign, accessToken, avatarIndex) {
		if (this.loggingEnabled) {
			console.log('[Event Emitter] Socket.io joinLobby event:', { lobbyCode, ign, accessToken });
		}
		this.avatarIndex = avatarIndex;
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
