import { PropsWithChildren } from "react";
import { useWeb3ModalContext } from "../hooks/useWeb3ModalContext";
import { Web3ModalConfig, Web3ModalContext } from "./Web3ModalContext";

export interface Web3ModalContextProviderProps {}

const Web3ModalContextProvider: React.FC<
  PropsWithChildren<Web3ModalContextProviderProps>
> = (props: PropsWithChildren<Web3ModalContextProviderProps>) => {
  const web3Config: Web3ModalConfig = useWeb3ModalContext();

  return (
    <Web3ModalContext.Provider value={web3Config}>
      {props.children}
    </Web3ModalContext.Provider>
  );
};

export { Web3ModalContextProvider };
