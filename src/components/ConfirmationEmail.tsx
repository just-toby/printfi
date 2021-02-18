import classNames from "classnames";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CartItem } from "../hooks/useCart";
import { Address } from "../hooks/useCoinbaseCommerceAPI";
import styles from "../styles/Home.module.css";
import CartDetailsTable from "./CartDetailsTable";
import Link from "next/link";

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
    <div className={styles.emailDiv}>
      <div className={styles.emailHeader}>
        <Link href="/">
          <a style={{color: "black"}}>NiftyPrints</a>
        </Link>
      </div>
      <div className={styles.greetingMessage}>
        Thanks for shopping with us!
      </div>
      <div className={styles.orderDetails}>
        <p>Order Number: {props.orderId} </p>
        <p>Shipping to: {props.mailingAddress["name"]}</p>
        <p>Order Number: {textFriendlyAddress} </p>
      </div>
      
      <CartDetailsTable cart={props.cartItems} />
    </div>
  );
};

export { ConfirmationEmail };
