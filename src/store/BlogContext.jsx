import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const BlogContext = createContext();

export const BlogProvider = (props) => {
  const [myCategories, setMyCategories] = useState([]);
  const [myAnimes, setMyAnimes] = useState([]);
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
    getAnimes();
    getCategories();
  }, []);
  return (
    <BlogContext.Provider
      value={[myCategories, setMyCategories, myAnimes, setMyAnimes]}
    >
      {props.children}
    </BlogContext.Provider>
  );
};
