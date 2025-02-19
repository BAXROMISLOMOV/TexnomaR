import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./component/nav/Nav.jsx";
import "./index.css";
import Pagination from "./component/minicards/Pagination";
import App from "./App.jsx";
import AboutProduct from "./component/Card/ProductPage.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Nav /> 
      <Routes>
        <Route path="/" element={<App />} /> 
        <Route path="/categories/:slug" element={<Pagination />} /> 
        <Route path="/product/:id" element={<AboutProduct />} /> 
      </Routes>
    </BrowserRouter>
  </StrictMode>
);