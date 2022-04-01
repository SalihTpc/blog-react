import React, { useContext } from "react";
import { BlogContext } from "../store/BlogContext";
import MyCard from "./MyCard";
import "./mycards.css";

const MyCards = () => {
  const [myCategories, setMyCategories, myAnimes, setMyAnimes] =
    useContext(BlogContext);
  return (
    <div className="cards">
      {myAnimes.map((anime) => (
        <MyCard key={anime.id} anime={anime} />
      ))}
    </div>
  );
};
export default MyCards;
