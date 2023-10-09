import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/navbar";
import { Homepage } from "./pages/homepage/homepage";
import { EventPage } from "./pages/event_page/event_page";
import { Cart } from "./pages/cart/cart";
import { EventContextProvider } from "./context/event-context";
import { ScrollToTop } from "./helpers/helperFunctions";

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
          </Routes>
        </Router>
      </EventContextProvider>
    </div>
  );
}

export default App;
