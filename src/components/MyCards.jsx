import React, { useContext } from "react";
import { BlogContext } from "../store/BlogContext";
import MyCard from "./MyCard";
import "./mycards.css";
import Button from "@mui/material/Button";
import axios from "axios";
import Loader from "./Loader";

const MyCards = () => {
  const style = {
    position: "relative",
    top: "2rem",
    right: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    p: 2,
    borderRadius: 6,
    boxShadow: 24,
    mb: 3,
  };
  const { myAnimes, nextUrl, setNextUrl, setMyAnimes, load } =
    useContext(BlogContext);
  // console.log(nextUrl);
  const getMoreAnimes = async () => {
    await axios.get(`${nextUrl}`).then(function (response) {
      setMyAnimes([...myAnimes, ...response.data.results]);
      // console.log([...myAnimes, ...response.data.results]);
      // console.log(response.data.results);
      setNextUrl(response.data.next);
    });
  };

  return (
    <div>
      {load ? (
        <Loader />
      ) : (
        <>
          <div className="cards">
            {myAnimes.map((anime) => (
              <MyCard key={anime.id} anime={anime} />
            ))}
          </div>
          <Button
            disabled={nextUrl === null}
            sx={style}
            onClick={getMoreAnimes}
            variant="outlined"
          >
            Load More
          </Button>
        </>
      )}
    </div>
  );
};
export default MyCards;
