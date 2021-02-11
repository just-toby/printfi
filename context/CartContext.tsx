import React from "react";
import { CartConfig, CartItem } from "../hooks/useCart";

const CartContext = React.createContext<CartConfig>({
  cart: [],
  addToCart: (item: CartItem) => {},
  clearCart: () => {},
});

export { CartContext };
