import styles from "../styles/Home.module.css";
import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { UrlObject } from "url";
import classNames from "classnames";
import { isNullOrEmpty } from "../utils/StringUtils";

export type FrameColor = "Black" | "White" | null;

export interface TokenCardProps {
  name: string;
  uri: string;
  // Omit if this card shouldn't link anywhere
  link?: UrlObject;
  height: number | string;
  width: number | string;
  outerBorderColor?: FrameColor;
  innerBorder?: boolean;
}

const TokenCard: React.FC<TokenCardProps> = (props: TokenCardProps) => {
  const myLoader = ({ src, width, quality }) => {
    return src;
  };

  const getFrameBorder = (color: FrameColor) => {
    if (color === "Black") {
      return styles.blackFrame;
    }
    if (color === "White") {
      return styles.whiteFrame;
    }
    return null;
  };

  const hasBorder = props.innerBorder != true && props.outerBorderColor == null;

  if (isNullOrEmpty(props.uri)) {
    return null;
  }

  const content = (
    <a className={styles.card}>
      <Image
        className={classNames(
          styles.image,
          hasBorder ? styles.imageRadius : null,
          props.innerBorder ? styles.imageInnerSpacing : null,
          getFrameBorder(props.outerBorderColor)
        )}
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
