import { EventResource, Webhook } from "coinbase-commerce-node";
import type { NextApiRequest, NextApiResponse } from "next";
import { isChargeResource } from "../../utils/CoinbaseUtils";
import Cors from "cors";
import { renderToStaticMarkup } from "react-dom/server";
import { initMiddleware, MiddlewareNextFunction } from "../../utils/ApiUtils";
import { ConfirmationEmail } from "../../components/Email/";
import { CartItem } from "../../hooks/useCart";
import temp from "temp";
import fs from "fs";
import {
  getImageDataFromFile,
  getRawImageData,
  ImageData,
} from "../../utils/ImageUtils";
import { getDefaultProvider } from "@ethersproject/providers";
import Jimp from "jimp";
import { Dropbox } from "dropbox";
import RequestedLinkAccessLevelViewer from "dropbox/types";
import RequestedVisibilityPublic from "dropbox/types";

const dbx = new Dropbox({ accessToken: process.env.DROPBOX_SECRET });
const exiftool = require("node-exiftool");
const exiftoolBin = require("dist-exiftool");
const ep = new exiftool.ExiftoolProcess(exiftoolBin);
const mime = require("mime");

const mailchimpTx = require("@mailchimp/mailchimp_transactional")(
  process.env.MAILCHIMP_API_KEY
);
const sharedSecret = process.env.COINBASE_COMMERCE_WEBHOOK_SHARED_SECRET;
const printerEmail = process.env.PRINTER_EMAIL;

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ["GET", "POST", "OPTIONS"],
  })
);

const rawPayloadMiddleware = initMiddleware(
  (req: NextApiRequest, res: NextApiResponse, next: MiddlewareNextFunction) => {
    let body = "";
    req
      .setEncoding("utf-8")
      .on("data", (chunk) => {
        body += chunk;
      })
      .on("end", () => {
        next(body);
      });
  }
);

// Returns the local absolute filepath
const writeToFile: (data64: string, name: string) => Promise<string> = (
  data64: string,
  name: string
) => {
  return new Promise((resolve, reject) => {
    const fileName = name;
    let tempFilePath;
    temp.open(fileName, function (err, info) {
      if (!err) {
        tempFilePath = info.path;
        fs.write(info.fd, data64, 0, "base64", (err, written, str) => {
          if (err) {
            console.log(err);
          }
        });
        fs.close(info.fd, function (err) {
          if (err) {
            reject(err);
          }
        });
        resolve(tempFilePath);
      }
    });
  });
};

type MandrillAttachment = {
  content: string; // raw file contents
  name: string; // filename to display as
  type: string; // file type (likely svg)
};

const coinbaseHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res);

  const rawPayload = await rawPayloadMiddleware(req, res);

  temp.track();

  // Should be a string per CC docs.
  const signature: string =
    req.headers["x-cc-webhook-signature"]?.toString() ?? "";

  try {
    Webhook.verifySigHeader(String(rawPayload), signature, sharedSecret);
    console.log("Successfully verified signature header");
  } catch (error) {
    console.log("Failed signature verification");
    console.log(error);
    return;
  }

  let event: EventResource;

  try {
    event = Webhook.verifyEventBody(
      String(rawPayload),
      signature,
      sharedSecret
    );
    console.log("Successfully verified event body");
  } catch (error) {
    console.log("Failed event body verification");
    console.log(error);
    return;
  }

  if (event === null) {
    console.log("Invalid event");
    return;
  }

  switch (event.type) {
    case "charge:confirmed":
      if (!isChargeResource(event.data)) {
        console.log("Invalid charge event payload");
        return;
      }
      const chargeMetadata = event.data.metadata;
      const cartItems = JSON.parse(chargeMetadata["cart_items"]);
      const mailingAddress = JSON.parse(chargeMetadata["mailing_address"]);
      const customerEmail = mailingAddress["email"];
      const orderId = event.data["code"];

      // TODO: add a "fallback" confirmation message that doesn't rely on the CC data format.
      const emailHtmlBody = renderToStaticMarkup(
        <ConfirmationEmail
          title="Thanks for shopping with us!"
          orderId={orderId}
          mailingAddress={mailingAddress}
          cartItems={cartItems}
          shareLink={null}
        />
      );

      const web3Provider = getDefaultProvider("mainnet", {
        infura: process.env.NEXT_PUBLIC_REACT_APP_INFURA_ID,
        etherscan: process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY,
      });

      const writeDPI = async (filePath: string) => {
        await ep.writeMetadata(
          filePath,
          {
            ResolutionUnit: "inches",
            XResolution: 600,
            YResolution: 600,
            "jfif:XResolution": 600,
            "jfif:YResolution": 600,
          },
          ["overwrite_original_in_place", "preserve"]
        );
      };

      const uploadImage = async (item: ImageData, fileName: string) => {
        const path =
          "/" +
          orderId +
          "/" +
          fileName +
          "." +
          mime.extensions[item.imageType];
        await dbx.filesUpload({
          path: path,
          contents: item.dataBuffer,
        });
      };

      await Promise.all(
        cartItems.map(async (item: CartItem) => {
          const fileName = item.name.replace(/[^a-z0-9]/gi, "");
          if (
            item.collection_slug === "avastar" ||
            item.collection_slug === "autoglyphs"
          ) {
            // for these collections, we get SVG data which doesn't need upscaling.
            const svgData = await getRawImageData(item, web3Provider);
            await uploadImage(svgData, fileName);
          } else {
            // For all other collections, we expect a URL that points to a PNG file
            // We will turn this into PNG data ourselves and increase the DPI.
            const rawImageData = await getRawImageData(item, web3Provider);
            await ep.open();
            const localFilePath = await writeToFile(
              rawImageData.dataBase64,
              fileName
            );

            await writeDPI(localFilePath);

            const jimpImage = await Jimp.read(localFilePath);
            jimpImage
              .scale(2) // resize
              .quality(100) // set quality
              .write(localFilePath); // save

            await writeDPI(localFilePath);

            await ep.close();
            const resultingImageData = await getImageDataFromFile(
              localFilePath,
              rawImageData.imageType
            );
            await uploadImage(resultingImageData, fileName);
          }
        })
      );

      const shareLinkResult = await dbx.sharingCreateSharedLinkWithSettings({
        path: "/" + orderId,
        settings: {
          requested_visibility: { ".tag": "public" },
          access: { ".tag": "viewer" },
        },
      });
      const shareLink = shareLinkResult.result.url;

      const printerHtmlBody = renderToStaticMarkup(
        <ConfirmationEmail
          title="You have a new order from NiftyPrints"
          orderId={orderId}
          mailingAddress={mailingAddress}
          cartItems={cartItems}
          shareLink={shareLink}
        />
      );

      const customerMessage = {
        from_email: "team@nftprints.io",
        subject: "NiftyPrints Order Confirmation",
        html: emailHtmlBody,
        to: [
          {
            email: "printfi@protonmail.com",
            type: "bcc",
          },
          {
            email: customerEmail,
            type: "to",
          },
        ],
      };

      const printerMessage = {
        from_email: "team@nftprints.io",
        subject: "NiftyPrint Order #" + orderId + " Details",
        html: printerHtmlBody,
        to: [
          {
            email: "printfi@protonmail.com",
            type: "bcc",
          },
          {
            email: printerEmail,
            type: "to",
          },
        ],
      };

      await Promise.all([
        mailchimpTx.messages.send({
          message: customerMessage,
        }),
        mailchimpTx.messages.send({
          message: printerMessage,
        }),
      ]);
      return res
        .status(200)
        .send("Signed Webhook Received: " + event.id + "\n");
    case "charge:created":
    case "charge:delayed":
    case "charge:failed":
    case "charge:pending":
    case "charge:resolved":
    default:
      // TODO: we may want to handle some of these in the future.
      return;
  }
};

/**
 * NOTE: we need to disable Next's automatic body parsing to read it as a stream.
 * We need the raw request body to verify the message with our CC credentials.
 */
export const config = {
  api: {
    bodyParser: false,
  },
};

export default coinbaseHandler;
