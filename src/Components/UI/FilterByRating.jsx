import { useEffect, useState } from "react";
import { TiStarFullOutline } from "react-icons/ti";
import PropTypes from "prop-types";

const FilterByRating = ({ setFilteredProductByRating, products }) => {
  const [filter, setFilter] = useState([
    { value: 2, isChecked: false },
    { value: 3, isChecked: false },
    { value: 4, isChecked: false },
  ]);
  const [byRating, setByRating] = useState(0);

  const handleFilterByRating = (value) => {
    setFilter((prevFilter) => {
      const updatedFilter = prevFilter.map((item) =>
        item.value === value ? { ...item, isChecked: !item.isChecked } : item
      );
      if (updatedFilter[0]?.isChecked) {
        setByRating(updatedFilter[0]?.value);
      } else if (updatedFilter[1]?.isChecked) {
        setByRating(updatedFilter[1]?.value);
      } else if (updatedFilter[2]?.isChecked) {
        setByRating(updatedFilter[2]?.value);
      } else {
        setByRating(0);
      }
      return updatedFilter;
    });
  };

  useEffect(() => {
    if (!filter[0].isChecked && !filter[1].isChecked && !filter[2].isChecked) {
      setByRating(0);
      setFilteredProductByRating({
        prod: [...products],
        isFilterOn: false,
      });
    } else {
      if (byRating) {
        for (let i = 0; i < filter?.length; i++) {
          if (filter[i].isChecked === true) {
            setFilteredProductByRating({
              prod: [
                ...products.filter(
                  (product) => product?.rating?.rate >= byRating
                ),
              ],
              isFilterOn: true,
            });
            break;
          }
        }
      }
    }
  }, [byRating, filter]);

  return (
    <div className=" p-4 text-sm flex flex-col">
      <span className=" font-semibold pb-2">CUSTOMER RATING</span>
      <span>
        {filter?.map((fil, i) => (
          <label key={i} className="flex gap-2 items-center">
            <input
              type="checkbox"
              value={fil?.value}
              checked={fil?.isChecked}
              onChange={() => handleFilterByRating(fil?.value)}
            />
            <span
              className={`flex items-center gap-1 ${
                byRating && fil?.isChecked ? "bg-gray-300" : ""
              }`}
            >
              {`${fil?.value} `}
              <TiStarFullOutline /> {` & above `}
            </span>
          </label>
        ))}
      </span>
    </div>
  );
};

FilterByRating.propTypes = {
  setFilteredProductByRating: PropTypes.func,
  products: PropTypes.array,
};

export default FilterByRating;
