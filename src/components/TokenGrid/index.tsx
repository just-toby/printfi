import * as React from "react";
import { TokenCard } from "./TokenCard";
import { useContext, useEffect, useState } from "react";
import { AssetsContext } from "../../context/AssetsContext";
import { FixedSizeGrid as Grid, GridOnItemsRenderedProps } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import TokenGridNullState from "./NullState";
import { Rings, useLoading } from "@agney/react-loading";
import { LoadingGrid } from "./Loading";

interface TokenGridProps {}

const TokenGrid: React.FC<TokenGridProps> = () => {
  const { assets, loadMore, loading, hasNextPage } = useContext(AssetsContext);
  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    indicator: <Rings width="100" />,
  });

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
    const resizeListener = (_e: any) => {
      setWindowHeight(window.innerHeight);
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", resizeListener);
    return () => {
      window.removeEventListener("resize", resizeListener);
    };
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

  if (assets.length === 0 && !loading) {
    return <TokenGridNullState />;
  }

  if (loading && assets.length === 0) {
    return (
      <LoadingGrid windowHeight={windowHeight} windowWidth={windowWidth} />
    );
  }

  return (
    <div className={"main"}>
      <InfiniteLoader
        isItemLoaded={isItemLoaded}
        itemCount={itemCount}
        loadMoreItems={loadMoreItems}
      >
        {({ onItemsRendered, ref }) => (
          <Grid
            onItemsRendered={(props: GridOnItemsRenderedProps) => {
              // InfiniteLoader's onItemsRendered expects list props,
              // so we need to give the indices of the first/last items
              // in the corresponding rows.
              if (
                hasNextPage &&
                Math.abs(props.overscanRowStopIndex - itemCount / 3) < 2
              ) {
                loadMore(assets.length, 10);
              }
              onItemsRendered({
                overscanStartIndex: props.overscanRowStartIndex * 3,
                overscanStopIndex: props.overscanRowStopIndex * 3,
                visibleStartIndex: props.visibleRowStartIndex * 3,
                visibleStopIndex: props.visibleRowStopIndex * 3,
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
                <div
                  style={{
                    ...style,
                    marginTop: 100,
                    paddingLeft: 100,
                  }}
                >
                  <TokenCard
                    name={item?.name ?? ""}
                    uri={item?.image_url ?? ""}
                    link={{
                      pathname: "/customize",
                      query: { index: String(index) },
                    }}
                    width={windowWidth * 0.2}
                  />
                </div>
              );
            }}
          </Grid>
        )}
      </InfiniteLoader>
      {loading && assets.length > 0 ? (
        <div style={{ marginTop: "5rem" }}>
          <section {...containerProps}>{indicatorEl}</section>
        </div>
      ) : null}
    </div>
  );
};

export { TokenGrid };
