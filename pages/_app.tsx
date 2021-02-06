import "../styles/globals.css";
import { AppProps } from "next/app";
import { Web3ModalConfig, Web3ModalContext } from "./context/Web3ModalContext";
import { useWeb3ModalContext } from "./context/useWeb3ModalContext";

function MyApp({ Component, pageProps }: AppProps) {
  const config: Web3ModalConfig = useWeb3ModalContext();

  console.log(config);

  return (
    <Web3ModalContext.Provider value={config}>
      <Component {...pageProps} />
    </Web3ModalContext.Provider>
  );
}

export default MyApp;
