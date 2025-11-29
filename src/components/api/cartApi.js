import axiosPrivate from "../../utils/axiosPrivate";

export const addToCartApi = async (payload) => {
  return await axiosPrivate.post("/cart/add", payload);
};

export const getCartApi = async () => {
  return await axiosPrivate.get("/cart");
};