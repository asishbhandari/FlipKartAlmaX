import { useEffect, useRef, useState } from "react";
import { carousalItem } from "../../utils/Constant";

const Carousal = () => {
  const [current, setCurrent] = useState(0);
  const carousalRef = useRef(null);
  const interval = 3000;

  const handleNext = () => {
    setCurrent((cur) => (cur + 1) % carousalItem?.length);
  };

  const handlePre = () => {
    setCurrent((cur) => (cur === 0 ? carousalItem.length - 1 : cur - 1));
  };

  useEffect(() => {
    const autoChange = setInterval(() => {
      handleNext();
    }, interval);

    return () => {
      clearInterval(autoChange);
    };
  }, []);

  return (
    <div ref={carousalRef} className="relative overflow-hidden w-full h-full">
      <span
        className={`absolute top-1/2 left-0 h-[40%] w-[3%] flex items-center md:font-bold md:text-lg text-xs sm:text-base rounded-r-md transform -translate-y-1/2 md:p-2 bg-white hover:bg-opacity-75 disabled:opacity-50 cursor-pointer`}
        onClick={handlePre}
      >
        {"<"}
      </span>
      <div className="flex transition duration-500 ease-linear">
        {carousalItem?.map((item, i) => (
          <div
            key={i}
            className={`flex-shrink-0 w-full ${
              current === i ? "block" : "hidden"
            }`}
          >
            <img src={item.url} alt="carousal" />
          </div>
        ))}
      </div>
      <span
        className={`absolute top-1/2 right-0 h-[40%] w-[3%] flex items-center md:font-bold md:text-lg text-xs sm:text-base rounded-l-md transform -translate-y-1/2 md:p-2 bg-white hover:bg-opacity-75 disabled:opacity-50 cursor-pointer`}
        onClick={handleNext}
      >
        {">"}
      </span>
    </div>
  );
};

export default Carousal;
