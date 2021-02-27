import { Button } from "@material-ui/core";

export interface OptionRowProps {
  title: string;
  selection: string;
  options: Array<string>;
  onSelect: (selection: string) => void;
}

const OptionRow = (props: OptionRowProps) => {
  return (
    <div className="optionRow">
      <span className="largeFont marginRightLarge">
        <a className="navigationLinks siteTitleLink">{props.title}</a>
      </span>
      <div className="row">
        {props.options.map((option) => {
          return (
            <Button
              key={option}
              style={{ marginRight: "1rem", minWidth: "10rem" }}
              color="primary"
              disabled={props.selection === option}
              onClick={() => {
                props.onSelect(option);
              }}
              variant="outlined"
            >
              {option}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export { OptionRow };
