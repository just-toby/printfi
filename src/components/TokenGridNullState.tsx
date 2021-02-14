import classNames from "classnames";
import styles from "../styles/Home.module.css";

interface TokenGridNullStateProps {}

const TokenGridNullState = (props: TokenGridNullStateProps) => {
  return (
    <div className={styles.main}>
      {/* TODO: add null state illustration */}
      <div className={styles.cartTitleContainer}>
        <p className={classNames(styles.largeFont)}>
          You don't own any NFTs we support.
        </p>
      </div>
      <p className={classNames(styles.mediumFont, 'externalLink')}>
        <a href={"https://opensea.io"}>Looking to buy some?</a>
      </p>
    </div>
  );
};

export default TokenGridNullState;
