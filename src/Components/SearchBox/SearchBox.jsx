// import React from "react";
import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const [searchTerm, SetSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm?.length > 0) {
      navigate(`/searchPage/${searchTerm}`);
    }
  };

  return (
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
  );
};

export default SearchBox;
