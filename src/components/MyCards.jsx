import React from "react";
import MyCard from "./MyCard";
import "./mycards.css";

const MyCards = (animes) => {
  console.log(animes.animes.map((anime) => console.log(anime.title)));
  return (
    <div className="cards">
      {animes.animes.map((anime) => (
        <MyCard anime={anime} />
      ))}
    </div>
  );
};
export default MyCards;
