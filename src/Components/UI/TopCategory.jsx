import { useDispatch } from "react-redux";
import { categoryContent } from "../../utils/Constant";
import { useNavigate } from "react-router-dom";
import { selectCategory } from "../../redux/Features/uiSlice";
import PropTypes from "prop-types";

const TopCategory = ({ selectedCategory }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
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
  );
};
TopCategory.propTypes = {
  selectedCategory: PropTypes.string,
};

export default TopCategory;
