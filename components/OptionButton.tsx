import classNames from "classnames";
import styles from "../styles/Home.module.css";

export interface OptionButtonProps {
  title: string;
  selected: boolean;
  onClick: () => void;
}

const OptionButton: React.FC<OptionButtonProps> = (
  props: OptionButtonProps
) => {
  return (
    <div
      onClick={props.onClick}
      className={
        props.selected ? styles.optionButtonSelected : styles.optionButton
      }
    >
      <span
        className={classNames(styles.smallFont, styles.disableTextSelection)}
      >
        {props.title}
      </span>
    </div>
  );
};

export { OptionButton };
