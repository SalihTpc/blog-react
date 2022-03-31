import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import MyCards from "./components/MyCards";

function App() {
  const [categories, setCategories] = useState([]);
  const [animes, setAnimes] = useState([]);
  const getCategories = async () => {
    await axios
      .get("https://blogsato-drf.herokuapp.com/api/category/list/")
      .then((response) => setCategories(response.data));
  };
  const getAnimes = async () => {
    await axios
      .get("https://blogsato-drf.herokuapp.com/api/list/")
      .then((response) => setAnimes(response.data.results));
  };

  useEffect(() => {
    getAnimes();
    getCategories();
  }, []);

  return (
    <div className="App">
      <Navbar categories={categories} />
      <MyCards animes={animes} />
    </div>
  );
}

export default App;
