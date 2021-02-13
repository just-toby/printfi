import {
  ChargeResource,
  CheckoutResource,
  EventResource,
  Webhook,
} from "coinbase-commerce-node";
import type { NextApiRequest, NextApiResponse } from "next";
import { isChargeResource } from "../../utils/CoinbaseUtils";
import nodemailer from "nodemailer";
import Cors from "cors";
import { initMiddleware } from "../../utils/ApiUtils";

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

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res);

  // Should be a string per CC docs.
  const signature: string =
    req.headers["x-cc-webhook-signature"]?.toString() ?? "";
  const rawBody: string = req.body ?? "";

  try {
    Webhook.verifySigHeader(rawBody, signature, sharedSecret);
    console.log("Successfully verified signature header");
  } catch (error) {
    console.log("Failed signature verification");
    console.log(error);
    return;
  }

  let event: EventResource;

  try {
    event = Webhook.verifyEventBody(rawBody, signature, sharedSecret);
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

  const getChargeResource: (
    input: ChargeResource | CheckoutResource
  ) => ChargeResource = (input: ChargeResource | CheckoutResource) => {
    if ("metadata" in input) {
      return;
    }
    return null;
  };

  switch (event.type) {
    case "charge:confirmed":
      if (!isChargeResource(event.data)) {
        console.log("Invalid charge event payload");
        return;
      }
      const chargeMetadata = event.data.metadata;
      const cartItems = chargeMetadata["cart_items"];
      const mailingAddress = JSON.parse(chargeMetadata["mailing_address"]);
      const testAccount = await nodemailer.createTestAccount();

      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: testAccount.user, // generated ethereal user
          pass: testAccount.pass, // generated ethereal password
        },
      });
      // send mail with defined transport object
      transporter.sendMail({
        from: '"Print.Fi 👻" <foo@example.com>', // sender address
        // TODO: replace my email with customer email
        to: "ejd4@protonmail.com, " + printerEmail, // list of receivers
        subject: "Print.Fi Order Completed ✔", // Subject line
        // plain text body
        text:
          "Your order has been received and is being prepared!\n" +
          "See your order details below:\n" +
          "cart: \n" +
          cartItems.toString() +
          "\npayment received at: \n" +
          event.created_at.toString() +
          "\nto be mailed to: \n" +
          mailingAddress.toString(),
      });
      return;
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
