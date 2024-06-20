import { useEffect, useState } from "react";
import Carousal from "../Components/Carousal/Carousal";
import { categoryContent } from "../utils/Constant";
import { useNavigate } from "react-router-dom";
import { addProducts, selectCategory } from "../redux/Features/uiSlice";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../utils/Api/fetchProducts";

const HomePage = () => {
  const [data, setData] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCategorySelect = (name) => {
    dispatch(selectCategory(name));
    navigate(`/category/${name}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchProducts();
        setData(res);
        dispatch(addProducts(res));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [dispatch]);
  return (
    <div className="w-[98%] mx-auto flex flex-col">
      <div className="bg-white mt-2 h-[100px] md:h-[200px] ">
        <div className="w-[90%] md:w-[60%] mx-auto h-full flex justify-between overflow-x-scroll sm:overflow-x-hidden">
          {categoryContent?.map((item, i) => (
            <div
              key={i}
              className="flex flex-col my-auto h-[90%] md:h-[90%] w-[200px] gap-[1%] justify-center items-center cursor-pointer"
              onClick={() => handleCategorySelect(item?.name?.toLowerCase())}
            >
              <img
                src={item.url}
                alt={item.name}
                className="px-2 w-[90%] mx-auto h-[70%] object-contain aspect-auto bg-white"
              />
              <p className="md:font-medium text-sm md:text-lg line-clamp-1">
                {item.name}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className=" mt-4 w-full h-[calc(100vw / 1.6)] ">
        <Carousal />
      </div>
      <div className="w-full md:w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2 mt-4 gap-4 ">
        <div className="bg-white p-4 w-full">
          <span className="text-2xl font-bold">{categoryContent[0]?.name}</span>
          <div className="grid grid-cols-2 mt-2 ">
            {data
              .filter(
                (a) => a.category === categoryContent[0]?.name.toLowerCase()
              )
              .slice(0, 4)
              .map((item, i) => {
                if (item)
                  return (
                    <div
                      key={i}
                      className="w-full h-[300px] md:h-[400px] border border-gray-200 py-2 cursor-pointer "
                      onClick={() => navigate(`/product/${item?.id}`)}
                    >
                      <img
                        src={item?.image}
                        alt={item?.title}
                        className="w-full h-[90%] object-contain"
                      />
                      <p className="truncate px-2">{item.title}</p>
                    </div>
                  );
              })}
          </div>
        </div>
        <div className="bg-white p-4">
          <span className="text-2xl font-bold">{categoryContent[1]?.name}</span>
          <div className="grid grid-cols-2 mt-2">
            {data
              .filter(
                (a) => a.category === categoryContent[1]?.name.toLowerCase()
              )
              .slice(0, 4)
              .map((item, i) => {
                if (item)
                  return (
                    <div
                      key={i}
                      className="w-full h-[400px] border border-gray-200 py-2 cursor-pointer "
                      // onClick={} // onclick should navigate to product page
                    >
                      <img
                        src={item?.image}
                        alt={item?.title}
                        className="w-full h-[90%] object-contain"
                      />
                      <p className="truncate px-2">{item.title}</p>
                    </div>
                  );
              })}
          </div>
        </div>
        <div className="bg-white p-4">
          <span className="text-2xl font-bold">{categoryContent[2]?.name}</span>
          <div className="grid grid-cols-2 mt-2">
            {data
              .filter(
                (a) => a.category === categoryContent[2]?.name.toLowerCase()
              )
              .slice(0, 4)
              .map((item, i) => {
                if (item)
                  return (
                    <div
                      key={i}
                      className="w-full h-[400px] border border-gray-200 py-2 cursor-pointer "
                      // onClick={} // onclick should navigate to product page
                    >
                      <img
                        src={item?.image}
                        alt={item?.title}
                        className="w-full h-[90%] object-contain"
                      />
                      <p className="truncate px-2">{item.title}</p>
                    </div>
                  );
              })}
          </div>
        </div>
        <div className="bg-white p-4">
          <span className="text-2xl font-bold">{categoryContent[3]?.name}</span>
          <div className="grid grid-cols-2 mt-2">
            {data
              .filter(
                (a) => a.category === categoryContent[3]?.name.toLowerCase()
              )
              .slice(0, 4)
              .map((item, i) => {
                if (item)
                  return (
                    <div
                      key={i}
                      className="w-full h-[400px] border border-gray-200 py-2 cursor-pointer "
                      // onClick={} // onclick should navigate to product page
                    >
                      <img
                        src={item?.image}
                        alt={item?.title}
                        className="w-full h-[90%] object-contain"
                      />
                      <p className="truncate px-2">{item.title}</p>
                    </div>
                  );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
