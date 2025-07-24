import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

import { NavBar } from '@components/NavBar';

import { Home } from '@screens/Home';
import { MaintenancesPlan } from '@screens/MaintenancesPlan';
import { BuildingContacts } from '@screens/BuildingContacts';
import { Annexes } from '@screens/Annexes';
import { Videos } from '@screens/Videos';
import { ResidentRequireAuth } from '@contexts/ResidentAuth/ResidentRequireAuth';
import { GuestMaintenanceHistory } from '@screens/GuestMaintenanceHistory';
import { GuestTicket } from '@screens/GuestTicket';
import { BlockedPage } from '@screens/BlockedPage';

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
        path="/guest-ticket/:ticketId"
        element={
          <NavBar>
            <GuestTicket />
          </NavBar>
        }
      />

      <Route path="/blocked" element={<BlockedPage />} />

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
          <Route path="/home/:buildingId" element={<Home />} />
          <Route path="/maintenance-plan/:buildingId" element={<MaintenancesPlan />} />
          <Route path="/contacts/:buildingId" element={<BuildingContacts />} />
          <Route path="/documents/:buildingId" element={<Annexes />} />
          <Route path="/videos/:buildingId" element={<Videos />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
