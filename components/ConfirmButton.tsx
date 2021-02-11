import { Rings, useLoading } from "@agney/react-loading";
import classNames from "classnames";
import React from "react";
import styles from "../styles/Home.module.css";

export interface ConfirmButtonProps {
  title: string;
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
}

const ConfirmButton: React.FC<ConfirmButtonProps> = (
  props: ConfirmButtonProps
) => {
  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    indicator: <Rings width="40" />,
  });

  return (
    <button
      onClick={props.disabled === true ? null : props.onClick}
      type={props.type}
      className={classNames(
        props.disabled === true
          ? styles.confirmButtonDisabled
          : styles.confirmButton,
        styles.marginTop
      )}
    >
      {props.loading === true ? (
        <div className={styles.container}>
          <section {...containerProps}>{indicatorEl}</section>
        </div>
      ) : (
        <span
          className={classNames(styles.smallFont, styles.disableTextSelection)}
        >
          {props.title}
        </span>
      )}
    </button>
  );
};

export { ConfirmButton };
