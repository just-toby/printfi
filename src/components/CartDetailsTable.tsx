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
    <div className="ordersCompleted">
      {props.cart.map((item) => {
        return (
          <div className="orderCompletedDiv">
            <TokenCard
                name={item.name}
                uri={item.preview_uri}
                width={300}
            />
            {/* <tr key={item.name}>
              {rowItem(item.config.size)}
              {rowItem(item.config.frame)}
              {rowItem(item.config.glass)}
              {rowItem(item.config.space)}
            </tr> */}
          </div>
        );
      })}
    </div>
  );
}
