import styles from "../../styles/Home.module.css";
import * as React from "react";
import { Web3ModalContext } from "../context/Web3ModalContext";
import { useContext } from "react";

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = () => {
  const {connected, address, connect} = useContext(Web3ModalContext);

  const formatAddress: (string) => string = (address) => {
      return address.slice(0, 6) + "..." + address.slice(address.length - 4);
  }

  return (
    <div className={styles.header}>
      <a href="/" className={styles.headerLink}>Print.Fi</a>
      {connected ? (
        <span>{formatAddress(address)}</span>
      ) : (
        <a
          href="#"
          className={styles.headerLink}
          onClick={async () => {
            await connect();
          }}
        >
          connect wallet
        </a>
      )}
    </div>
  );
};

export { NavBar };
