import { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { GameProvider } from './context/GameContext';
import { HomePage } from './pages/HomePage';
import { GamePage } from './pages/GamePage';

export const App: FC = () => {
  return (
    <BrowserRouter>
      <AppProvider>
        <GameProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/game" element={<GamePage />} />
          </Routes>
        </GameProvider>
      </AppProvider>
    </BrowserRouter>
  );
};
