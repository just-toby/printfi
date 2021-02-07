import React from "react";
import { CartConfig } from "../hooks/useCart";
import { CartItem } from "../pages/customize";

const CartContext = React.createContext<CartConfig>({
    cart: [],
    addToCart: (item: CartItem) => {}
});

export { CartContext };
