import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import SiteLayout from './components/SiteLayout';
import HomePage from './pages/HomePage';
import LineIdentityPage from './pages/LineIdentityPage';
import InterstellarMissionPage from './pages/InterstellarMissionPage';
import GeometricBaseMissionPage from './pages/GeometricBaseMissionPage';

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/games/line-identity" element={<LineIdentityPage />} />
          <Route path="/games/interstellar" element={<InterstellarMissionPage />} />
          <Route path="/games/geometric-base" element={<GeometricBaseMissionPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;
