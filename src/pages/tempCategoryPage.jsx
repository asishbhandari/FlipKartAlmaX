import { useNavigate } from "react-router-dom";
import { categoryContent } from "../utils/Constant";
import { useDispatch, useSelector } from "react-redux";
import { selectCategory } from "../redux/Features/uiSlice";
import { useEffect, useState } from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
import { TiStarFullOutline } from "react-icons/ti";
import FAssured from "../assets/fassured.png";
import SortBy from "../Components/UI/SortBy";
import FilterByRating from "../Components/UI/FilterByRating";

const CategoryPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedCategory = useSelector(
    (state) => state?.ui?.selectedCategories
  );
  const [products, setProducts] = useState([]);

  const data = useSelector((state) => state?.ui?.products);

  const [filterByPrice, setFilterByPrice] = useState(10000000);
  const [filteredPriceProduct, setFilteredPriceProduct] = useState([
    ...products,
  ]);
  const [isFAss, setIsFAss] = useState(false);
  const [filteredFAssuredProduct, setFilteredFAssuredProduct] = useState([
    ...products,
  ]);
  // const [filterByRating, setFilterByRating] = useState(0);
  const [filteredRatingProduct, setFilteredRatingProduct] = useState([
    ...products,
  ]);

  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    setProducts([...data]);
  }, [data]);

  // handler function to handle filter
  useEffect(() => {
    const filterProducts = products.filter((obj1) =>
      filteredRatingProduct.some((obj2) => obj1.id === obj2.id)
    );
    // setProducts([...filterProducts]);
    setFilteredProducts(filterProducts);
    console.log(products, filteredProducts, filterProducts);
  }, [filteredRatingProduct]);

  // }

  // const handleFilter = (filterByPrice, isFAss, filterByRating) => {
  //   if (isFAss) {
  //     setProducts([
  //       ...products.filter((product) => product?.isFAssured === true),
  //     ]);
  //   }
  //   if (filterByRating > 0) {
  //     setProducts([
  //       ...products.filter(
  //         (product) => product?.rating?.rate >= filterByRating
  //       ),
  //     ]);
  //   }
  //   if (filterByPrice !== 10000000) {
  //     if (filterByPrice === 2500) {
  //       setFilteredProducts([
  //         ...data.filter((product) => calculateDiscount(product) <= 2500),
  //       ]);
  //     } else if (filterByPrice === 5000) {
  //       setFilteredProducts([
  //         ...data.filter((product) => calculateDiscount(product) <= 5000),
  //       ]);
  //     } else if (filterByPrice === 5001) {
  //       setFilteredProducts([
  //         ...data.filter((product) => calculateDiscount(product) > 5000),
  //       ]);
  //     }
  //     // console.log(filterByPrice, filteredProducts, products);
  //     setProducts([
  //       ...products.filter(
  //         (product) =>
  //           filteredProducts.findIndex((pro) => pro.id === product.id) !== -1
  //       ),
  //     ]);
  //   }
  // };
  // useEffect(() => {
  //   handleFilter(filterByPrice, isFAss, filterByRating);
  // }, [filterByPrice, isFAss, filterByRating]);

  const [wishList, setWishList] = useState(false);
  const handleWishList = () => {
    // need to add logic to add it to user slice
    setWishList(!wishList);
  };

  const calculateDiscount = (num) => {
    return Math.round(num?.price * 97 * (1 - num?.discount / 100));
  };

  return (
    <div className="flex flex-col">
      <div className="bg-white h-[30px] ">
        <div className="w-[90%] md:w-[60%] mx-auto h-full flex justify-between overflow-x-scroll sm:overflow-x-hidden">
          {categoryContent?.map((item, i) => (
            <div
              key={i}
              className={`flex flex-col w-[200px] gap-[1%] justify-center items-center cursor-pointer ${
                selectedCategory === item?.name ? "bg-gray-200 " : ""
              } `}
              onClick={() => {
                dispatch(selectCategory(item?.name));
                navigate(`/category/${item.name}`);
              }}
            >
              <p className="md:font-medium text-xs md:text-sm line-clamp-1">
                {item.name}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex w-[98%] mx-auto gap-4 mt-4">
        <div className="w-[20%] bg-white flex flex-col">
          <span className="text-xl font-semibold p-4">Filters</span>
          <span className="w-full h-0 border border-gray-200"></span>
          <div className="text-sm p-4 font-semibold flex flex-col">
            <span>CATEGORIES</span>
            <span className="p-2 text-gray-400">{selectedCategory}</span>
          </div>
          <span className="w-full h-0 border border-gray-200"></span>

          {/* filter by price */}
          <div className=" p-4 text-sm flex flex-col">
            <span className=" font-semibold pb-2">PRICE</span>
            <span>
              <label className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  value={filterByPrice}
                  onChange={() => {
                    setFilterByPrice(2500);
                    // handleFilter(filterByPrice, isFAss, filterByRating);
                  }}
                />
                <span>Less than ₹2500</span>
              </label>
            </span>
            <span>
              <label className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  value={filterByPrice}
                  onChange={() => {
                    setFilterByPrice(5000);
                    // handleFilter(filterByPrice, isFAss, filterByRating);
                  }}
                />
                <span>Less than ₹5000</span>
              </label>
            </span>
            <span>
              <label className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  value={filterByPrice}
                  onChange={() => {
                    setFilterByPrice(5001);
                    // handleFilter(filterByPrice, isFAss, filterByRating);
                  }}
                />
                <span>More than ₹5000</span>
              </label>
            </span>
          </div>
          <span className="w-full h-0 border border-gray-200"></span>

          {/* filter by isFAssured */}
          <span className=" p-4 text-sm flex flex-col">
            <label className="flex gap-2 items-center">
              <input
                type="checkbox"
                value={isFAss}
                onChange={() => {
                  setIsFAss(!isFAss);
                  handleFilter(filterByPrice, isFAss, filterByRating);
                }}
              />
              <img src={FAssured} alt="Assured" className="w-[40%] h-[20px]" />
            </label>
          </span>
          <span className="w-full h-0 border border-gray-200"></span>

          {/* filter by Rating  */}
          <FilterByRating
            // handleFilter={handleFilter}
            // filterByPrice={filterByPrice}
            // isFAss={isFAss}
            setFilteredRatingProduct={setFilteredRatingProduct}
            products={data}
          />
          {/* <div className=" p-4 text-sm flex flex-col">
            <span className=" font-semibold pb-2">CUSTOMER RATING</span>
            <span>
              <label className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  value={filterByRating}
                  checked={filterByRating === 4}
                  onChange={() => {
                    if (this?.checked) {
                      setFilterByRating(4);
                    } else {
                      setFilterByRating(0);
                    }
                    // const newFilterByRating =
                    //   parseInt(event.target.value, 10) || 0;
                    // console.log(newFilterByRating);
                    handleFilter(filterByPrice, isFAss, filterByRating);
                  }}
                />
                <span className="flex items-center gap-1">
                  {`4 `}
                  <TiStarFullOutline /> {` & above `}
                </span>
              </label>
            </span>
            <span>
              <label className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  value={3}
                  // checked={filterByRating > 0}
                  onChange={(event) => {
                    // setFilterByRating(3);
                    const newFilterByRating =
                      parseInt(event.target.value, 10) || 0;
                    setFilterByRating(newFilterByRating);
                    handleFilter(filterByPrice, isFAss, filterByRating);
                  }}
                />
                <span className="flex items-center gap-1">
                  {`3 `}
                  <TiStarFullOutline /> {` & above `}
                </span>
              </label>
            </span>
            <span>
              <label className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  value={2}
                  // checked={filterByRating > 0}
                  onChange={(event) => {
                    // setFilterByRating(2);
                    const newFilterByRating =
                      parseInt(event.target.value, 10) || 0;
                    setFilterByRating(newFilterByRating);
                    handleFilter(filterByPrice, isFAss, filterByRating);
                  }}
                />
                <span className="flex items-center gap-1">
                  {`2 `}
                  <TiStarFullOutline /> {` & above `}
                </span>
              </label>
            </span>
          </div> */}
        </div>

        {/* right section */}
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
            updateSortedProduct={setProducts}
          />

          {/* product display section */}
          <div className="w-full">
            {products
              .filter(
                (item) => item?.category === selectedCategory?.toLowerCase()
              )
              .map((item, i) => (
                <div key={i * 2} className="w-full h-[250px] flex flex-col">
                  <span className="w-full h-0 border border-gray-300"></span>
                  <div className=" h-[220px] my-[15px] flex w-full">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-[18%] h-[200px] object-contain mx-auto my-auto px-2"
                    />
                    <span className="mt-[10px] w-[6%] pr-2">
                      {/* map through the wishlist from the redux store  */}
                      {wishList ? (
                        <IoMdHeart size={25} onClick={handleWishList} />
                      ) : (
                        <IoMdHeartEmpty size={25} onClick={handleWishList} />
                      )}
                    </span>
                    <div className="h-[200px] mt-[10px] flex flex-col w-[60%] pr-2">
                      <span className="font-bold line-clamp-1">
                        {item?.title}
                      </span>
                      <span className="flex gap-2">
                        <span className="bg-fGreen text-white font-semibold text-xs flex justify-center items-center gap-1 w-[40px] rounded-sm px-1 ">
                          {item?.rating?.rate} <TiStarFullOutline />
                        </span>
                        <span>{`${item?.rating?.count} Ratings`}</span>
                      </span>
                      <span className="overflow-hidden py-2 line-clamp-4 text-justify">
                        {item?.description}
                      </span>
                    </div>
                    <div className=" w-[18%] mx-1">
                      <span className="flex justify-between items-center">
                        <span className="text-xl font-bold">{`₹ 
                        ${calculateDiscount(item)}
                        `}</span>
                        {item?.isFAssured && (
                          <img
                            src={FAssured}
                            alt="Assured"
                            className="w-[40%] h-[20px]"
                          />
                        )}
                      </span>
                      <span className="flex gap-2">
                        <span className="text-base line-through text-gray-400">{`₹ ${
                          item?.price * 97
                        }`}</span>
                        <span className="text-fGreen font-semibold">{`${item?.discount} % off`}</span>
                      </span>
                      <span>free delivery</span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
