import "../styles/globals.css";
import { AppProps } from "next/app";
import useCart, { CartConfig } from "../hooks/useCart";
import { CartContext } from "../context/CartContext";
import { Web3ModalContextProvider } from "../context/Web3ModalContextProvider";
import React from "react";
import { AssetsContextProvider } from "../context/AssetsContextProvider";

function MyApp({ Component, pageProps }: AppProps) {
  const cartConfig: CartConfig = useCart();

  return (
    <Web3ModalContextProvider>
      <AssetsContextProvider>
        <CartContext.Provider value={cartConfig}>
          <Component {...pageProps} />
        </CartContext.Provider>
      </AssetsContextProvider>
    </Web3ModalContextProvider>
  );
}

export default MyApp;
