import { useCallback, useEffect, useState } from "react";
import { WHITELIST } from "../utils/constants";
import { isNullOrEmpty } from "../utils/StringUtils";

export type AssetsConfig = {
  assets: Array<Asset>;
  loadMore: (startIndex: number, stopIndex: number) => Promise<void>;
  loading: boolean;
  hasNextPage: boolean;
};

export type AssetContract = {
  address: string;
  asset_contract_type: string;
  created_date: string;
  name: string;
  nft_version: string;
};

export interface AssetOwner {
  user: any;
  profile_img_url: string;
  address: string;
  config: string;
  discord_id: string;
}

export interface CollectionData {
  banner_image_url: string;
  chat_url: string;
  created_date: string;
  default_to_fiat: boolean;
  description: string;
  dev_buyer_fee_basis_points: string;
  dev_seller_fee_basis_points: string;
  discord_url: string;
  display_data: any;
  external_url: string;
  featured: boolean;
  featured_image_url: string;
  hidden: boolean;
  image_url: string;
  is_subject_to_whitelist: boolean;
  large_image_url: string;
  medium_username: null;
  name: string;
  only_proxied_transfers: boolean;
  opensea_buyer_fee_basis_points: string;
  opensea_seller_fee_basis_points: string;
  payout_address: string;
  require_email: boolean;
  safelist_request_status: string;
  short_description: string;
  slug: string;
  telegram_url: string;
  twitter_username: string;
  wiki_url: string;
}

export type Asset = {
  animation_original_url: string;
  animation_url: string;
  asset_contract: AssetContract;
  background_color: string;
  collection: CollectionData;
  creator: any;
  decimals: number;
  description: string;
  external_link: string;
  id: number;
  image_original_url: string;
  image_preview_url: string;
  image_thumbnail_url: string;
  image_url: string;
  is_presale: boolean;
  last_sale: any;
  listing_date: any;
  name: string;
  num_sales: number;
  owner: AssetOwner;
  permalink: string;
  sell_orders: Array<any>;
  token_id: string;
  top_bid: any;
};

const useAssets: (address: string) => AssetsConfig = (address: string) => {
  const initialPageSize = 20;

  const options = {
    method: "GET",
    headers: new Headers({
      "X-API-KEY": process.env.NEXT_PUBLIC_OPENSEA_API_KEY,
    }),
  };

  const [assets, setAssets] = useState<Array<Asset>>([]);
  const [loading, setLoading] = useState<boolean>();
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [didInitialFetch, setDidInitialFetch] = useState<boolean>(false);

  if (process.env.NEXT_PUBLIC_DEV_MODE === "wat") {
    address = "0x6301add4fb128de9778b8651a2a9278b86761423";
  }

  // TODO: we can optimize this with server side rendering if it becomes too slow.
  const fetchAssets = useCallback(
    (
      offset: number,
      count: number,
      resolve: (value: unknown) => void,
      reject: (reason?: any) => void
    ) => {
      setLoading(true);
      try {
        let url =
          `https://api.opensea.io/api/v1/assets?` +
          `exclude_currencies=true` +
          `&owner=${address}` +
          `&limit=${count}` +
          `&offset=${offset}`;

        WHITELIST.forEach((address) => {
          url += `&asset_contract_addresses=${address}`;
        });

        fetch(url, options)
          .then((response) => {
            return response.json();
          })
          .then((json) => {
            const validAssets = json.assets.filter(
              (item: Asset) => !isNullOrEmpty(item.image_url)
            );
            setAssets([...assets, ...validAssets]);
            setLoading(false);
            setHasNextPage(json.assets.length > 0);
            resolve(null);
          })
          .catch((err) => {
            console.error(err);
            setLoading(false);
            reject();
          });
      } catch (error) {
        setLoading(false);
        reject();

        throw error;
      }
    },
    [address, assets]
  );

  useEffect(() => {
    if (isNullOrEmpty(address)) {
      setAssets([]);
      setDidInitialFetch(false);
      return;
    }
    if (!didInitialFetch) {
      fetchAssets(
        0,
        initialPageSize,
        () => {},
        () => {}
      );
      setDidInitialFetch(true);
    }
  }, [address]);

  const loadMore = useCallback(
    async (startIndex: number, endIndex: number) => {
      return new Promise<void>((resolve, reject) => {
        fetchAssets(startIndex, endIndex, resolve, reject);
      });
    },
    [assets]
  );

  return { assets, loadMore, loading, hasNextPage };
};

export default useAssets;
