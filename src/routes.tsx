import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { MaintenancesPlan } from './screens/MaintenancesPlan';
import { Informations } from './screens/Informations';
import { BuildingManagerArea } from './screens/BuildingManagerArea';
import { TokenValidator } from './auth/tokenValidator';

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route
        path="*"
        element={
          <Sidebar>
            <TokenValidator />
          </Sidebar>
        }
      />

      <Route
        path="/"
        element={
          <Sidebar>
            <TokenValidator />
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
