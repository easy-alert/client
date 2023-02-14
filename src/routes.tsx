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
        <Route path="/maintenancesplan" element={<MaintenancesPlan />} />
        <Route path="/informations" element={<Informations />} />
        <Route path="/buildingmanager" element={<BuildingManagerArea />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
