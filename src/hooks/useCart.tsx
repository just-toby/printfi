import { useState } from "react";
import { FrameColor } from "../components/TokenCard";

export type CartConfig = {
  cart: Array<CartItem>;
  addToCart: (item: CartItem) => void;
  clearCart: () => void;
};

export type ItemConfiguration = {
  size: string;
  frame: FrameColor;
  glass: string;
  space: string;
};

export type CartItem = {
  name: string;
  uri: string;
  config: ItemConfiguration;
};

const useCart: () => CartConfig = () => {
  const [cart, setCart] = useState<Array<CartItem>>([]);

  const addToCart = (item: CartItem) => {
    setCart([...cart, item]);
  };

  const clearCart = () => {
    setCart([]);
  };

  return {
    clearCart: clearCart,
    addToCart: addToCart,
    cart: cart,
  };
};

export default useCart;
