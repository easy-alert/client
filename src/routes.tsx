import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

import TicketsPage from '@screens/Tickets';

import { Tickets } from '@screens/Tickets/index BU';
import { NavBar } from './components/NavBar';
import { MaintenancesPlan } from './screens/MaintenancesPlan';
import { Informations } from './screens/Informations';
import { SyndicArea } from './screens/SyndicArea';
import { Home } from './screens/Home';
import { Annexes } from './screens/Annexes';
import { Settings } from './screens/Settings';
import { ChooseSyndic } from './screens/ChooseSyndic';
import { Videos } from './screens/Videos';
import { Checklists } from './screens/Checklists';
// import { PublicTickets } from './screens/PublicTickets';
import { ResponsibleRequireAuth } from './contexts/ResponsibleAuth/ResponsibleRequireAuth';
import { ResidentRequireAuth } from './contexts/ResidentAuth/ResidentRequireAuth';
import { SupplierDetails } from './screens/Suppliers/Details';
import { SuppliersList } from './screens/Suppliers/List';
import { GuestMaintenanceHistory } from './screens/GuestMaintenanceHistory';

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
        path="/guest-maintenance-history/:maintenanceHistoryId"
        element={
          <NavBar>
            <GuestMaintenanceHistory />
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
        <Route
          element={
            <ResidentRequireAuth>
              <Outlet />
            </ResidentRequireAuth>
          }
        >
          <Route path="/home/:buildingNanoId" element={<Home />} />
          <Route path="/maintenancesplan/:buildingNanoId" element={<MaintenancesPlan />} />
          <Route path="/informations/:buildingNanoId" element={<Informations />} />
          <Route path="/annex/:buildingNanoId" element={<Annexes />} />
          {/* <Route path="/public-tickets/:buildingNanoId" element={<PublicTickets />} /> */}
          <Route path="/videos/:buildingNanoId" element={<Videos />} />
        </Route>

        <Route
          element={
            <ResponsibleRequireAuth>
              <Outlet />
            </ResponsibleRequireAuth>
          }
        >
          <Route path="/tickets/:buildingNanoId" element={<TicketsPage />} />
          {/* <Route path="/tickets/:buildingNanoId" element={<Tickets />} /> */}

          <Route path="/syndicarea/:buildingNanoId" element={<SyndicArea />} />
          <Route path="/checklists/:buildingNanoId" element={<Checklists />} />
          <Route path="/settings/:buildingNanoId" element={<Settings />} />
          <Route path="/suppliers/:buildingNanoId" element={<SuppliersList />} />
          <Route path="/suppliers/:buildingNanoId/:supplierId" element={<SupplierDetails />} />
          <Route path="/choose/:buildingNanoId/:categoryId" element={<ChooseSyndic />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
