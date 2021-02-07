import { useCallback, useEffect, useState } from "react";

export type AssetsConfig = {
    assets: Array<Asset>,
    loadMore: () => void,
}

export type AssetContract = {
    address: string, 
    asset_contract_type: string, 
    created_date: string, 
    name: string, 
    nft_version: string,
}

export interface AssetOwner {
    user: any, 
    profile_img_url: string, 
    address: string, 
    config: string, 
    discord_id: string
};

export type Asset = {
    animation_original_url: string,
    animation_url: string,
    asset_contract: AssetContract,
    background_color: string,
    collection: any,
    creator: any
    decimals: number,
    description: string,
    external_link: string,
    id: number
    image_original_url: string
    image_preview_url: string
    image_thumbnail_url: string
    image_url: string
    is_presale: boolean,
    last_sale: any,
    listing_date: any,
    name: string,
    num_sales: number,
    owner: AssetOwner,
    permalink: string,
    sell_orders: Array<any>,
    token_id: string,
    top_bid: any,
}

const useAssets: (address: string) => AssetsConfig = (address: string) => {
  const pageSize = 20;

  const options = { method: "GET" };

  const [assets, setAssets] = useState<Array<Asset>>([]);

  // TEST ADDRESS FOR DEVELOPMENT
  address = '0xdb21617ddcceed28568af2f8fc6549887712a011';

  const fetchAssets = (offset: number) => {
    try {
        const url = `https://api.opensea.io/api/v1/assets?exclude_currencies=true&owner=${address}&limit=${pageSize}&offset=${offset}`;
        fetch(url, options)
          .then((response) => {
            return response.json();
          }).then(json => {
              setAssets([...assets, ...json.assets]);
          })
          .catch((err) => console.error(err));
      } catch (error) {
        console.log("Error getting unique tokens", error);
        throw error;
      }
  };

  useEffect(() => {
    fetchAssets(0)
  }, []);

  const loadMore = () => {
    fetchAssets(assets.length)
  };

  return {assets, loadMore};
};

export default useAssets;
