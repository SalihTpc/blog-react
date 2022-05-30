import React, { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import About from "../pages/About";
import AddNewPost from "../pages/AddNewPost";
import CategoryDetail from "../pages/CategoryDetail";
import Home from "../pages/Home";
import Login from "../pages/Login";
import PasswordChange from "../pages/PasswordChange";
import PostDetail from "../pages/PostDetail";
import Register from "../pages/Register";
import { BlogContext } from "../store/BlogContext";

const AppRouter = () => {
  const { load } = useContext(BlogContext);
  function RequireAuth({ children, redirectTo }) {
    return sessionStorage.getItem("key") ? (
      children
    ) : (
      <Navigate to={redirectTo} />
    );
  }
  function RequireNotAuth({ children, redirectTo }) {
    return sessionStorage.getItem("key") ? (
      <Navigate to={redirectTo} />
    ) : (
      children
    );
  }
  return (
    <BrowserRouter>
      {!load ? <Navbar /> : null}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <RequireNotAuth redirectTo={"/"}>
              <Login />
            </RequireNotAuth>
          }
        />
        <Route
          path="/register"
          element={
            <RequireNotAuth redirectTo={"/"}>
              <Register />
            </RequireNotAuth>
          }
        />
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
        <Route
          path="/new-post"
          element={
            <RequireAuth redirectTo={"/login"}>
              <AddNewPost />
            </RequireAuth>
          }
        />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
