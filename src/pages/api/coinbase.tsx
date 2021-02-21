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
import { getRawImageData } from "../../utils/ImageUtils";
import { getDefaultProvider } from "@ethersproject/providers";
import Jimp from "jimp";
import { writePngDpi } from "png-dpi-reader-writer";

const deepai = require("deepai");
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

  deepai.setApiKey(process.env.DEEPAI_API_KEY);

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
        />
      );

      const web3Provider = getDefaultProvider("mainnet", {
        infura: process.env.NEXT_PUBLIC_REACT_APP_INFURA_ID,
        etherscan: process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY,
      });

      const attachments: Array<MandrillAttachment> = [];
      await Promise.all(
        cartItems.map(async (item: CartItem) => {
          const fileName = item.name.replace(/[^a-z0-9]/gi, "");
          if (item.collection_slug === "avastar") {
            const svgData = await getRawImageData(item, web3Provider);
            // for Avastar, we use the raw svg data from the blockchain.
            attachments.push({
              content: svgData.dataBase64,
              name: fileName + ".svg",
              type: svgData.imageType,
            });
          } else {
            // For all other collections, we expect a URL that points to a PNG file
            // We will turn this into PNG data ourselves and increase the DPI.
            const rawImageData = await getRawImageData(item, web3Provider);
            const imageBuffer = writePngDpi(rawImageData.dataBuffer, 350);

            attachments.push({
              content: Buffer.from(imageBuffer).toString("base64"),
              name: fileName + ".png",
              type: rawImageData.imageType,
            });
          }
        })
      );

      const printerHtmlBody = renderToStaticMarkup(
        <ConfirmationEmail
          title="You have a new order from NiftyPrints"
          orderId={orderId}
          mailingAddress={mailingAddress}
          cartItems={cartItems}
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
        attachments: attachments,
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
        // mailchimpTx.messages.send({
        //   message: customerMessage,
        // }),
        mailchimpTx.messages.send({
          message: printerMessage,
        }),
      ]);
      return res.status(200).send("Signed Webhook Received: " + event.id);
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
