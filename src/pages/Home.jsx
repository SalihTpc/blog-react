import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import MyCards from "../components/MyCards";
import Loader from "../components/Loader";
import { BlogContext } from "../store/BlogContext";

const Home = () => {
  const { load, user } = useContext(BlogContext);
  return (
    <div className="home">
      <Navbar />
      <h1>{user.username}</h1>
      {/* <MyCards /> */}
      {load ? <Loader /> : <MyCards />}
    </div>
  );
};

export default Home;
