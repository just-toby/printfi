import * as React from "react";
import Link from "next/link";
import { UrlObject } from "url";
import classNames from "classnames";
import { isNullOrEmpty } from "../../utils/StringUtils";

export type FrameColor = "Black" | "White" | null;

export interface TokenCardProps {
  name: string;
  uri: string;
  // Omit if this card shouldn't link anywhere
  link?: UrlObject;
  width: number | string;
  outerBorderColor?: FrameColor;
  innerBorder?: boolean;
}

const TokenCard: React.FC<TokenCardProps> = (props: TokenCardProps) => {
  const getFrameBorder = (color: FrameColor) => {
    if (color === "Black") {
      return "blackFrame"
    }
    if (color === "White") {
      return "whiteFrame"
    }
    return null;
  };

  const hasBorder = props.innerBorder != true && props.outerBorderColor == null;

  if (isNullOrEmpty(props.uri)) {
    return null;
  }

  const content = (
    <a className={"card"}>
      <img
        className={classNames(
          "image",
          hasBorder ? "imageRadius" : null,
          props.innerBorder ? "imageInnerSpacing" : null,
          getFrameBorder(props.outerBorderColor)
        )}
        src={props.uri}
        alt={props.name}
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
