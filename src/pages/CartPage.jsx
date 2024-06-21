import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addQuantity,
  addToCart,
  addToWishList,
  removeCartItem,
  removeFromCart,
  removeFromWishList,
  removeQuantity,
} from "../redux/Features/userSlice";
import { Zoom, toast } from "react-toastify";
import CartProduct from "../Components/CartProduct/CartProduct";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { FcOk } from "react-icons/fc";
import { IoCloseCircle } from "react-icons/io5";

const CartPage = () => {
  const [cartList, setCartList] = useState([]);
  const [wishList, setWishList] = useState([]);
  const cart = useSelector((state) => state?.user?.cartItems);
  const wish = useSelector((state) => state?.user?.wishList);
  const dispatch = useDispatch();
  const [submit, setSubmit] = useState(false);
  let noOfItem = cartList.map((pro) => pro?.noOfItem);

  const calculateDiscount = (num) => {
    return Math.round(num?.price * 97 * (1 - num?.discount / 100));
  };

  const handleSaveForLater = (item) => {
    dispatch(removeFromCart(item));
    let isAdded = wishList.some((pro) => pro?.id === item?.id);
    if (!isAdded) {
      dispatch(addToWishList(item));
    }
    toast.success("Added to WishList", { transition: Zoom });
  };

  const handleRemove = (item, type) => {
    if (type === "cart") {
      dispatch(removeFromCart(item));
      toast.success("Removed From Cart", { transition: Zoom });
    } else {
      dispatch(removeFromWishList(item));
      toast.success("Removed From WishList", { transition: Zoom });
    }
  };

  const handleAddToCart = (item) => {
    let isAdded = cartList.some((pro) => pro?.id === item?.id);
    dispatch(removeFromWishList(item));
    if (!isAdded) {
      dispatch(addToCart(item));
    }
    toast.success("Removed From Cart", { transition: Zoom });
  };

  const calculateTotalPrice = () => {
    let totalPrice = cartList.reduce(
      (a, pro) => a + Math.floor(pro?.price * 97) * pro?.noOfItem,
      0
    );
    let discountedPriceSum = cartList.reduce(
      (a, pro) => a + calculateDiscount(pro) * pro?.noOfItem,
      0
    );
    let totalDiscount = totalPrice - discountedPriceSum;
    const allPrices = {
      totalPrice: totalPrice,
      discountedPriceSum: discountedPriceSum,
      totalDiscount: totalDiscount,
    };
    return allPrices;
  };

  const handleLess = (item, i) => {
    if (noOfItem[i] > 1) {
      noOfItem[i] -= 1;
      dispatch(removeQuantity(item));
    }
  };

  const handleAdd = (item, i) => {
    noOfItem[i] += 1;
    dispatch(addQuantity(item));
  };

  const handleOrderSubmit = () => {
    // clear all the cartlist state and show a modal of completed order
    setSubmit(true);
  };

  const handleCloseSubmit = () => {
    dispatch(removeCartItem());
    setSubmit(false);
  };

  useEffect(() => {
    setCartList(cart);
  }, [cart]);

  useEffect(() => {
    setWishList(wish);
  }, [wish]);

  return (
    <div className="w-[80%] mx-auto grid grid-cols-12 mt-2 gap-2">
      <div className="lg:hidden col-span-12 ">
        <div className="bg-white px-6 py-4 flex flex-col gap-4">
          <span className="font-medium text-lg  ">Price Detail</span>
          <span className="border border-gray-200 h-0 mt-2"></span>
          <span className="flex justify-between">
            <span className="">{`Price (${cartList?.length} items)`}</span>
            <span>{`₹${calculateTotalPrice()?.totalPrice}`}</span>
          </span>
          <span className="flex justify-between">
            <span className="">{`Discount`}</span>
            <span className="text-fGreen">{`-₹${
              calculateTotalPrice()?.totalDiscount
            }`}</span>
          </span>
          <span className="flex justify-between">
            <span className="">{`Delivery charges`}</span>
            <span className="text-fGreen flex gap-2">
              <span className="line-through text-gray-400">{`₹80`}</span>Free
            </span>
          </span>
          <span className="border border-gray-200 h-0 mt-2"></span>
          <span className="flex justify-between font-semibold">
            <span className="">{`Total Amount`}</span>
            <span className="">{`₹${
              calculateTotalPrice()?.discountedPriceSum
            }`}</span>
          </span>
          <span className="border border-gray-200 h-0 mt-2"></span>
          <span className="text-fGreen font-medium">{`You will save ₹${
            calculateTotalPrice()?.totalDiscount
          } on this order`}</span>
        </div>
        <div className="flex text-gray-500 px-6 py-4 gap-2">
          <AiFillSafetyCertificate size={40} />
          <span>
            Safe and Secure Payments.Easy returns.100% Authentic products.
          </span>
        </div>
      </div>
      <div className="col-span-12 lg:col-span-8 ">
        <div className=" border bg-white shadow-md border-gray-300 flex flex-col">
          <span className="font-medium text-lg px-6 pt-4">Cart Items</span>
          <span className="border border-gray-200 h-0 mt-2"></span>
          {cartList?.map((item, i) => (
            <CartProduct
              key={i}
              item={item}
              i={i}
              calculateDiscount={calculateDiscount}
              handleLess={handleLess}
              handleAdd={handleAdd}
              handleSaveForLater={handleSaveForLater}
              handleRemove={handleRemove}
              noOfItem={noOfItem}
              type={"cart"}
            />
          ))}
          {cartList.length === 0 ? (
            <span className="flex justify-center pr-6 h-[60px] py-2 font-medium text-lg">
              No Items in the cart Add some Items
            </span>
          ) : (
            <div className="flex justify-end pr-6 h-[60px] py-2">
              <button
                className={`bg-[#FB641B] text-white px-8 rounded-sm `}
                onClick={handleOrderSubmit}
              >
                PLACE ORDER
              </button>
            </div>
          )}
        </div>
        <div className="border shadow-md bg-white border-gray-300 my-4 flex flex-col">
          <span className="font-medium text-lg px-6 pt-4">
            Saved for Latter / WishList
          </span>
          {wishList?.map((item, i) => (
            <CartProduct
              key={`${item.price} ${i}`}
              item={item}
              i={i}
              calculateDiscount={calculateDiscount}
              handleLess={handleLess}
              handleAdd={handleAdd}
              handleSaveForLater={handleSaveForLater}
              handleRemove={handleRemove}
              handleAddToCart={handleAddToCart}
              noOfItem={noOfItem}
              type={"wish"}
            />
          ))}
        </div>
      </div>
      <div className="hidden lg:block lg:col-span-4 ">
        <div className="bg-white px-6 py-4 flex flex-col gap-4">
          <span className="font-medium text-lg  ">Price Detail</span>
          <span className="border border-gray-200 h-0 mt-2"></span>
          <span className="flex justify-between">
            <span className="">{`Price (${cartList?.length} items)`}</span>
            <span>{`₹${calculateTotalPrice()?.totalPrice}`}</span>
          </span>
          <span className="flex justify-between">
            <span className="">{`Discount`}</span>
            <span className="text-fGreen">{`-₹${
              calculateTotalPrice()?.totalDiscount
            }`}</span>
          </span>
          <span className="flex justify-between">
            <span className="">{`Delivery charges`}</span>
            <span className="text-fGreen flex gap-2">
              <span className="line-through text-gray-400">{`₹80`}</span>Free
            </span>
          </span>
          <span className="border border-gray-200 h-0 mt-2"></span>
          <span className="flex justify-between font-semibold">
            <span className="">{`Total Amount`}</span>
            <span className="">{`₹${
              calculateTotalPrice()?.discountedPriceSum
            }`}</span>
          </span>
          <span className="border border-gray-200 h-0 mt-2"></span>
          <span className="text-fGreen font-medium">{`You will save ₹${
            calculateTotalPrice()?.totalDiscount
          } on this order`}</span>
        </div>
        <div className="flex text-gray-500 px-6 py-4 gap-2">
          <AiFillSafetyCertificate size={40} />
          <span>
            Safe and Secure Payments.Easy returns.100% Authentic products.
          </span>
        </div>
      </div>
      {submit && (
        <div className="fixed top-0 left-0 w-[100%] h-[100vh] flex justify-center items-center overflow-auto bg-gray-200 bg-opacity-65">
          <div className=" w-[40%] relative mx-auto flex flex-col justify-center items-center gap-2 bg-white border border-gray-300 shadow-md p-6 ">
            <FcOk size={30} />
            <span>{`Payment SuccessFull`}</span>
            <IoCloseCircle
              size={25}
              className="absolute top-2 right-2 text-gray-500 cursor-pointer"
              onClick={handleCloseSubmit}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
