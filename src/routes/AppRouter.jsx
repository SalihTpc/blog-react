import React, { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import CategoryDetail from "../pages/CategoryDetail";
import Home from "../pages/Home";
import Login from "../pages/Login";
import PasswordChange from "../pages/PasswordChange";
import PostDetail from "../pages/PostDetail";
import Register from "../pages/Register";
import { BlogContext } from "../store/BlogContext";

const AppRouter = () => {
  const { isAuth } = useContext(BlogContext);
  function RequireAuth({ children, redirectTo }) {
    if (!isAuth) {
      return <Navigate to={redirectTo} />;
    }
    return children;
  }
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/category/:str" element={<CategoryDetail />} />
        <Route
          path="/post-detail/:id"
          element={
            <RequireAuth redirectTo={"/login"}>
              <PostDetail />
            </RequireAuth>
          }
        />
        <Route
          path="/change-password"
          element={
            <RequireAuth redirectTo={"/login"}>
              <PasswordChange />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
