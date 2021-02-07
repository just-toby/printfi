import classNames from "classnames";
import styles from "../styles/Home.module.css";

export interface ConfirmButtonProps {
  title: string;
  onClick: () => void;
}

const ConfirmButton: React.FC<ConfirmButtonProps> = (
  props: ConfirmButtonProps
) => {
  return (
    <div onClick={props.onClick} className={classNames(styles.confirmButton, styles.marginTop)}>
      <span
        className={classNames(styles.smallFont, styles.disableTextSelection)}
      >
        {props.title}
      </span>
    </div>
  );
};

export { ConfirmButton };
