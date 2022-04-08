import React from "react";
import CategoryCard from "../components/CategoryCard";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";

const CategoryDetail = () => {
  const { str } = useParams();
  return (
    <div>
      <Navbar />
      <CategoryCard categoryName={str} />
    </div>
  );
};

export default CategoryDetail;
