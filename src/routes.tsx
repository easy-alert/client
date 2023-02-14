import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { MaintenancesPlan } from './screens/MaintenancesPlan';
import { Informations } from './screens/Informations';
import { BuildingManagerArea } from './screens/BuildingManagerArea';

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
        <Route path="/maintenancesplan/:buildingId" element={<MaintenancesPlan />} />
        <Route path="/informations/:buildingId" element={<Informations />} />
        <Route path="/buildingmanager/:buildingId" element={<BuildingManagerArea />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
