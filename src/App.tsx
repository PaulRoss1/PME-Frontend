import "./App.scss";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Navbar } from "./components/navbar";
import { Homepage } from "./pages/homepage/homepage";
import { EventPage } from "./pages/event_page/event_page";
import { Cart } from "./pages/cart/cart";
import { NotFound } from "./pages/not_found/not_found";
import { EventContextProvider } from "./context/event-context";
import { ScrollToTop } from "./helpers/helperFunctions";
import { Footer } from "./components/footer";

function App() {
  return (
    <div className="App">
      <EventContextProvider>
        <Router>
          <Navbar />
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/event/:id" element={<EventPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<Navigate to="/404" />} />
            <Route path="/404" element={<NotFound />} />
          </Routes>
          <Footer />
        </Router>
      </EventContextProvider>
    </div>
  );
}

export default App;
