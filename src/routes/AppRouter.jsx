import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CategoryDetail from "../pages/CategoryDetail";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/category/:str" element={<CategoryDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
