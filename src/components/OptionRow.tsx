import styles from "../styles/Home.module.css";
import { OptionButton } from "./OptionButton";
import classNames from "classnames";
import styled from 'styled-components'
import { Button } from "@material-ui/core";

const OptionRow = (props) => {
  return (
    <div className={styles.optionRow}>
      <span className={classNames(styles.largeFont, styles.marginRightLarge)}>
        <a className="navigationLinks siteTitleLink">{props.title}</a>
      </span>
      <div className={styles.row}>
        {props.options.map((option) => {
          return (
            <Button
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
