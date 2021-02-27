import { CartItem, ItemConfiguration } from "../hooks/useCart";

const basePrices = {};

// Base price for the print (without frame), depending on size.
const sizePrices = {
  Small: 63,
  Large: 70,
};

// These don't affect the price
const colorPrices = {
  Black: 0,
  White: 0,
};

const squareLargeFramePrices = {
  Borderless: 442,
  "With Border": 5,
};

const squareSmallFramePrices = {
  Borderless: 357,
  "With Border": 5,
};

const portraitSmallFramePrices = {
  Borderless: 0,
  "With Border": 594,
};

const portraitLargeFramePrices = {
  Borderless: 0,
  "With Border": 689,
};

export function calculateSingleItemPrice(item: ItemConfiguration): number {
  // TODO: add logic for checking if NFT is square vs portrait, use correct frame pricemap.
  return (
    sizePrices[item.size] + colorPrices[item.color] // + borderPrices[item.border]
  );
}

/**
 * Returns the sum price of all items.
 * @param items Array of items with their purchasing configs.
 */
export function calculateTotalPrice(items: Array<CartItem>): number {
  return items.reduce((total: number, current: CartItem) => {
    return total + calculateSingleItemPrice(current.config);
  }, 0);
}

/**
 * returns the input converted to the format "xxx.xx" e.g. "100.00"
 * @param price number
 */
export function formatPrice(price: number): string {
  return String(Math.floor(price)) + (price % 1).toFixed(2).substring(1);
}
