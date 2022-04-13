import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const BlogContext = createContext();

export const BlogProvider = (props) => {
  const [myCategories, setMyCategories] = useState([]);
  const [myAnimes, setMyAnimes] = useState([]);
  const [nextUrl, setNextUrl] = useState("");
  const [token, setToken] = useState(""); //localden alınacak
  const [user, setUser] = useState({});
  const [isAuth, setIsAuth] = useState(false);
  const [load, setLoad] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const getCategories = async () => {
    setLoad(true);
    await axios
      .get("https://blogsato-drf.herokuapp.com/api/category/list/")
      .then(function (response) {
        setMyCategories(response.data);
      });
    setCategoryList(myCategories.map((cat) => cat.name));
    setLoad(false);
  };
  const getAnimes = async () => {
    setLoad(true);
    await axios
      .get("https://blogsato-drf.herokuapp.com/api/list/")
      .then(function (response) {
        setMyAnimes(response.data.results);
        setNextUrl(response.data.next);
      });
    setLoad(false);
  };
  const getUser = async () => {
    // let userTemp = {
    //   ...user,
    // };

    const { data } = await axios({
      method: "get",
      url: "https://blogsato-drf.herokuapp.com/users/auth/user/",
      headers: { Authorization: `Token ${sessionStorage.getItem("key")}` },
    });
    setIsAuth(true);
    setUser(data);
    // console.log(user);
  };

  useEffect(() => {
    if (sessionStorage.getItem("key")) {
      getUser();
    }
    getAnimes();
    getCategories();
  }, []);

  useEffect(() => {
    if (isAuth) {
      setToken(sessionStorage.getItem("key"));
      // console.log(token);
      getUser();
    }
  }, [isAuth]);

  // console.log(nextUrl);
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
    nextUrl,
    setNextUrl,
    categoryList,
  };

  return (
    <BlogContext.Provider value={values}>{props.children}</BlogContext.Provider>
  );
};
