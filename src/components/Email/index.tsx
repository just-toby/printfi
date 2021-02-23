import { CartItem } from "../../hooks/useCart";
import { Address } from "../../hooks/useCoinbaseCommerceAPI";
import Link from "next/link";
import Order from "./Order";
import { isNullOrEmpty } from "../../utils/StringUtils";

export interface ConfirmationEmailProps {
  orderId: string;
  mailingAddress: Address;
  cartItems: Array<CartItem>;
  title: string;
  shareLink: string | null;
}

const ConfirmationEmail: React.FC<ConfirmationEmailProps> = (
  props: ConfirmationEmailProps
) => {
  const secondAddressLine = isNullOrEmpty(props.mailingAddress["address2"])
    ? " "
    : " " + props.mailingAddress["address2"] + " ";

  const textFriendlyAddress =
    props.mailingAddress["address"] +
    secondAddressLine +
    ", " +
    props.mailingAddress["city"] +
    " " +
    props.mailingAddress["state"] +
    " " +
    props.mailingAddress["zip"];

  return (
    <div style={styles.emailDiv}>
      <div style={styles.emailHeader}>
        <Link href="/">
          <a style={{ color: "black" }}>NiftyPrints</a>
        </Link>
      </div>
      <div style={styles.greetingMessage}>{props.title}</div>
      <div style={styles.orderDetails}>
        <p>Order Number: {props.orderId} </p>
        <p>Shipping to: {props.mailingAddress["name"]}</p>
        <p>Address: {textFriendlyAddress} </p>
      </div>

      {isNullOrEmpty(props.shareLink) ? null : (
        <div>
          <a href={props.shareLink}>
            <p>Click here to view the image files.</p>
          </a>
        </div>
      )}

      <Order cart={props.cartItems} />
    </div>
  );
};

// need to use inline styles because this will be rendered as an email
const styles = {
  emailDiv: {
    display: "flex",
    flexDirection: "column" as "column",
  },
  emailHeader: {
    alignItems: "left",
    outline: "none",
    cursor: "pointer",
    textDecoration: "none",
    color: "black",
    fontSize: "3rem",
    borderBottom: "1px solid #dedede",
    width: "-webkit-fill-available",
    padding: "20px",
  },
  greetingMessage: {
    padding: "20px",
    color: "black",
    fontSize: "2rem",
  },
  orderDetails: {
    padding: "20px",
    color: "black",
    fontSize: "1.5rem",
  },
};

const MockConfirmationEmail = (
  <ConfirmationEmail
    title="You're viewing a test version of the order confirmation email!"
    orderId={"1234"}
    shareLink={null}
    mailingAddress={{
      name: "Just Toby",
      email: "test@test.com",
      address: "1234 Pine Street",
      address2: "Apt 2222",
      city: "Seattle",
      state: "WA",
      zip: "98101",
    }}
    cartItems={[
      {
        name: "first NFT",
        token_id: "123",
        collection_slug: "avastar",
        original_uri:
          "https://lh3.googleusercontent.com/OPktDZrm80U-Mcza8Kwiqrq8t7cEX7BFdKgOUN0SlMTZhQt1yBNkJyuF6n5l7oPAKH5wEjeyALWWnZi7MbHP4955mtiOO3BEvoAp",
        preview_uri:
          "https://lh3.googleusercontent.com/OPktDZrm80U-Mcza8Kwiqrq8t7cEX7BFdKgOUN0SlMTZhQt1yBNkJyuF6n5l7oPAKH5wEjeyALWWnZi7MbHP4955mtiOO3BEvoAp",
        config: {
          size: "big",
          frame: "White",
          glass: "matte",
          space: "0",
        },
      },
      {
        name: "second NFT",
        token_id: "123",
        collection_slug: "avastar",
        original_uri:
          "https://lh3.googleusercontent.com/9JRYIfFOyY66aeL2QpVySKVjwgaoz33FCwhvko_IIXN35EDY4AD97pGgBNNbbLiffW2rl8QgW9vBJ-hfhNOuWE7FssUgYwL0bDlKWQ",
        preview_uri:
          "https://lh3.googleusercontent.com/9JRYIfFOyY66aeL2QpVySKVjwgaoz33FCwhvko_IIXN35EDY4AD97pGgBNNbbLiffW2rl8QgW9vBJ-hfhNOuWE7FssUgYwL0bDlKWQ",
        config: {
          size: "small",
          frame: "Black",
          glass: "glossy",
          space: "3",
        },
      },
    ]}
  />
);

export { ConfirmationEmail, MockConfirmationEmail };
