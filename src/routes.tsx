import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { NavBar } from './components/NavBar';
import { MaintenancesPlan } from './screens/MaintenancesPlan';
import { Informations } from './screens/Informations';
import { SyndicArea } from './screens/SyndicArea';
import { Home } from './screens/Home';
import { Annexes } from './screens/Annexes';
import { Settings } from './screens/Settings';
import { ChooseSyndic } from './screens/ChooseSyndic';
import { Suppliers } from './screens/Suppliers';
import { Videos } from './screens/Videos';
import { Checklists } from './screens/Checklists';

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route
        path="*"
        element={
          <NavBar>
            <MaintenancesPlan />
          </NavBar>
        }
      />

      <Route
        path="/"
        element={
          <NavBar>
            <Outlet />
          </NavBar>
        }
      >
        <Route path="/home/:buildingNanoId" element={<Home />} />
        <Route path="/maintenancesplan/:buildingNanoId" element={<MaintenancesPlan />} />
        <Route path="/informations/:buildingNanoId" element={<Informations />} />
        <Route path="/annex/:buildingNanoId" element={<Annexes />} />
        <Route path="/suppliers/:buildingNanoId" element={<Suppliers />} />
        <Route path="/checklists/:buildingNanoId" element={<Checklists />} />
        <Route path="/videos/:buildingNanoId" element={<Videos />} />
        <Route path="/syndicarea/:buildingNanoId" element={<SyndicArea />} />
        <Route path="/settings/:buildingNanoId" element={<Settings />} />
        <Route path="/choose/:buildingNanoId/:categoryId" element={<ChooseSyndic />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
