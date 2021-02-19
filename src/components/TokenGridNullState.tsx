import classNames from "classnames";
import Image from "next/image";

const TokenGridNullState = () => {
  return (
    <div className={"main"}>
      <Image src="/Untitled-Artwork-off-white.jpg" width={500} height={400} />
      <div className={"cartTitleContainer"}>
        <p className={"largeFont"}>
          You don't own any NFTs we support.
        </p>
      </div>
      <p className={classNames("mediumFont", "externalLink")}>
        <a href={"https://opensea.io"}>Looking to buy some?</a>
      </p>
    </div>
  );
};

export default TokenGridNullState;
