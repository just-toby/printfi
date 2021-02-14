import { CartItem, ItemConfiguration } from "../hooks/useCart";

// TODO: replace these with real prices.
const sizePrices = {
  '20"x30"': 10,
  '30"x45"': 20,
};

const framePrices = {
  Black: 10,
  White: 20,
};

const glassPrices = {
  Glossy: 10,
  Matte: 20,
};

const spacePrices = {
  '0"': 0,
  '3"': 5,
};

export function calculateSingleItemPrice(item: ItemConfiguration): number {
  return (
    sizePrices[item.size] +
    framePrices[item.frame] +
    glassPrices[item.glass] +
    spacePrices[item.space]
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
