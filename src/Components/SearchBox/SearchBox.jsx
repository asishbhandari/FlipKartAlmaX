// import React from "react";
import { useState } from "react";
import { IoCloseCircle, IoSearchOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const [searchTerm, SetSearchTerm] = useState("");
  const navigate = useNavigate();
  const [submit, setSubmit] = useState(false);

  const handleSearch = () => {
    if (searchTerm?.length > 0) {
      navigate(`/searchPage/${searchTerm}`);
      setSubmit(false);
    }
  };

  const handleOpenSearchOnSmallDevices = () => {
    // add logic to search on small devices
    setSubmit(true);
  };

  const handleCloseSubmit = () => {
    setSubmit(false);
  };

  return (
    <>
      <div className="items-center gap-2 h-[40px] bg-[#F0F5FF] md:grow w-[50px] px-2 rounded-lg hidden md:flex">
        <IoSearchOutline size={25} onClick={handleSearch} />
        <input
          type="text"
          placeholder="Search for Product, Brands and More"
          className="bg-[#F0F5FF] outline-none w-full "
          value={searchTerm}
          onChange={(e) => SetSearchTerm(e.target.value)}
          onKeyUp={(e) => (e.key === "Enter" ? handleSearch() : "")}
        />
      </div>
      <IoSearchOutline
        size={25}
        onClick={handleOpenSearchOnSmallDevices}
        className=" md:hidden text-white"
      />
      {submit && (
        <div className="fixed top-0 left-0 w-[100%] h-[100vh] overflow-auto bg-gray-500 bg-opacity-50 z-50">
          <div className=" w-[80%] relative mx-auto mt-2 flex items-center gap-2 bg-white border border-gray-300 shadow-md px-2  h-[50px]">
            <input
              type="text"
              placeholder="Search for Product, Brands and More"
              className="bg-white outline-none w-full h-full"
              value={searchTerm}
              onChange={(e) => SetSearchTerm(e.target.value)}
              onKeyUp={(e) => (e.key === "Enter" ? handleSearch() : "")}
            />
            <IoCloseCircle
              size={25}
              className=" text-gray-500 cursor-pointer"
              onClick={handleCloseSubmit}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default SearchBox;
