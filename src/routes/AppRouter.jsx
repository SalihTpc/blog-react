import React, { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import CategoryDetail from "../pages/CategoryDetail";
import Home from "../pages/Home";
import Login from "../pages/Login";
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
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
