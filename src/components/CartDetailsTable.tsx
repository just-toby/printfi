import classNames from "classnames";
import { ReactNode } from "react";
import styles from "../styles/Home.module.css";
import { TokenCard } from "../components/TokenCard";
import { CartItem } from "../hooks/useCart";

export interface CartDetailsTableProps {
  cart: Array<CartItem>;
}

export default function CartDetailsTable(props: CartDetailsTableProps) {
  const rowItem = (content: ReactNode) => {
    return <td className={classNames(styles.cartRowItem)}>{content}</td>;
  };

  return (
    <table className={styles.cartTable}>
      <tbody>
        <tr>
          {["Size", "Frame", "Glass", "Space"].map((label) => {
            return (
              <td
                key={label}
                className={classNames(styles.largeFont, styles.cartTableHeader)}
              >
                {label}
              </td>
            );
          })}
          <td
            className={classNames(
              styles.largeFont,
              styles.cartTableHeaderCentered
            )}
          >
            Image
          </td>
        </tr>
        {props.cart.map((item) => {
          return (
            <tr key={item.name}>
              {rowItem(item.config.size)}
              {rowItem(item.config.frame)}
              {rowItem(item.config.glass)}
              {rowItem(item.config.space)}
              {rowItem(
                <TokenCard
                  name={item.name}
                  uri={item.preview_uri}
                  height={100}
                  width={70}
                />
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
