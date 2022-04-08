import React from "react";
import CategoryCard from "../components/CategoryCard";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { BlogContext } from "../store/BlogContext";
import axios from "axios";
import Loader from "../components/Loader";

const CategoryDetail = () => {
  const { str } = useParams();
  const [selectedCategoryPosts, setSelectedCategoryPosts] = React.useState([]);
  const { load, setLoad } = React.useContext(BlogContext);
  const getSelectedCategories = async () => {
    setLoad(true);
    await axios
      .get(`https://blogsato-drf.herokuapp.com/api/category/${str}/`)
      .then((response) => setSelectedCategoryPosts(response.data));
    setLoad(false);
  };
  React.useEffect(() => {
    getSelectedCategories();
  }, [str]);
  return (
    <div className="categoryposts">
      <Navbar />
      {load ? (
        <Loader />
      ) : (
        selectedCategoryPosts.map((post) => (
          <CategoryCard key={post.id} post={post} />
        ))
      )}
    </div>
  );
};

export default CategoryDetail;
