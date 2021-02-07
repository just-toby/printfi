import "../styles/globals.css";
import { AppProps } from "next/app";
import { Web3ModalConfig, Web3ModalContext } from "../context/Web3ModalContext";
import { useWeb3ModalContext } from "../context/useWeb3ModalContext";
import useAssets, { AssetsConfig } from "../hooks/useAssets";
import { AssetsContext } from "../context/AssetsContext";
import useCart, { CartConfig } from "../hooks/useCart";
import { CartContext } from "../context/CartContext";

function MyApp({ Component, pageProps }: AppProps) {
  const web3Config: Web3ModalConfig = useWeb3ModalContext();
  const assetsConfig: AssetsConfig = useAssets(web3Config.address);
  const cartConfig: CartConfig = useCart();

  return (
    <Web3ModalContext.Provider value={web3Config}>
      <AssetsContext.Provider value={assetsConfig}>
        <CartContext.Provider value={cartConfig}>
          <Component {...pageProps} />
        </CartContext.Provider>
      </AssetsContext.Provider>
    </Web3ModalContext.Provider>
  );
}

export default MyApp;
