import { EventResource, Webhook } from "coinbase-commerce-node";
import type { NextApiRequest, NextApiResponse } from "next";
import { isChargeResource } from "../../utils/CoinbaseUtils";
import nodemailer from "nodemailer";
import Cors from "cors";
import { initMiddleware, MiddlewareNextFunction } from "../../utils/ApiUtils";

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

const coinbaseHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res);

  const rawPayload = await rawPayloadMiddleware(req, res);

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
      const cartItems = chargeMetadata["cart_items"];
      const mailingAddress = chargeMetadata["mailing_address"];
      const testAccount = await nodemailer.createTestAccount();

      // TODO: set up with mailchimp settings
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

      const customerEmail = mailingAddress["email"];

      // TODO: make the email look good - maybe use an HTML template or just hit the mailchimp API directly.
      // send mail with defined transport object
      const result = await transporter.sendMail({
        from: '"Print.Fi 👻" <support@print.finance>', // sender address
        to: customerEmail + ", " + (printerEmail ?? ""), // list of receivers
        subject: "Print.Fi Order Received ✔", // Subject line
        // plain text body
        text:
          "Your order has been received and is being prepared!\n" +
          "Here are your order details:\n" +
          "cart: \n" +
          JSON.stringify(cartItems) +
          "\npayment received at: \n" +
          JSON.stringify(event.created_at) +
          "\nto be mailed to: \n" +
          JSON.stringify(mailingAddress),
      });
      return result;
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