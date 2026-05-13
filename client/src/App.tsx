import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import DrivewayCleaning from "./pages/DrivewayCleaning";
import DeckCleaning from "./pages/DeckCleaning";
import SidingWashing from "./pages/SidingWashing";
import VehicleWashing from "./pages/VehicleWashing";
import ServiceAreas from "./pages/ServiceAreas";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/driveway-cleaning" component={DrivewayCleaning} />
      <Route path="/deck-cleaning" component={DeckCleaning} />
      <Route path="/siding-washing" component={SidingWashing} />
      <Route path="/vehicle-washing" component={VehicleWashing} />
      <Route path="/service-areas" component={ServiceAreas} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
