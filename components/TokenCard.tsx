import styles from "../styles/Home.module.css";
import * as React from "react";
import { useContext } from "react";
import { Web3ModalContext } from "../context/Web3ModalContext";
import Link from "next/link";
import Image from "next/image";
import { UrlObject } from "url";

export interface TokenCardProps {
  name: string;
  uri: string;
  // Omit if this card shouldn't link anywhere
  link?: UrlObject;
  height: number;
  width: number;
}

const TokenCard: React.FC<TokenCardProps> = (props: TokenCardProps) => {
  const { address } = useContext(Web3ModalContext);

  const myLoader = ({ src, width, quality }) => {
    return src;
  };

  const content = (
    <a className={styles.card}>
      <Image
        className={styles.image}
        src={props.uri}
        alt={props.name}
        loader={myLoader}
        height={props.height}
        width={props.width}
      />
    </a>
  );

  return props.link == null ? (
    content
  ) : (
    <Link href={props.link}>{content}</Link>
  );
};

export { TokenCard };
