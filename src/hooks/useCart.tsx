import { useState } from "react";
import { BorderOption, FrameColor, FrameSize } from "../utils/constants";

export type CartConfig = {
  cart: Array<CartItem>;
  addToCart: (item: CartItem) => void;
  clearCart: () => void;
};

export type ItemConfiguration = {
  size: FrameSize;
  color: FrameColor;
  border: BorderOption;
};

export type CartItem = {
  name: string;
  token_id: string;
  original_uri: string;
  preview_uri: string;
  collection_slug: string;
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
