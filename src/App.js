import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/navbar";
import { Homepage } from "./pages/homepage/homepage";
import { EventPage } from "./pages/event_page/event_page";
import { Cart } from "./pages/cart/cart";
import { EventContextProvider } from "./context/event-context";

function App() {
  return (
    <div className="App">
      <EventContextProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/event/:id" element={<EventPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/cart/:id" element={<Cart />} />
          </Routes>
        </Router>
      </EventContextProvider>
    </div>
  );
}

export default App;
