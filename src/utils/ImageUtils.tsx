import { Web3Provider } from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";
import { Asset } from "../hooks/useAssets";
import { avastarContractAbi, getContractBySlug } from "./constants";

export async function getHighQualityImageUri(
  item: Asset,
  library: Web3Provider
): Promise<string> {
  const itemCollectionSlug = item.collection.slug;

  const collectionContractAddress = getContractBySlug(itemCollectionSlug);
  if (collectionContractAddress == null) {
    return item.image_original_url;
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
      return item.image_original_url;
    case "art-blocks":
      return item.image_original_url;
    case "hashmasks":
      return item.image_original_url;
    case "axies":
      return item.image_original_url;
    default:
      return item.image_original_url;
  }
}
