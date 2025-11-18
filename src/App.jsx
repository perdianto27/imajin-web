import { Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar";
import ProductDetail from "./pages/Product/ProductDetail";
import Register from "./pages/Register";
import Login from "./pages/Login";

import "./App.scss";

function App() {
  return (
    <div className="app">

      <Navbar />

      {/* Page Content */}
      <div className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;