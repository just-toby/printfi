import { calculateTotalPrice, formatPrice } from "../utils/PriceUtils";
import { CartItem } from "./useCart";

const API_VERSION = "2018-03-22";
const BASE_URI = "https://api.commerce.coinbase.com/charges";

export type Address = {
  name: string;
  email: string;
  address: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
};

export type CreateChargeInput = {
  items: Array<CartItem>;
  mailingAddress: Address;
};

export type CoinbaseCommerceAPI = {
  createCharge: (data: CreateChargeInput) => Promise<string>;
};

const useCoinbaseCommerceAPI: () => CoinbaseCommerceAPI = () => {
  const createCharge = (data: CreateChargeInput) => {
    const createChargeOptions = {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        "X-CC-Api-Key": process.env.NEXT_PUBLIC_COINBASE_COMMERCE_API_KEY,
        "X-CC-Version": API_VERSION,
      }),
      body: JSON.stringify({
        name: "NiftyPrints Cart Checkout",
        description: "",
        local_price: {
          amount: formatPrice(calculateTotalPrice(data.items)),
          currency: "USD",
        },
        pricing_type: "fixed_price",
        metadata: {
          cart_items: data.items,
          mailing_address: data.mailingAddress,
        },
      }),
    };
    return new Promise<string>((resolve, reject) => {
      fetch(BASE_URI, createChargeOptions)
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          console.log(json)
          resolve(json.data.code);
        })
        .catch((error: any) => {
          console.log(error);
          reject(error);
        });
    });
  };

  return {
    createCharge: createCharge,
  };
};

export default useCoinbaseCommerceAPI;
