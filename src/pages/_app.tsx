import "../styles/globals.css";
import { AppProps } from "next/app";
import useCart, { CartConfig } from "../hooks/useCart";
import { CartContext } from "../context/CartContext";
import { Web3ModalContextProvider } from "../context/Web3ModalContextProvider";
import React from "react";
import { AssetsContextProvider } from "../context/AssetsContextProvider";
import "../styles/App.css"
import { Provider } from 'react-redux'
import store from '../state'

// Imports into the entire project. Therefore to find and use a style all you need to do is all it directly. No need to always import

function MyApp({ Component, pageProps }: AppProps) {
  const cartConfig: CartConfig = useCart();

  return (
    <Web3ModalContextProvider>
      <AssetsContextProvider>
        <Provider store={store}>
          <CartContext.Provider value={cartConfig}>
            <Component {...pageProps} />
          </CartContext.Provider>
        </Provider>
      </AssetsContextProvider>
    </Web3ModalContextProvider>
  );
}

export default MyApp;
