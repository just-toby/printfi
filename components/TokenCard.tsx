import styles from "../styles/Home.module.css";
import * as React from "react";
import { useContext } from "react";
import { Web3ModalContext } from "../context/Web3ModalContext";
import Link from "next/link";

export interface TokenCardProps {
  name: string;
  uri: string;
  type: string;
}

const TokenCard: React.FC<TokenCardProps> = (props: TokenCardProps) => {
  const { address } = useContext(Web3ModalContext);

  // todo: replace this example with real impl
  return (
    <Link href="customize">
      <a className={styles.card}>
        <p>{props.name}</p>
      </a>
    </Link>
  );
};

export { TokenCard };
