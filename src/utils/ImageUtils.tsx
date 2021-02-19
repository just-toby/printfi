import { BaseProvider } from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";
import { avastarContractAbi, getContractBySlug } from "./constants";
import { CartItem } from "../hooks/useCart";

/**
 * Returns an image URI *or* raw SVG data depending on the collection type.
 */
export async function getHighQualityImage(
  item: CartItem,
  library: BaseProvider
): Promise<string> {
  const itemCollectionSlug = item.collection_slug;

  const collectionContractAddress = getContractBySlug(itemCollectionSlug);
  if (collectionContractAddress == null) {
    return item.original_uri;
  }

  switch (itemCollectionSlug) {
    case "avastar":
      const avastarContract = new Contract(
        collectionContractAddress,
        avastarContractAbi,
        library
      );
      return await avastarContract.renderAvastar(item.token_id);
    case "cryptopunks":
      return item.original_uri;
    case "art-blocks":
      return item.original_uri;
    case "hashmasks":
      return item.original_uri;
    case "axies":
      return item.original_uri;
    default:
      return item.original_uri;
  }
}
