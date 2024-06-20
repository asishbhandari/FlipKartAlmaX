import axios from "axios";
import { baseURL } from "../Constant";

export const fetchProducts = async () => {
  try {
    const res = await axios.get(`${baseURL}/products`);
    const products = res?.data?.map((product) => ({
      ...product,
      isFAssured: Math.random() < 0.5,
      discount: Math.floor(Math.random() * 100),
      noOfItem: 1,
    }));
    return products;
  } catch (error) {
    console.log(error);
  }
};
