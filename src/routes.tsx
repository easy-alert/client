import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { MaintenancePlan } from './screens/MaintenancePlan';
import { Informations } from './screens/Informations';
import { BuildingManagerArea } from './screens/BuildingManagerArea';

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route
        path="*"
        element={
          <Sidebar>
            <Outlet />
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
        <Route path="/maintenance/plan" element={<MaintenancePlan />} />
        <Route path="/informations" element={<Informations />} />
        <Route path="/building/manager" element={<BuildingManagerArea />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
