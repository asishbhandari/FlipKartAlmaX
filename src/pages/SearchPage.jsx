import { useNavigate, useParams } from "react-router-dom";
import FilterSection from "../Components/FilterSection/FilterSection";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import SortBy from "../Components/UI/SortBy";
import ProductCard from "../Components/ProductCard/ProductCard";
import TopCategory from "../Components/UI/TopCategory";

const SearchPage = () => {
  const { searchTerm } = useParams();
  const navigate = useNavigate();
  const selectedCategory = useSelector(
    (state) => state?.ui?.selectedCategories
  );
  const [products, setProducts] = useState([]);
  const data = useSelector((state) => state?.ui?.products);
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [isSearchProduct, setIsSearchProduct] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const filterData = useSelector((state) => state?.ui?.FilteredProducts);

  const calculateDiscount = (num) => {
    return Math.round(num?.price * 97 * (1 - num?.discount / 100));
  };

  useEffect(() => {
    setProducts([...data]);
  }, [data]);

  useEffect(() => {
    if (searchedProducts.length > 0) {
      setIsSearchProduct(true);
    } else setIsSearchProduct(false);
  }, [searchedProducts]);

  useEffect(() => {
    if (filterData?.length !== 0) {
      setFilteredProducts(filterData);
      setIsSearchProduct(true);
    } else {
      setFilteredProducts([]);
      setIsSearchProduct(false);
    }
  }, [filterData, data]);

  useEffect(() => {
    setSearchedProducts([
      ...data.filter((product) =>
        product?.title?.toLowerCase()?.includes(searchTerm.toLowerCase())
      ),
    ]);
  }, [searchTerm, data]);

  return (
    <div className="flex flex-col min-h-screen">
      <TopCategory />
      <div className="flex flex-col">
        <div className="flex w-[98%] mx-auto gap-4 mt-4">
          {/* left section - filter */}
          <div className="w-[20%] bg-white flex flex-col">
            <FilterSection
              selectedCategory={selectedCategory}
              products={searchedProducts}
              calculateDiscount={calculateDiscount}
            />
          </div>

          {/* Right Section */}
          <div className="w-[80%] bg-white">
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
              updateSortedProduct={setSearchedProducts}
            />

            {/* Product display section */}
            <div className="w-full">
              {isSearchProduct ? (
                filteredProducts.map((item, i) => (
                  <ProductCard
                    item={item}
                    key={i}
                    calculateDiscount={calculateDiscount}
                  />
                ))
              ) : (
                <div>
                  <span className="text-xl font-bold flex justify-center mt-4">
                    {`'${searchTerm}' No such Product Found`}
                  </span>
                  <div className="flex flex-col gap-2 p-2">
                    <span className="text-lg font-semibold">
                      Our Recommendation
                    </span>
                    {products.slice(2, 8).map((item, i) => (
                      <ProductCard
                        key={i * 2 * item.id}
                        item={item}
                        calculateDiscount={calculateDiscount}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
