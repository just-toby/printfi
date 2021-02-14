import styles from "../styles/Home.module.css";
import { OptionButton } from "./OptionButton";
import classNames from "classnames";

export interface OptionRowProps {
  title: string;
  options: Array<string>;
  selection: string | null;
  onSelect: (selection: string) => void;
}

const OptionRow: React.FC<OptionRowProps> = (props: OptionRowProps) => {
  return (
    <div className={styles.optionRow}>
      <span className={classNames(styles.largeFont, styles.marginRightLarge)}>
        {props.title}
      </span>
      <div className={styles.row}>
        {props.options.map((option) => {
          return (
            <OptionButton
              key={option}
              title={option}
              selected={props.selection === option}
              onClick={() => {
                props.onSelect(option);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export { OptionRow };
