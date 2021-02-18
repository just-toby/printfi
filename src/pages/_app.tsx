import "../styles/globals.css";
import { AppProps } from "next/app";
import useCart, { CartConfig } from "../hooks/useCart";
import { CartContext } from "../context/CartContext";
import { Web3ReactProvider } from "@web3-react/core";
import React from "react";
import { AssetsContextProvider } from "../context/AssetsContextProvider";
import "../styles/App.css";
import "react-toastify/dist/ReactToastify.css";
import getLibrary from "../utils/getLibrary";
import ThemeProvider, {
  FixedGlobalStyle,
  ThemedGlobalStyle,
} from "../components/theme";
// This is intended to be a modified version of Bootstrap which includes Form stylings only.
// If you're noticing your styles not working, check if this file is overriding them.
// TODO(just-toby): replace our address form and remove bootstrap from the project entirely.
import "../styles/Forms.css";

function MyApp({ Component, pageProps }: AppProps) {
  const cartConfig: CartConfig = useCart();

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <FixedGlobalStyle />
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
