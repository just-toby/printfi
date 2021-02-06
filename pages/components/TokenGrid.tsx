import styles from "../../styles/Home.module.css";
import * as React from "react";
import { TokenCard, TokenCardProps } from "./TokenCard";
import { useContext } from "react";
import { Web3ModalContext } from "../context/Web3ModalContext";

interface TokenGridProps {}

const TokenGrid: React.FC<TokenGridProps> = () => {
  const { address } = useContext(Web3ModalContext);

  // TODO: query hashmasks, cryptopunks, and avastars
  const tokens = [
    "test 1",
    "test 2",
    "test 3",
    "test 4",
    "test 5",
    "test 6",
    "test 7",
    "test 8",
    "test 9",
    "test 10",
  ];

  return (
    <div className={styles.grid}>
      {tokens.map((item) => {
        return <TokenCard key={item} name={item} uri="" type="" />;
      })}
    </div>
  );
};

export { TokenGrid };
