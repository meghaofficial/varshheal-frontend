import { useState } from "react";
import { addToCartApi, getCartApi } from "../api/cartApi";

export default function useCart() {
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState([]);

  const getCart = async () => {
    try {
      const res = await getCartApi();
      setCart(res.data.items || []);
    } catch (err) {
      console.error(err);
    }
  };

  const addToCart = async ({ productId, price, quantity = 1, variant }) => {
    try {
      setLoading(true);

      const res = await addToCartApi({
        productId,
        quantity,
        price,
        variant,
      });

      setCart(res.data.items);

      return res.data;
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { cart, loading, addToCart, getCart };
}
