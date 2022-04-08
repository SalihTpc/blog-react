import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const BlogContext = createContext();

export const BlogProvider = (props) => {
  const [myCategories, setMyCategories] = useState([]);
  const [myAnimes, setMyAnimes] = useState([]);
  const [token, setToken] = useState(""); //localden alınacak
  const [user, setUser] = useState({});
  const [isAuth, setIsAuth] = useState(false);
  const [load, setLoad] = useState(false);
  const getCategories = async () => {
    setLoad(true);
    await axios
      .get("https://blogsato-drf.herokuapp.com/api/category/list/")
      .then((response) => setMyCategories(response.data));
    setLoad(false);
  };
  const getAnimes = async () => {
    setLoad(true);
    await axios
      .get("https://blogsato-drf.herokuapp.com/api/list/")
      .then((response) => setMyAnimes(response.data.results));
    setLoad(false);
  };

  useEffect(() => {
    setUser(JSON.parse(sessionStorage.getItem("user")));
    // console.log(user);
    setToken(
      sessionStorage.getItem("user")
        ? JSON.parse(sessionStorage.getItem("user")).key
        : null
    );
    // console.log(token);
    getAnimes();
    getCategories();
  }, []);
  useEffect(() => {
    setUser(JSON.parse(sessionStorage.getItem("user")));
    setToken(
      sessionStorage.getItem("user")
        ? JSON.parse(sessionStorage.getItem("user")).key
        : null
    );
  }, [isAuth]);

  const values = {
    myCategories,
    setMyCategories,
    myAnimes,
    setMyAnimes,
    token,
    setToken,
    user,
    setUser,
    isAuth,
    setIsAuth,
    load,
    setLoad,
  };

  return (
    <BlogContext.Provider value={values}>{props.children}</BlogContext.Provider>
  );
};
