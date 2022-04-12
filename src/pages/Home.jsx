import React, { useContext } from "react";
import MyCards from "../components/MyCards";
import Loader from "../components/Loader";
import { BlogContext } from "../store/BlogContext";

const Home = () => {
  const { load } = useContext(BlogContext);

  return <div className="home">{load ? <Loader /> : <MyCards />}</div>;
};

export default Home;
