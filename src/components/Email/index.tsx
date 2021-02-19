import { useEffect, useState } from "react";
import { CartItem } from "../../hooks/useCart";
import { Address } from "../../hooks/useCoinbaseCommerceAPI";
import Link from "next/link";
import Order from "./Order";

export interface ConfirmationEmailProps {
  orderId: string;
  mailingAddress: Address;
  cartItems: Array<CartItem>;
}

const ConfirmationEmail: React.FC<ConfirmationEmailProps> = (
  props: ConfirmationEmailProps
) => {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", (e) => {
      setWindowWidth(window.innerWidth);
    });
  }, []);

  const textFriendlyAddress =
    props.mailingAddress["address"] +
    props.mailingAddress["addres2"] +
    props.mailingAddress["city"] +
    ",";
  props.mailingAddress["state"] + props.mailingAddress["zip"];

  return (
    <div className="emailDiv">
      <div className="emailHeader">
        <Link href="/">
          <a style={{ color: "black" }}>NiftyPrints</a>
        </Link>
      </div>
      <div className="greetingMessage">Thanks for shopping with us!</div>
      <div className="orderDetails">
        <p>Order Number: {props.orderId} </p>
        <p>Shipping to: {props.mailingAddress["name"]}</p>
        <p>Order Number: {textFriendlyAddress} </p>
      </div>

      <Order cart={props.cartItems} />
    </div>
  );
};

const MockConfirmationEmail = (
  <ConfirmationEmail
    orderId={"1234"}
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
        collection_slug: "art-blocks",
        high_quality_image:
          "https://lh3.googleusercontent.com/OPktDZrm80U-Mcza8Kwiqrq8t7cEX7BFdKgOUN0SlMTZhQt1yBNkJyuF6n5l7oPAKH5wEjeyALWWnZi7MbHP4955mtiOO3BEvoAp",
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
        collection_slug: "art-blocks",
        high_quality_image:
          "https://lh3.googleusercontent.com/9JRYIfFOyY66aeL2QpVySKVjwgaoz33FCwhvko_IIXN35EDY4AD97pGgBNNbbLiffW2rl8QgW9vBJ-hfhNOuWE7FssUgYwL0bDlKWQ",
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
