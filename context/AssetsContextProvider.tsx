import { PropsWithChildren, useContext } from "react";
import useAssets, { AssetsConfig } from "../hooks/useAssets";
import { AssetsContext } from "./AssetsContext";
import { Web3ModalContext } from "./Web3ModalContext";

export interface AssetsContextProviderProps {}

const AssetsContextProvider: React.FC<
  PropsWithChildren<AssetsContextProviderProps>
> = (props: PropsWithChildren<AssetsContextProviderProps>) => {
  const { address } = useContext(Web3ModalContext);

  const assetsConfig: AssetsConfig = useAssets(address);

  return (
    <AssetsContext.Provider value={assetsConfig}>
      {props.children}
    </AssetsContext.Provider>
  );
};

export { AssetsContextProvider };
