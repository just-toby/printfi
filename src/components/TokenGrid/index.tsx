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
        itemCount={
          1000 /* arbitrary large number for infinite loading, doesn't affect perf */
        }
        loadMoreItems={loadMoreItems}
      >
        {({ onItemsRendered, ref }) => (
          <Grid
            onItemsRendered={(props: GridOnItemsRenderedProps) => {
              // InfiniteLoader's onItemsRendered expects list props,
              // so we need to give the indices of the first/last items
              // in the corresponding rows.
              onItemsRendered({
                overscanStartIndex: props.overscanRowStartIndex * 3,
                overscanStopIndex: props.overscanRowStopIndex * 3 + 2,
                visibleStartIndex: props.visibleRowStartIndex * 3,
                visibleStopIndex: Math.min(
                  props.visibleRowStopIndex * 3 + 2,
                  assets.length - 1
                ),
              });
            }}
            ref={ref}
            columnCount={3}
            columnWidth={windowWidth * 0.33}
            rowCount={Math.ceil(itemCount / 3)}
            rowHeight={windowWidth * 0.33 * 1.1}
            height={windowHeight - 75}
            width={windowWidth}
          >
            {({ columnIndex, rowIndex, style }) => {
              const index = rowIndex * 3 + columnIndex;
              if (index >= assets.length) {
                return null;
              }
              const item = assets[index];
              return (
                <div style={style}>
                  <div
                    style={{
                      display: "flex",
                      marginTop: "4rem",
                      flexDirection: "row",
                      justifyContent: "center",
                      marginLeft:
                        columnIndex % 3 === 0 ? windowWidth * 0.06 : 0,
                      marginRight:
                        columnIndex % 3 === 2 ? windowWidth * 0.06 : 0,
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
