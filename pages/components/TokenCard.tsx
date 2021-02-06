import styles from "../../styles/Home.module.css";
import * as React from "react";
import { useContext } from "react";
import { Web3ModalContext } from "../context/Web3ModalContext";

export interface TokenCardProps {
  name: string;
  uri: string;
  type: string;
}

const TokenCard: React.FC<TokenCardProps> = (props: TokenCardProps) => {
  const { address } = useContext(Web3ModalContext);

  // todo: replace this example with real impl
  return (
    <a href="#" className={styles.card}>
      <p>{props.name}</p>
    </a>
  );
};

export { TokenCard };
