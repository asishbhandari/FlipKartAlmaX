import PropTypes from "prop-types";
import FilterByPrice from "../UI/FilterByPrice";
import FilterByRating from "../UI/FilterByRating";
import FilterByFAssured from "../UI/FilterByFAssured";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addFilteredProducts } from "../../redux/Features/uiSlice";

const FilterSection = ({ selectedCategory, products, calculateDiscount }) => {
  const dispatch = useDispatch();
  const [filteredProductByRating, setFilteredProductByRating] = useState({
    prod: [],
    isFilterOn: false,
  });
  const [filteredProductByPrice, setFilteredProductByPrice] = useState({
    prod: [],
    isFilterOn: false,
  });
  const [filteredProductByFAssured, setFilteredProductByFAssured] = useState({
    prod: [],
    isFilterOn: false,
  });
  useEffect(() => {
    if (
      !filteredProductByRating?.isFilterOn &&
      !filteredProductByPrice?.isFilterOn &&
      !filteredProductByFAssured?.isFilterOn
    ) {
      dispatch(addFilteredProducts(products));
    } else {
      let filteredProduct = [...products];
      if (filteredProductByRating?.isFilterOn) {
        filteredProduct = filteredProduct.filter((item) =>
          filteredProductByRating?.prod?.some((obj) => obj?.id === item.id)
        );
      }
      if (filteredProductByFAssured?.isFilterOn) {
        filteredProduct = filteredProduct.filter((item) =>
          filteredProductByFAssured?.prod?.some((obj) => obj?.id === item.id)
        );
      }
      if (filteredProductByPrice?.isFilterOn) {
        filteredProduct = filteredProduct.filter((item) =>
          filteredProductByPrice?.prod?.some((obj) => obj?.id === item.id)
        );
      }

      dispatch(addFilteredProducts(filteredProduct));
    }
  }, [
    filteredProductByRating,
    filteredProductByPrice,
    filteredProductByFAssured,
    dispatch,
    products,
  ]);

  return (
    <>
      <div className=" p-4">
        <span className="text-xl font-semibold">Filters</span>
        <div className="flex flex-wrap gap-2">
          {filteredProductByRating?.isFilterOn && (
            <span className="bg-gray-300 rounded-md w-fit px-1">Rating</span>
          )}
          {filteredProductByPrice?.isFilterOn && (
            <span className="bg-gray-300 rounded-md w-fit px-1">Price</span>
          )}
          {filteredProductByFAssured?.isFilterOn && (
            <span className="bg-gray-300 rounded-md w-fit px-1">FAssured</span>
          )}
        </div>
      </div>
      <span className="w-full h-0 border border-gray-200"></span>
      <div className="text-sm p-4 font-semibold flex flex-col">
        <span>CATEGORIES</span>
        <span className="p-2 text-gray-400">{selectedCategory}</span>
      </div>
      <span className="w-full h-0 border border-gray-200"></span>

      {/* filter by price */}
      <FilterByPrice
        products={products}
        setFilteredProductByPrice={setFilteredProductByPrice}
        calculateDiscount={calculateDiscount}
      />
      <span className="w-full h-0 border border-gray-200"></span>

      {/* filter by isFAssured */}

      <span className=" p-4 text-sm flex flex-col">
        <FilterByFAssured
          products={products}
          setFilteredProductByFAssured={setFilteredProductByFAssured}
        />
      </span>
      <span className="w-full h-0 border border-gray-200"></span>

      {/* filter by Rating  */}
      <FilterByRating
        setFilteredProductByRating={setFilteredProductByRating}
        products={products}
      />
    </>
  );
};
FilterSection.propTypes = {
  selectedCategory: PropTypes.string,
  products: PropTypes.array,
  calculateDiscount: PropTypes.func,
};

export default FilterSection;
