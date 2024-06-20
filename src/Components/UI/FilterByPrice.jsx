import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const FilterByPrice = ({
  setFilteredProductByPrice,
  products,
  calculateDiscount,
}) => {
  const [byPrice, setByPrice] = useState(0);
  const [filter, setFilter] = useState([
    { value: 1000, isChecked: false },
    { value: 2000, isChecked: false },
    { value: 5000, isChecked: false },
  ]);

  const handleByPrice = (value) => {
    setFilter((prevFilter) => {
      const updatedFilter = prevFilter.map((item) =>
        item.value === value ? { ...item, isChecked: !item.isChecked } : item
      );
      if (updatedFilter[0]?.isChecked) {
        setByPrice(updatedFilter[0]?.value);
      } else if (updatedFilter[1]?.isChecked) {
        setByPrice(updatedFilter[1]?.value);
      } else if (updatedFilter[2]?.isChecked) {
        setByPrice(updatedFilter[2]?.value);
      } else {
        setByPrice(0);
      }
      return updatedFilter;
    });
  };

  useEffect(() => {
    if (!filter[0].isChecked && !filter[1].isChecked && !filter[2].isChecked) {
      setByPrice(0);
      setFilteredProductByPrice({
        prod: [...products],
        isFilterOn: false,
      });
    } else {
      if (byPrice) {
        for (let i = 0; i < filter?.length; i++) {
          if (filter[i]?.isChecked === true) {
            setFilteredProductByPrice({
              prod: [
                ...products.filter(
                  (product) => calculateDiscount(product) >= byPrice
                ),
              ],
              isFilterOn: true,
            });
            break;
          }
        }
      }
    }
  }, [byPrice, filter]);

  return (
    <div className=" p-4 text-sm flex flex-col">
      <span className=" font-semibold pb-2">PRICE</span>
      {filter.map((item, i) => (
        <div className="flex gap-2 items-center" key={i}>
          <input
            type="checkbox"
            value={item?.value}
            checked={item?.isChecked}
            onChange={() => handleByPrice(item?.value)}
          />
          <span>{"more than " + item?.value}</span>
        </div>
      ))}
    </div>
  );
};

FilterByPrice.propTypes = {
  setFilteredProductByPrice: PropTypes.func,
  products: PropTypes.array,
  calculateDiscount: PropTypes.func,
};
export default FilterByPrice;
