import { useEffect, useState } from "react";
import { IoMdHeart } from "react-icons/io";
import { TiStarFullOutline } from "react-icons/ti";
import FAssured from "../../assets/fassured.png";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishList,
  removeFromWishList,
} from "../../redux/Features/userSlice";
import { Zoom, toast } from "react-toastify";

const ProductCard = ({ item, calculateDiscount }) => {
  const [wishList, setWishList] = useState([]);
  const list = useSelector((state) => state?.user?.wishList);
  const dispatch = useDispatch();
  const [isWishList, setIsWishList] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleWishList = () => {
    if (!token) {
      toast.info("Need to be logged In", { transition: Zoom });
    } else if (isWishList) {
      dispatch(removeFromWishList(item));
      setIsWishList(false);
      toast.success("Removed from wishList", { transition: Zoom });
    } else {
      dispatch(addToWishList(item));
      toast.success("Added to wishList", { transition: Zoom });
    }
  };

  useEffect(() => {
    setWishList([...list]);
  }, [list]);

  useEffect(() => {
    wishList.forEach((product) => {
      if (product?.id === item?.id) {
        setIsWishList(true);
      }
    });
  }, [wishList, item]);
  return (
    <div className="w-full md:h-[250px] flex flex-col">
      <span className="w-full h-0 border border-gray-300"></span>
      {item.id === undefined ? (
        <span> No Products that matched these filters</span>
      ) : (
        <div className="grid grid-cols-12 my-auto w-full p-4 md:p-2">
          <div className="md:col-span-2 col-span-7 flex">
            <img
              src={item.image}
              alt={item.name}
              className="w-[90%] h-[200px] object-contain mx-auto my-auto pl-2 cursor-pointer"
              onClick={() => navigate(`/product/${item.id}`)}
            />
            <span className="w-[10%] pr-2">
              {
                <IoMdHeart
                  size={25}
                  onClick={handleWishList}
                  className={`cursor-pointer ${
                    isWishList ? "text-[#FF5555]" : "text-gray-300"
                  }`}
                />
              }
            </span>
          </div>
          <div className="md:col-span-8 hidden md:flex flex-col pl-4 pr-2">
            <span className="font-bold line-clamp-1">{item?.title}</span>
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
          <div className="md:col-span-2 col-span-5 flex flex-col justify-center md:justify-start">
            <span className="flex md:justify-between items-center">
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

          {/* visible below md screen */}
          <div className="md:hidden col-span-12 flex flex-col pl-4 pr-2">
            <span className="font-bold line-clamp-1">{item?.title}</span>
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
        </div>
      )}
    </div>
  );
};

ProductCard.propTypes = {
  item: PropTypes.object,
  calculateDiscount: PropTypes.func,
};

export default ProductCard;
