// import React from 'react'
import SearchBox from "../SearchBox/SearchBox";
import logo from "../../assets/logo.png";
import { PiUserCircle } from "react-icons/pi";
import { MdKeyboardArrowUp } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoCart } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
import PropTypes from "prop-types";
import logoWhite from "../../assets/logowhite.png";
import { useDispatch, useSelector } from "react-redux";
import { selectCategory } from "../../redux/Features/uiSlice";
import { removeUser } from "../../redux/Features/userSlice";

const Navbar = ({ isHome }) => {
  const [onHover, setOnHover] = useState(false);
  const [noOfCartItem, setNoOfCartItems] = useState(0);
  const cartLength = useSelector((state) => state?.user?.cartLength); // get the no of cart items from redux state
  const token = localStorage.getItem("token");
  const user = useSelector((state) => state?.user?.name);

  const dispatch = useDispatch();

  const handleMouseEnter = () => setOnHover(true);
  const handleMouseLeave = () => setOnHover(false);

  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("uid");
    dispatch(removeUser());
    if (!isHome) {
      navigate("/");
    }
  };

  useEffect(() => {
    const element = document.getElementById("HoverChange"); // getting dom element by id
    const elementMenu = document?.getElementById("menuHover"); // getting dom element by id

    if (element || elementMenu) {
      element.addEventListener("mouseenter", handleMouseEnter);
      element.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        // Cleanup function on unmount
        element.removeEventListener("mouseenter", handleMouseEnter);
        element.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [onHover]); // Dependency array: Only re-attach/detach on onHover change

  useEffect(() => {
    setNoOfCartItems(cartLength);
  }, [cartLength]);

  return (
    <div className={`w-full ${isHome ? "bg-white" : "bg-fBlue"} `}>
      <nav className="w-full px-2 gap-2 md:w-[80%] md:mx-auto  h-[70px] items-center flex md:justify-between md:gap-4">
        <div
          className=" h-full flex items-center cursor-pointer"
          onClick={() => {
            dispatch(selectCategory(null));
            navigate("/");
          }}
        >
          <img
            src={isHome ? logo : logoWhite}
            alt="flipkart"
            className="h-[40px] "
          />
        </div>
        <span className="grow md:hidden"></span>
        <SearchBox />
        <div
          className={`flex items-center gap-1 rounded-lg font-semibold ${
            isHome
              ? "hover:bg-[#2874F0] hover:text-white"
              : token
              ? "bg-fBlue text-white"
              : "bg-white text-fBlue px-4"
          } px-2 py-2 cursor-pointer relative`}
          id="HoverChange"
          onClick={() => {
            if (!token) {
              navigate("/signUp");
            }
          }}
        >
          {isHome && <PiUserCircle size={25} />}
          {token ? <span>{user}</span> : <span>Login</span>}
          <span>
            {onHover ? (
              <div>
                {isHome && <MdKeyboardArrowUp />}
                <div
                  className={`flex justify-between absolute bottom-[-100%] left-0 bg-white min-w-[200px] p-2 cursor-pointer rounded-lg`}
                  id="menuHover"
                >
                  {token ? (
                    <span
                      className="text-black hover:text-fBlue"
                      onClick={handleLogOut}
                    >
                      LogOut
                    </span>
                  ) : (
                    <>
                      <span className="text-black">New Customer?</span>
                      <span
                        className="text-fBlue font-bold"
                        onClick={() => navigate("/signUp")}
                      >
                        Sign Up
                      </span>
                    </>
                  )}
                </div>
              </div>
            ) : (
              isHome && <MdKeyboardArrowDown />
            )}
          </span>
        </div>
        <div
          className="flex items-center gap-2 cursor-pointer relative"
          onClick={() => navigate("/cartPage")}
        >
          {isHome ? (
            <span>
              <IoCartOutline size={25} />
            </span>
          ) : (
            <span className="text-white ">
              <IoCart size={25} />
            </span>
          )}
          {noOfCartItem > 0 && (
            <span
              className="rounded-full w-[20px] h-[20px] flex items-center justify-center
             bg-fRed border border-white absolute top-[-40%] left-[10%]"
            >
              {noOfCartItem}
            </span>
          )}
          <span
            className={`font-bold hidden md:block ${
              isHome ? "" : "text-white"
            }`}
          >
            Cart
          </span>
        </div>
      </nav>
    </div>
  );
};

Navbar.propTypes = {
  isHome: PropTypes.bool,
};

export default Navbar;
