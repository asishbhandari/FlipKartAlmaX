import { useEffect, useState } from "react";
import FAssured from "../../assets/fassured.png";
import PropTypes from "prop-types";

const FilterByFAssured = ({ products, setFilteredProductByFAssured }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleFilterByFAssured = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    if (!isChecked) {
      setFilteredProductByFAssured({
        prod: [...products],
        isFilterOn: false,
      });
    } else {
      setFilteredProductByFAssured({
        prod: [...products.filter((product) => product?.isFAssured === true)],
        isFilterOn: true,
      });
    }
  }, [isChecked]);

  return (
    <div className="flex gap-2 items-center">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => handleFilterByFAssured()}
      />
      <img src={FAssured} alt="Assured" className="h-[20px]" />
    </div>
  );
};

FilterByFAssured.propTypes = {
  products: PropTypes.array,
  setFilteredProductByFAssured: PropTypes.func,
};

export default FilterByFAssured;
