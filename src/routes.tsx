import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { MaintenancesPlan } from './screens/MaintenancesPlan';
import { Informations } from './screens/Informations';
import { SyndicArea } from './screens/SyndicArea';
import { Home } from './screens/Home';
import { Annexes } from './screens/Annexes';

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route
        path="*"
        element={
          <Sidebar>
            <MaintenancesPlan />
          </Sidebar>
        }
      />

      <Route
        path="/"
        element={
          <Sidebar>
            <Outlet />
          </Sidebar>
        }
      >
        <Route path="/home/:buildingNanoId" element={<Home />} />
        <Route path="/maintenancesplan/:buildingNanoId" element={<MaintenancesPlan />} />
        <Route path="/informations/:buildingNanoId" element={<Informations />} />
        <Route path="/annex/:buildingNanoId" element={<Annexes />} />
        <Route path="/syndicarea/:buildingNanoId" element={<SyndicArea />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
