import { useState } from "react";
import PropTypes from "prop-types";

const SortBy = ({ calculateDiscount, products, updateSortedProduct }) => {
  const [sortBy, setSortBy] = useState("");
  const sortedProducts = [...products];

  const handleSortPopularity = () => {
    setSortBy("Popularity");
    sortedProducts.sort((a, b) => b?.rating?.count - a?.rating?.count);
    updateSortedProduct(sortedProducts);
  };

  const handleSortLTH = () => {
    setSortBy("lowToHigh");
    sortedProducts.sort((a, b) => calculateDiscount(b) - calculateDiscount(a));
    updateSortedProduct(sortedProducts);
  };

  const handleSortHTL = () => {
    setSortBy("highToLow");
    sortedProducts.sort((a, b) => calculateDiscount(a) - calculateDiscount(b));
    updateSortedProduct(sortedProducts);
  };
  return (
    <div className="p-2 text-sm flex gap-4">
      <span className="font-bold truncate">Sort By</span>
      <span
        onClick={handleSortPopularity}
        className={`cursor-pointer truncate ${
          sortBy === "Popularity" ? "text-fBlue underline font-semibold" : ""
        }`}
      >
        Popularity
      </span>
      <span
        onClick={handleSortHTL}
        className={`cursor-pointer truncate ${
          sortBy === "highToLow" ? "text-fBlue underline font-semibold" : ""
        }`}
      >
        Price--Low to High
      </span>
      <span
        onClick={handleSortLTH}
        className={`cursor-pointer truncate ${
          sortBy === "lowToHigh" ? "text-fBlue underline font-semibold" : ""
        }`}
      >
        Price--High to Low
      </span>
    </div>
  );
};

SortBy.propTypes = {
  calculateDiscount: PropTypes.func,
  products: PropTypes.array,
  updateSortedProduct: PropTypes.func,
};

export default SortBy;
