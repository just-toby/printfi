import styles from "../styles/Home.module.css";
import * as React from "react";
import { useContext } from "react";
import { Web3ModalContext } from "../context/Web3ModalContext";
import Link from "next/link";
import Image from "next/image";

export interface TokenCardProps {
  name: string;
  uri: string;
  type: string;
  index: number;
}

const TokenCard: React.FC<TokenCardProps> = (props: TokenCardProps) => {
  const { address } = useContext(Web3ModalContext);

  const myLoader = ({ src, width, quality }) => {
    return src;
  };

  // todo: replace this example with real impl
  return (
    <Link
      href={{
        pathname: "/customize",
        query: { index: props.index },
      }}
    >
      <a className={styles.card}>
        <Image
          className={styles.image}
          src={props.uri}
          alt={props.name}
          loader={myLoader}
          height={500}
          width={350}
        />
      </a>
    </Link>
  );
};

export { TokenCard };
