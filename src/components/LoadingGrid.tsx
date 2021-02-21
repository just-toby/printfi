import { FixedSizeGrid as Grid } from "react-window";
import { Shimmer } from "react-shimmer";

interface LoadingGridProps {
  windowWidth: number;
  windowHeight: number;
}

export function LoadingGrid(props: LoadingGridProps) {
  const tileWidth = props.windowWidth * 0.2;
  const tileHeight = props.windowWidth * 0.2;
  return (
    <Grid
      columnCount={3}
      columnWidth={props.windowWidth * 0.32}
      rowCount={3}
      rowHeight={(props.windowWidth * 0.2) / 0.65}
      height={props.windowHeight - 75}
      width={props.windowWidth}
    >
      {({ columnIndex, rowIndex, style }) => {
        return (
          <div style={style}>
            <Shimmer
              width={tileWidth}
              height={tileHeight}
              className="loadingCard"
            />
          </div>
        );
      }}
    </Grid>
  );
}
