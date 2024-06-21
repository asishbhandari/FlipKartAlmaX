import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FaBolt } from "react-icons/fa";
import { IoCart } from "react-icons/io5";
import { IoMdHeart } from "react-icons/io";
import {
  addToCart,
  addToWishList,
  removeFromWishList,
} from "../redux/Features/userSlice";
import { Zoom, toast } from "react-toastify";
import { TiStarFullOutline } from "react-icons/ti";
import FAssured from "../assets/fassured.png";
import { FaTag } from "react-icons/fa";
import { offersList } from "../utils/Constant";
import TopCategory from "../Components/UI/TopCategory";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [wishList, setWishList] = useState([]);
  const list = useSelector((state) => state?.user?.wishList);
  const data = useSelector((state) => state?.ui?.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isWishList, setIsWishList] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const cartList = useSelector((state) => state?.user?.cartItems);

  const calculateDiscount = (num) => {
    return Math.round(num?.price * 97 * (1 - num?.discount / 100));
  };

  const token = localStorage.getItem("token");

  const handleWishList = () => {
    if (!token) {
      toast.info("Need to be logged In", { transition: Zoom });
    } else if (isWishList) {
      dispatch(removeFromWishList(product));
      setIsWishList(false);
      toast.success("Removed from wishList", { transition: Zoom });
    } else {
      dispatch(addToWishList(product));
      toast.success("Added to wishList", { transition: Zoom });
    }
  };

  const handleAddToCart = () => {
    if (!token) {
      toast.info("Need to be logged In", { transition: Zoom });
    } else if (isAdded) {
      toast.info("Already added", { transition: Zoom });
    } else {
      dispatch(addToCart(product));
      toast.success("Added to Cart", { transition: Zoom });
    }
  };

  const handleBuy = () => {
    if (!token) {
      toast.info("Need to be logged In", { transition: Zoom });
    } else {
      navigate("/cartPage");
    }
  };

  useEffect(() => {
    setIsAdded(cartList?.some((item) => item.id === product.id));
  }, [cartList, product]);

  useEffect(() => {
    setWishList([...list]);
  }, [list]);

  useEffect(() => {
    wishList.forEach((pro) => {
      if (pro?.id === product?.id) {
        setIsWishList(true);
      }
    });
  }, [wishList, product]);

  useEffect(() => {
    setProduct({ ...data?.filter((item) => item.id === parseInt(id))[0] });
  }, [id, data]);

  return (
    <div className="flex flex-col min-h-screen">
      <TopCategory />
      <div className="flex flex-col md:flex-row w-[90%] bg-white mx-auto md:h-[90vh] p-4 gap-4 mt-2">
        {/*  */}
        <div className=" flex flex-col max-w-[500px] max-h-[500px] mx-auto relative">
          <div className="h-[80%] mb-4 w-full px-14 py-4 mx-auto border border-gray-400 ">
            <img
              src={product?.image}
              alt={product?.title}
              className="w-full h-full lg:max-w-[352px] lg:max-h-[352px] my-auto  object-contain"
            />
          </div>
          <span className="absolute top-4 right-4">
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
          <div className="flex gap-2">
            {isAdded ? (
              <button
                onClick={() => navigate("/cartPage")}
                className={`w-[49%] bg-[#FF9F00] text-white flex items-center justify-center gap-2 text-xs sm:text-sm md:text-base lg:text-lg font-semibold py-4 rounded-sm `}
              >
                <IoCart />
                Go TO CART
              </button>
            ) : (
              <button
                onClick={handleAddToCart}
                className={`w-[49%] bg-[#FF9F00] text-white flex items-center justify-center gap-2 text-xs sm:text-sm md:text-base lg:text-lg font-semibold py-4 rounded-sm `}
              >
                <IoCart />
                ADD TO CART
              </button>
            )}
            <button
              onClick={handleBuy}
              className="w-[49%] bg-[#FB641B]  text-white flex items-center justify-center gap-2 text-xs sm:text-sm md:text-base lg:text-lg font-semibold py-4 rounded-sm"
            >
              <FaBolt />
              Buy Now
            </button>
          </div>
        </div>
        <div className="md:w-[65%] md:h-[80%] w-full mx-auto md:overflow-y-scroll flex flex-col gap-2">
          {/* top category hierarchy */}
          <div className=" text-gray-500 text-base line-clamp-1">
            <span
              onClick={() => navigate("/")}
              className="cursor-pointer hover:text-fBlue"
            >{`Home > `}</span>
            <span
              className="cursor-pointer hover:text-fBlue"
              onClick={() => navigate(`/category/${product?.category}`)}
            >
              {`${product?.category} > `}
            </span>
            <span className="cursor-pointer hover:text-fBlue ">
              {product?.title}
            </span>
          </div>

          {/*  */}
          <div className="mt-[10px] flex flex-col gap-2">
            <h2 className="text-2xl line-clamp-1">{product?.title}</h2>
            <span className="flex gap-2 text-lg items-center">
              <span className="bg-fGreen text-white font-semibold flex justify-center items-center gap-1 w-[60px] rounded-sm px-1 ">
                {product?.rating?.rate} <TiStarFullOutline />
              </span>
              <span>{`${product?.rating?.count} Ratings`}</span>
              {product?.isFAssured && (
                <img src={FAssured} alt="Assured" className=" h-[25px]" />
              )}
            </span>
          </div>

          {/* Price  */}
          <div className="mt-[10px] flex flex-col text-lg gap-2">
            <span className="text-fGreen text-xl font-semibold">
              Extra ₹2100 Off
            </span>
            <span className="flex gap-2 items-center">
              <span className="text-3xl font-semibold">{`₹${calculateDiscount(
                product
              )}`}</span>
              <span className=" line-through text-gray-400">{`₹ ${
                product?.price * 97
              }`}</span>
              <span className="text-fGreen  font-semibold">{`${product?.discount}% off`}</span>
            </span>
            <span>free delivery</span>
          </div>

          {/* offers */}
          <div className="mt-[10px] flex flex-col gap-2">
            <span>Available offers</span>
            {offersList?.map((offer, i) => (
              <div key={i}>
                <span className="flex items-center gap-2">
                  <FaTag className="text-fGreen min-w-6" />
                  <span className="font-medium min-w-fit">
                    {offer.offerName}
                  </span>
                  <span className="truncate">{offer.offer}</span>
                  <span className="text-fBlue">T&C</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
