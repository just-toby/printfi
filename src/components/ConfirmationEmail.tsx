import classNames from "classnames";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CartItem } from "../hooks/useCart";
import { Address } from "../hooks/useCoinbaseCommerceAPI";
import styles from "../styles/Home.module.css";
import CartDetailsTable from "./CartDetailsTable";

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

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: windowWidth,
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "2rem",
        paddingLeft: "2rem",
      }}
    >
      <span className={classNames(styles.largeFont)}>
        Thanks for your order!
      </span>
      <br />
      <br />
      <br />
      <span
        className={classNames(styles.mediumFont, styles.subPageLinkUnderline)}
      >
        Order Number:
      </span>
      <p>{props.orderId}</p>

      {/* mailing address: */}
      <span
        className={classNames(styles.mediumFont, styles.subPageLinkUnderline)}
      >
        Mailing Address:
      </span>
      <p>
        {props.mailingAddress["name"]}
        <br />
        {props.mailingAddress["address"]}
        <br />
        {props.mailingAddress["address2"]}
        <br />
        {props.mailingAddress["city"]}
        {", "}
        {props.mailingAddress["state"]} {props.mailingAddress["zip"]}
      </p>
      <br />
      <br />

      {/* order details: */}
      <CartDetailsTable cart={props.cartItems} />
      <Image
        src="/Untitled-Artwork-off-white.jpg"
        width={windowWidth * 0.8}
        height={windowWidth * 0.8 * 0.7}
      />
    </div>
  );
};

export { ConfirmationEmail };
