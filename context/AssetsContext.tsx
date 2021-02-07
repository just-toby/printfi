import React from "react";
import { Asset, AssetsConfig } from "../hooks/useAssets";

const AssetsContext = React.createContext<AssetsConfig>({
  assets: [],
  loadMore: () => {},
  loading: false,
});

export { AssetsContext };
