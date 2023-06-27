import { io } from 'socket.io-client';
import { store } from '../store/store'; // import your Redux store
import { setLobbyCode, setHostSocketID, setPlayerSocketId } from '../store/slices/landingPageSlices/lobbySlice';
import { setRounds, setPlayerNumber, setCategories, setPlayers, setGuestGameCategories } from '../store/slices/gameSlices/gameSettingSlice';
import { setQuestion, setAnswers, setIsChosen, setChosenCategory, setChosenPoints, newQuestionSelected, setRightAnswer, setEveryoneAnswered } from '../store/slices/gameSlices/gameSlice';
import { setRoute } from '../store/slices/routeSlice';

class SocketManager {
	constructor() {
		// Here we initialize and configure our socket.io connection
		// const localDevUrl = 'http://localhost:80/api/game';
		// const productionUrl = 'https://triviosa-backend-4250240969d4.herokuapp.com/api/game';
		const URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:80/api/';

		this.socket = io(`${URL}game`, {
			autoConnect: false,
			debug: true,
		});

		// Here we set up our socket.io event listeners
		// For each event that we want to listen for, we define a callback function
		// that will be executed when the event is received

		// This listener is for the 'error' event
		this.socket.on('error', (error) => {
			console.error('Socket.io error:', error);
		});

		// This listener is for the 'connected' event
		this.socket.on('connected', (data) => {
			// We dispatch a Redux action in response to the event
			console.log(data.message);
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

		// this.socket.on("gameEnded", (data) => {
		//     console.log("gameEnded Event");
		//     console.log(data);
		//     store.dispatch(setRoute("/endScreen"));
		// });
		// More listeners can be added here in a similar manner
		// Just use the `this.socket.on` method to set up the listener
		// and define a callback function to handle the event
	}

	connect() {
		// Connect the socket
		this.socket.connect();
	}

	setAnswer(answer) {
		this.socket.emit('setAnswer', { answer: answer });
	}

	// This is a method that we can call to emit a socket.io event
	// In this case, it's a 'createGame' event, but you can define methods for any events you need to emit
	createGame(playerName, token) {
		this.socket.emit('createGame', { playerName, token });
	}

	startGame(gameCategories) {
		this.socket.emit('startGame', { list: gameCategories });
	}

	// More methods can be added here to emit other events
	// Just define a new method and use `this.socket.emit` to send the event

	joinLobby(lobbyCode, ign, accessToken) {
		this.socket.emit('joinLobby', {
			gameId: lobbyCode,
			playerName: ign,
			token: accessToken || undefined,
		});
	}

	giveQuestion(chosenCategory, chosenPoints) {
		this.socket.emit('giveQuestion', { category: chosenCategory, difficulty: chosenPoints });
	}

	lobbySync(dataToSend) {
		this.socket.emit('lobbySynchro', dataToSend);
	}
}

// We export a new instance of the SocketManager class
// This means that whenever we import this file, we'll be working with the same SocketManager instance
// This is important because we want to have a single socket.io connection that's used throughout our app
export default new SocketManager();
