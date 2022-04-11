import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const BlogContext = createContext();

export const BlogProvider = (props) => {
  const [myCategories, setMyCategories] = useState([]);
  const [myAnimes, setMyAnimes] = useState([]);
  const [token, setToken] = useState(""); //localden alınacak
  const [user, setUser] = useState({
    pk: null,
    username: "",
    email: "",
    first_name: "",
    last_name: "",
  });
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
    getAnimes();
    getCategories();
  }, []);
  const getUser = async () => {
    let userTemp = {
      ...user,
    };
    setLoad(true);
    const { data } = await axios({
      method: "get",
      url: "https://blogsato-drf.herokuapp.com/users/auth/user/",
      headers: { Authorization: `Token ${sessionStorage.getItem("key")}` },
    });
    // console.log(data);
    userTemp = {
      pk: data.pk,
      username: data.username,
      email: data.email,
      first_name: data.first_name,
      last_name: data.last_name,
    };
    setUser(userTemp);
    console.log(user);
    setLoad(false);
  };
  useEffect(() => {
    if (isAuth) {
      setToken(sessionStorage.getItem("key"));
      // console.log(token);
      getUser();
    }
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
