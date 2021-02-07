import { useState } from "react";
import { CartItem } from "../pages/customize";

export type CartConfig = {
  cart: Array<CartItem>;
  addToCart: (item: CartItem) => void;
};

const useCart: () => CartConfig = () => {
  const [cart, setCart] = useState<Array<CartItem>>([]);

  const addToCart = (item: CartItem) => {
    setCart([...cart, item]);
  };

  return {
    addToCart: addToCart,
    cart: cart,
  };
};

export default useCart;
