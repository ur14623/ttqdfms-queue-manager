import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Drivers from "./pages/Drivers";
import DriverDetail from "./pages/DriverDetail";
import Vehicles from "./pages/Vehicles";
import VehicleDetail from "./pages/VehicleDetail";
import RoutesPage from "./pages/RoutesPage";
import Queue from "./pages/Queue";
import AddQueue from "./pages/AddQueue";
import FareCollection from "./pages/FareCollection";
import TripTickets from "./pages/TripTickets";
import Schedule from "./pages/Schedule";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/drivers" element={<Drivers />} />
          <Route path="/drivers/:id" element={<DriverDetail />} />
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/vehicles/:id" element={<VehicleDetail />} />
          <Route path="/routes" element={<RoutesPage />} />
          <Route path="/queue" element={<Queue />} />
          <Route path="/add-queue" element={<AddQueue />} />
          <Route path="/fare-collection" element={<FareCollection />} />
          <Route path="/trip-tickets" element={<TripTickets />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
