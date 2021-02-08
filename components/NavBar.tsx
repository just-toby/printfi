import styles from "../styles/Home.module.css";
import * as React from "react";
import { Web3ModalContext } from "../context/Web3ModalContext";
import { useContext } from "react";
import Link from "next/link";
import { CartContext } from "../context/CartContext";

export type SubPage = "print" | "cart";

interface NavBarProps {
  subPage: SubPage;
}

const NavBar: React.FC<NavBarProps> = (props: NavBarProps) => {
  const { connected, address, connect, disconnect } = useContext(
    Web3ModalContext
  );
  const { cart } = useContext(CartContext);

  const formatAddress: (address: string) => string = (address) => {
    return address.slice(0, 6) + "..." + address.slice(address.length - 4);
  };
  
  return (
    <div className={styles.header}>
      <Link href="/">
        <a className={styles.mediumFont}>Print.Fi</a>
      </Link>

      <div>
        <Link href="/">
          <a
            className={
              props.subPage === "print"
                ? styles.subPageLinkUnderline
                : styles.subPageLink
            }
          >
            Print
          </a>
        </Link>
        <Link href="/checkout">
          <a
            className={
              props.subPage === "cart"
                ? styles.subPageLinkUnderline
                : styles.subPageLink
            }
          >
            {cart.length > 0 ? "Cart (" + cart.length + ")" : "Cart"}
          </a>
        </Link>
      </div>

      {connected ? (
        <Link href="/">
          <a className={styles.mediumFont} onClick={disconnect}>
            {formatAddress(address)}
          </a>
        </Link>
      ) : (
        <a href="#" className={styles.mediumFont} onClick={connect}>
          connect wallet
        </a>
      )}
    </div>
  );
};

export { NavBar };
