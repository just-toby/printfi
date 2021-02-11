import styles from "../styles/Home.module.css";
import * as React from "react";
import { Web3ModalContext } from "../context/Web3ModalContext";
import { useContext } from "react";
import Link from "next/link";
import { CartContext } from "../context/CartContext";
import classNames from "classnames";

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
        <a
          className={classNames(styles.mediumFont, styles.navBarButton)}
          style={{ minWidth: 200 }}
        >
          Print.Fi
        </a>
      </Link>

      <div>
        <Link href="/">
          <a
            className={classNames(
              props.subPage === "print"
                ? styles.subPageLinkUnderline
                : styles.subPageLink,
              styles.navBarButton
            )}
          >
            Print
          </a>
        </Link>
        <Link href="/review">
          <a
            className={classNames(
              props.subPage === "cart"
                ? styles.subPageLinkUnderline
                : styles.subPageLink,
              styles.navBarButton
            )}
          >
            {cart.length > 0 ? "Cart (" + cart.length + ")" : "Cart"}
          </a>
        </Link>
      </div>

      {connected ? (
        <Link href="/">
          <a
            className={classNames(styles.mediumFont, styles.navBarButton)}
            onClick={disconnect}
            style={{ minWidth: 200, textAlign: "end" }}
          >
            {formatAddress(address)}
          </a>
        </Link>
      ) : (
        <a
          href="#"
          className={classNames(styles.mediumFont, styles.navBarButton)}
          onClick={connect}
          style={{ minWidth: 200, textAlign: "end" }}
        >
          connect wallet
        </a>
      )}
    </div>
  );
};

export { NavBar };
