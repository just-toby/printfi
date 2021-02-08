import React from "react";
import { Asset, AssetsConfig } from "../hooks/useAssets";

const AssetsContext = React.createContext<AssetsConfig>({
  assets: [],
  loadMore: (startIndex: number, stopIndex: number) => null,
  loading: false,
  hasNextPage: false,
});

export { AssetsContext };
