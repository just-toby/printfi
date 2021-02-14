import { useWeb3React } from "@web3-react/core";
import { PropsWithChildren } from "react";
import useAssets, { AssetsConfig } from "../hooks/useAssets";
import { AssetsContext } from "./AssetsContext";

export interface AssetsContextProviderProps {}

const AssetsContextProvider: React.FC<
  PropsWithChildren<AssetsContextProviderProps>
> = (props: PropsWithChildren<AssetsContextProviderProps>) => {
  const { account } = useWeb3React();

  const assetsConfig: AssetsConfig = useAssets(account);

  return (
    <AssetsContext.Provider value={assetsConfig}>
      {props.children}
    </AssetsContext.Provider>
  );
};

export { AssetsContextProvider };
