import { ChargeResource } from "coinbase-commerce-node";

export function isChargeResource(object: any): object is ChargeResource {
  if (object === null) {
    return false;
  }
  // See the ChargeResource interface for full definition.
  // This is enough to differentiate between charge and checkout.
  return "metadata" in object;
}
