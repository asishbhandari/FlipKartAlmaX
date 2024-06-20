import PropTypes from "prop-types";
import FAssured from "../../assets/fassured.png";
import moment from "moment";

const CartProduct = ({
  item,
  i,
  calculateDiscount,
  handleLess,
  handleAdd,
  handleSaveForLater,
  handleRemove,
  handleAddToCart,
  // noOfItem,
  type,
}) => {
  return (
    <div key={i} className="flex flex-col gap-4 justify-center ">
      {type === "wish" && (
        <span className="border border-gray-200 h-0 mt-2"></span>
      )}

      <div className={`px-6 ${type === "cart" ? "pt-4" : ""} flex gap-4`}>
        <div className="w-[20%] h-[150px] ">
          <img
            src={item?.image}
            alt={item?.name}
            className="object-contain h-[150px] mx-auto"
          />
        </div>
        <div className="flex flex-col w-[60%] gap-2">
          <span className="max-w-full truncate">{item?.title}</span>
          {item?.isFAssured && (
            <img src={FAssured} alt="FAssured" className="h-[20px] w-[80px]" />
          )}
          <div className="flex gap-2 items-center">
            <span className="text-base line-through text-gray-400">{`₹ ${Math.floor(
              item?.price * 97
            )}`}</span>
            <span className="text-xl font-bold">{`₹ 
                        ${calculateDiscount(item)}
                        `}</span>
            <span className="text-fGreen font-semibold">{`${item?.discount} % off`}</span>
          </div>
        </div>
        {type === "cart" && (
          <div className="flex justify-center w-[20%]">
            {`Delivery by ${moment()
              .add(Math.floor(Math.random() * (9 - 4 + 1)) + 4, "days")
              .format("ddd MMM DD")}`}
          </div>
        )}
      </div>
      <div className="px-6 flex gap-2">
        <div className="w-[20%] ">
          <div className="flex gap-4 justify-center ">
            <span
              className={`flex items-center justify-center rounded-full border cursor-pointer border-gray-400 text-xl font-bold w-6 h-6`}
              onClick={() => handleLess(item, i)}
            >
              -
            </span>
            <span className="flex items-center justify-center w-10 h-6 rounded-md border border-gray-400 text-xl font-medium">
              {item?.noOfItem}
            </span>
            <span
              onClick={() => handleAdd(item, i)}
              className={`flex items-center justify-center rounded-full border cursor-pointer border-gray-400 text-xl font-bold w-6 h-6`}
            >
              +
            </span>
          </div>
        </div>
        <div className="w-[60%] flex gap-4">
          {type === "cart" ? (
            <span
              className="font-semibold text-lg cursor-pointer"
              onClick={() => handleSaveForLater(item)}
            >
              SAVE FOR LATER
            </span>
          ) : (
            <span
              className="font-semibold text-lg cursor-pointer"
              onClick={() => handleAddToCart(item)}
            >
              MOVE TO CART
            </span>
          )}
          <span
            className="font-semibold text-lg cursor-pointer"
            onClick={() => handleRemove(item, type)}
          >
            REMOVE
          </span>
        </div>
      </div>
      {type === "cart" && (
        <span className="border border-gray-200 h-0 mb-2"></span>
      )}
    </div>
  );
};

CartProduct.propTypes = {
  item: PropTypes.array,
  i: PropTypes.number,
  calculateDiscount: PropTypes.func,
  handleLess: PropTypes.func,
  handleAdd: PropTypes.func,
  handleSaveForLater: PropTypes.func,
  handleRemove: PropTypes.func,
  handleAddToCart: PropTypes.func,
  noOfItem: PropTypes.array,
  type: PropTypes.string,
};

export default CartProduct;
