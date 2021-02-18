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
                              props.mailingAddress["city"] + ","
                              props.mailingAddress["state"] + 
                              props.mailingAddress["zip"];

  return (
    <div className="emailDiv">
      <div className="emailHeader">
        <Link href="/">
          <a style={{color: "black"}}>NiftyPrints</a>
        </Link>
      </div>
      <div className="greetingMessage">
        Thanks for shopping with us!
      </div>
      <div className="orderDetails">
        <p>Order Number: {props.orderId} </p>
        <p>Shipping to: {props.mailingAddress["name"]}</p>
        <p>Order Number: {textFriendlyAddress} </p>
      </div>
      
      <Order cart={props.cartItems} />
    </div>
  );
};

export { ConfirmationEmail };
