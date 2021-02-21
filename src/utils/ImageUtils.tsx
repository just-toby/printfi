import { BaseProvider } from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";
import { avastarContractAbi, getContractBySlug } from "./constants";
import { CartItem } from "../hooks/useCart";
import ImageDataUri from "image-data-uri";

export type ImageData = {
  dataBase64: string;
  imageType: string;
  dataBuffer: Buffer;
};

/**
 * Returns raw image data, the format of which depends on the collection type.
 * e.g. avastars will return SVG, others will return png.
 */
export async function getRawImageData(
  item: CartItem,
  library: BaseProvider
): Promise<ImageData> {
  const itemCollectionSlug = item.collection_slug;

  const collectionContractAddress = getContractBySlug(itemCollectionSlug);

  const getRawData: (uri: string) => Promise<ImageData> = (uri: string) => {
    return new Promise((resolve, reject) => {
      ImageDataUri.encodeFromURL(uri).then((res: string) => {
        const decodedData = ImageDataUri.decode(res);
        resolve(decodedData);
      });
    });
  };

  switch (itemCollectionSlug) {
    case "avastar":
      const avastarContract = new Contract(
        collectionContractAddress,
        avastarContractAbi,
        library
      );
      const rawSvg = await avastarContract.renderAvastar(item.token_id);
      const svgBuffer = Buffer.from(rawSvg);
      return {
        dataBase64: svgBuffer.toString("base64"),
        imageType: "image/svg+xml",
        dataBuffer: svgBuffer,
      };
    case "cryptopunks":
      return await getRawData(item.original_uri);
    case "art-blocks":
      return await getRawData(item.original_uri);
    case "hashmasks":
      return await getRawData(item.original_uri);
    case "axies":
      return await getRawData(item.original_uri);
    default:
      return await getRawData(item.original_uri);
  }
}
