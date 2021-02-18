import styles from "../styles/Home.module.css";
import classNames from "classnames";
import { Button } from "@material-ui/core";

export interface OptionRowProps {
  title: string;
  selection: string;
  options: Array<string>;
  onSelect: (selection: string) => void;
}

const OptionRow = (props: OptionRowProps) => {
  return (
    <div className={styles.optionRow}>
      <span className={classNames(styles.largeFont, styles.marginRightLarge)}>
        <a className="navigationLinks siteTitleLink">{props.title}</a>
      </span>
      <div className={styles.row}>
        {props.options.map((option) => {
          return (
            <Button
              key={option}
              style={{ marginRight: "1rem", minWidth: "8rem" }}
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
