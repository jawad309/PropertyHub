import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Properties from "./pages/Properties";
import PropertyDetails from "./pages/PropertyDetails";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";

function App() {
return ( <div className="app"> <Navbar />

  <main>
    <Routes>
      <Route path="/" element={<Home />} />

      <Route
        path="/properties"
        element={<Properties />}
      />

      <Route
        path="/properties/:id"
        element={<PropertyDetails />}
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route path="/auth" element={<Auth />} />

      <Route path="/about" element={<About />} />

      <Route path="/cart" element={<Cart />} />

      <Route path="/contact" element={<Contact />} />

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  </main>

  <Footer />
</div>

);
}

export default App;
