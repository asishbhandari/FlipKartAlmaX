import { useNavigate } from "react-router-dom";
import FilterSection from "../Components/FilterSection/FilterSection";
import TopCategory from "../Components/UI/TopCategory";
import { useSelector } from "react-redux";
import SortBy from "../Components/UI/SortBy";
import { useEffect, useState } from "react";
import ProductCard from "../Components/ProductCard/ProductCard";
import { CgMoreR } from "react-icons/cg";
import { IoCloseCircle } from "react-icons/io5";

const CategoryPage = () => {
  const navigate = useNavigate();
  const selectedCategory = useSelector(
    (state) => state?.ui?.selectedCategories
  );
  const [products, setProducts] = useState([]);
  const data = useSelector((state) => state?.ui?.products);

  const [filteredProducts, setFilteredProducts] = useState([]);
  const filterData = useSelector((state) => state?.ui?.FilteredProducts);
  const [isFilterSectionVisible, setIsFilterSectionVisible] = useState(false);

  const toggleFilter = () => {
    setIsFilterSectionVisible(!isFilterSectionVisible);
  };

  const handleOutsideClick = () => {
    // if (event.target.classList.contains("filter-overlay")) {
    setIsFilterSectionVisible(false);
    // }
  };

  // discount function to calculate discount
  const calculateDiscount = (num) => {
    return Math.floor(num?.price * 97 * (1 - num?.discount / 100));
  };

  useEffect(() => {
    setProducts(data);
  }, [data]);

  useEffect(() => {
    if (filterData?.length !== 0) {
      setFilteredProducts(filterData);
    } else {
      setFilteredProducts(data);
    }
  }, [filterData, data]);

  return (
    <div className="flex flex-col min-h-screen">
      <TopCategory selectedCategory={selectedCategory} />

      <div
        className={`lg:hidden cursor-pointer hover:bg-gray-100 p-2 rounded z-10 `}
        onClick={toggleFilter}
      >
        <CgMoreR size={25} className="bg-white text-gray-500" />
      </div>

      <div className="grid grid-cols-12 gap-4 lg:mt-4 w-[98%] mx-auto">
        {/* left section - filter */}
        <div
          className={`col-span-2 bg-white rounded shadow-md lg:flex lg:flex-col overflow-auto transition-all duration-300 ease-in-out z-40 ${
            isFilterSectionVisible
              ? "fixed top-0 left-0 h-full flex flex-col w-full sm:w-1/2 md:w-1/3"
              : "hidden"
          }`}
        >
          <FilterSection
            selectedCategory={selectedCategory}
            products={products}
            calculateDiscount={calculateDiscount}
          />
          {isFilterSectionVisible && (
            <span
              className="mt-4 text-center text-sm font-bold hover:text-blue-600"
              onClick={toggleFilter}
            >
              <IoCloseCircle size={25} className="absolute top-2 right-2" />
            </span>
          )}
        </div>
        {/* Click-outside overlay for mobile (optional) */}
        {isFilterSectionVisible && (
          <div
            className={`fixed top-0 left-0 w-full h-full bg-gray-100 opacity-0 pointer-events-none transition-opacity duration-300 ease-in-out z-30 ${
              isFilterSectionVisible ? "opacity-50 pointer-events-auto" : ""
            }`}
            onClick={handleOutsideClick}
          />
        )}

        {/* Right Section */}
        <div className="lg:col-span-10 col-span-12 bg-white rounded shadow-md">
          {/* category description */}
          <div className="p-2 text-gray-500 text-sm">
            <span
              onClick={() => navigate("/")}
              className="cursor-pointer hover:text-fBlue"
            >{`Home > `}</span>
            <span className="cursor-pointer hover:text-fBlue">
              {selectedCategory}
            </span>
          </div>

          {/* Sorting functionality */}
          <SortBy
            calculateDiscount={calculateDiscount}
            products={products}
            updateSortedProduct={setProducts}
          />

          {/* Product display section */}
          <div className="w-full">
            {filteredProducts || filteredProducts.length !== 0 ? (
              filteredProducts
                ?.filter(
                  (item) => item?.category === selectedCategory?.toLowerCase()
                )
                ?.map((item, i) => (
                  <ProductCard
                    item={item}
                    key={`${i} ${item.title}`}
                    calculateDiscount={calculateDiscount}
                  />
                ))
            ) : (
              <span>No Products to match these Filters</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
