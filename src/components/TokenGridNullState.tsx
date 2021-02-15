import classNames from "classnames";
import styles from "../styles/Home.module.css";
import Image from "next/image";

interface TokenGridNullStateProps {}

const TokenGridNullState = (props: TokenGridNullStateProps) => {
  return (
    <div className={styles.main}>
      <Image src="/Untitled-Artwork-off-white.jpg" width={500} height={400} />
      <div className={styles.cartTitleContainer}>
        <p className={classNames(styles.largeFont)}>
          You don't own any NFTs we support.
        </p>
      </div>
      <p className={classNames(styles.mediumFont, "externalLink")}>
        <a href={"https://opensea.io"}>Looking to buy some?</a>
      </p>
    </div>
  );
};

export default TokenGridNullState;
