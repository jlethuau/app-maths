import { FC } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { GameProvider } from './context/GameContext';
import { SplashScreen } from './pages/SplashScreen';
import { NewHomePage } from './pages/NewHomePage';
import { SettingsPage } from './pages/SettingsPage';
import { GamePage } from './pages/GamePage';
import { StatsPage } from './pages/StatsPage';
import { BadgesPage } from './pages/BadgesPage';

export const App: FC = () => {
  return (
    <BrowserRouter>
      <AppProvider>
        <GameProvider>
          <Routes>
            <Route path="/" element={<SplashScreen />} />
            <Route path="/home" element={<NewHomePage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/game" element={<GamePage />} />
            <Route path="/stats" element={<StatsPage />} />
            <Route path="/badges" element={<BadgesPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </GameProvider>
      </AppProvider>
    </BrowserRouter>
  );
};
