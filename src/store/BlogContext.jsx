import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const BlogContext = createContext();

export const BlogProvider = (props) => {
  const [myCategories, setMyCategories] = useState([]);
  const [myAnimes, setMyAnimes] = useState([]);
  const [token, setToken] = useState(""); //localden alınacak
  const [user, setUser] = useState({});
  const getCategories = async () => {
    await axios
      .get("https://blogsato-drf.herokuapp.com/api/category/list/")
      .then((response) => setMyCategories(response.data));
  };
  const getAnimes = async () => {
    await axios
      .get("https://blogsato-drf.herokuapp.com/api/list/")
      .then((response) => setMyAnimes(response.data.results));
  };

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
    // console.log(user);
    setToken(
      localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")).key
        : null
    );
    // console.log(token);
    getAnimes();
    getCategories();
  }, []);
  const values = {
    myCategories,
    setMyCategories,
    myAnimes,
    setMyAnimes,
    token,
    setToken,
    user,
    setUser,
  };

  return (
    <BlogContext.Provider value={values}>{props.children}</BlogContext.Provider>
  );
};
