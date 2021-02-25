import { BaseProvider } from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";
import { avastarContractAbi, getContractBySlug } from "./constants";
import { CartItem } from "../hooks/useCart";
import ImageDataUri from "image-data-uri";
import fs from "fs";

export type ImageData = {
  dataBase64: string;
  imageType: string;
  dataBuffer: Buffer;
};

export async function getImageDataFromFile(
  filePath: string,
  fileType: string
): Promise<ImageData> {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err: any, data: Buffer) => {
      resolve({
        dataBase64: data.toString("base64"),
        dataBuffer: data,
        imageType: fileType,
      });
    });
  });
}

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
    // For avastars we need to get the SVG data from the blockchain.
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
    // Everything else we can use the "original_uri" directly
    // For autoglyphs, the URI points to an SVG file.
    default:
      return await getRawData(item.original_uri);
  }
}
