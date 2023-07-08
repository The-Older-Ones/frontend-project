import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/landingPageComponents/LandingPage';
import LobbyPageLayout from './components/lobbyComponents/LobbyPageLayout';
import PointSelectionPageLayout from './components/pointSelectionComponents/PointSelectionPageLayout';
import ErrorPage from './components/errorPageComponents/ErrorPage';
import { QuizPage } from './components/quizPageComponent/QuizPage';
import { ScoreboardPage } from './components/scoreboardPage/ScoreboardPage';
import socketManager from './services/SocketManager';

function App() {
	/**
	 * * This useEffect hook is used to connect the socket.io client to the server
	 * * and enable logging for socket.io events
	 */
	useEffect(() => {
		socketManager.connect();
		socketManager.enableLogging();
	}, []);

	return (
		<div className='App'>
			<Routes>
				<Route path='/' element={<LandingPage />} />
				<Route path='/lobby' element={<LobbyPageLayout />} />
				<Route path='/pointSelection' element={<PointSelectionPageLayout />} />
				<Route path='/quiz' element={<QuizPage />} />
				<Route path='/scoreboard' element={<ScoreboardPage />} />
				<Route path='*' element={<ErrorPage />} />
			</Routes>
		</div>
	);
}

export default App;
