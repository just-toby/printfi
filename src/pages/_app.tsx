import "../styles/globals.css";
import { AppProps } from "next/app";
import useCart, { CartConfig } from "../hooks/useCart";
import { CartContext } from "../context/CartContext";
import {Web3ReactProvider } from '@web3-react/core'
import React from "react";
import { AssetsContextProvider } from "../context/AssetsContextProvider";
import getLibrary from '../utils/getLibrary'
import ThemeProvider, { FixedGlobalStyle, ThemedGlobalStyle } from '../components/theme'

function MyApp({ Component, pageProps }: AppProps) {
  const cartConfig: CartConfig = useCart();

  return (
      <Web3ReactProvider getLibrary={getLibrary}>
        <FixedGlobalStyle/> 
        <AssetsContextProvider>
          <ThemeProvider>
            <ThemedGlobalStyle />
            <CartContext.Provider value={cartConfig}>
              <Component {...pageProps} />
            </CartContext.Provider>
          </ThemeProvider>
        </AssetsContextProvider>
      </Web3ReactProvider>
  );
}

export default MyApp;