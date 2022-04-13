import React from "react";
import CategoryCard from "../components/CategoryCard";
import { useParams } from "react-router-dom";
import { BlogContext } from "../store/BlogContext";
import axios from "axios";
import Loader from "../components/Loader";
import styled from "styled-components";

const MyTag = styled.h1`
  text-align: center;
`;

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
    <>
      <MyTag>
        Animes the category of {str.charAt(0).toUpperCase() + str.slice(1)}
      </MyTag>
      <div className="categoryposts">
        {load ? (
          <Loader />
        ) : (
          selectedCategoryPosts.map((post) => (
            <CategoryCard key={post.id} post={post} />
          ))
        )}
      </div>
    </>
  );
};

export default CategoryDetail;
