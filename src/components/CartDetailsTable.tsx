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
          <div className="orderCompletedDiv" key={item.name}>
            <TokenCard
                name={item.name}
                uri={item.preview_uri}
                width={300}
            />

            <div className="orderConfiguration">
              <p>Size: {item.config.size} </p>
              <p>Frame: {item.config.frame} </p>
              <p>Glass Type: {item.config.glass} </p>
              <p>Space Type: {item.config.space} </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
