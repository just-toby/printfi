import styles from "../styles/Home.module.css";
import * as React from "react";
import { TokenCard } from "./TokenCard";
import { useContext, useRef, useEffect, useState } from "react";
import { Web3ModalContext } from "../context/Web3ModalContext";
import { useLoading, Rings } from "@agney/react-loading";
import { AssetsContext } from "../context/AssetsContext";

interface TokenGridProps {}

const TokenGrid: React.FC<TokenGridProps> = () => {
  const { address } = useContext(Web3ModalContext);

  const { assets, loadMore, loading } = useContext(AssetsContext);
  const [shouldResetScroll, setShouldResetScroll] = useState(false);
  const [scrollIndex, setScrollIndex] = useState(0);
  const lastItemRef = useRef(null);
  const { containerProps, indicatorEl } = useLoading({
    loading: loading,
    indicator: <Rings width="50" />,
  });

  // TODO: fix the scroll position jankiness that happens when loading more.
  useEffect(() => {
    const lastItem = lastItemRef.current;
    if (lastItem != null && shouldResetScroll) {
      console.log("trying to reset scroll");
      lastItem.scrollIntoView();
      setShouldResetScroll(false);
    }
  }, [assets]);

  return (
    <div className={styles.main}>
      <div className={styles.grid}>
        {assets.map((item, index) => {
          return (
            <span ref={index === scrollIndex ? lastItemRef : null} className={styles.cardSpan}>
              <TokenCard
                key={item.id}
                name={item.name}
                uri={item.image_url}
                type={item.asset_contract.name}
                index={index}
              />
            </span>
          );
        })}
      </div>
      <section {...containerProps}>{indicatorEl}</section>
      <div className={styles.footer}>
        <a
          href="#"
          onClick={() => {
            setScrollIndex(assets.length - 1);
            setShouldResetScroll(true);
            loadMore();
          }}
        >
          Load More
        </a>
      </div>
    </div>
  );
};

export { TokenGrid };
