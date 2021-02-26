import { FixedSizeGrid as Grid } from "react-window";
import { Skeleton } from '@material-ui/lab';

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
      {({ style }) => {
        return (
          <div style={style}>
            <Skeleton width={tileWidth} height={tileHeight} variant="rect" className="loadingCard"/>
          </div>
        );
      }}
    </Grid>
  );
}
