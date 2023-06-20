import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/landingPageComponents/LandingPage';
import LobbyPageLayout from './components/lobbyComponents/LobbyPageLayout';
import PointSelectionPageLayout from './components/pointSelectionComponents/PointSelectionPageLayout';
import { QuizPage } from './components/quizPageComponent/QuizPage';

function App() {
	return (
		<div className='App'>
			<Routes>
				<Route path='/' element={<LandingPage />} />
				<Route path='/lobby' element={<LobbyPageLayout />} />
				<Route path='/pointSelection' element={<PointSelectionPageLayout />} />
				<Route path='/quiz' element={<QuizPage />} />
			</Routes>
		</div>
	);
}

export default App;
