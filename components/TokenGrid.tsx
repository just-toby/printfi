import styles from "../styles/Home.module.css";
import * as React from "react";
import { TokenCard } from "./TokenCard";
import { useContext, useEffect, useState } from "react";
import { AssetsContext } from "../context/AssetsContext";
import { FixedSizeGrid as Grid, GridOnItemsRenderedProps } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import { toInteger } from "../utils/NumberUtils";

interface TokenGridProps {}

const TokenGrid: React.FC<TokenGridProps> = () => {
  const { assets, loadMore, loading, hasNextPage } = useContext(AssetsContext);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    window.addEventListener("resize", (e) => {
      setWindowHeight(window.innerHeight);
      setWindowWidth(window.innerWidth);
    });
  }, []);

  // If there are more items to be loaded then add an extra row to hold a loading indicator.
  const itemCount = hasNextPage ? assets.length + 1 : assets.length;
  // Only load 1 page of items at a time.
  // Pass an empty callback to InfiniteLoader in case it asks us to load more than once.
  const loadMoreItems = loading
    ? (_startIndex: number, _stopIndex: number) => null
    : loadMore;
  // Every row is loaded except for our loading indicator row.
  const isItemLoaded = (index: number) => !hasNextPage || index < assets.length;

  return (
    <div className={styles.main}>
      <InfiniteLoader
        isItemLoaded={isItemLoaded}
        itemCount={itemCount}
        loadMoreItems={loadMoreItems}
      >
        {({ onItemsRendered, ref }) => (
          <Grid
            onItemsRendered={(props: GridOnItemsRenderedProps) => {
              onItemsRendered({
                overscanStartIndex: toInteger(props.visibleRowStartIndex - 1),
                overscanStopIndex: toInteger(props.visibleRowStopIndex + 1),
                visibleStartIndex: toInteger(props.visibleRowStartIndex),
                visibleStopIndex: toInteger(props.visibleRowStopIndex),
              });
            }}
            ref={ref}
            columnCount={3}
            columnWidth={windowWidth * 0.33}
            rowCount={assets.length / 3}
            rowHeight={(windowWidth * 0.2) / 0.65}
            height={windowHeight - 75}
            width={windowWidth}
          >
            {({ columnIndex, rowIndex, style }) => {
              const index = rowIndex * 3 + columnIndex;
              const item = assets[index];
              return (
                <div style={{ ...style, marginTop: 100, paddingLeft: 100 }}>
                  <TokenCard
                    name={item?.name ?? ''}
                    uri={item?.image_url ?? ''}
                    link={{
                      pathname: "/customize",
                      query: { index: String(index) },
                    }}
                    height={(windowWidth * 0.2) / 0.7}
                    width={windowWidth * 0.2}
                  />
                </div>
              );
            }}
          </Grid>
        )}
      </InfiniteLoader>
    </div>
  );
};

export { TokenGrid };
