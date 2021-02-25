import { TokenCard } from "../TokenGrid/TokenCard";
import { CartItem } from "../../hooks/useCart";

export interface CartDetailsTableProps {
  cart: Array<CartItem>;
}

export default function Order(props: CartDetailsTableProps) {
  return (
    <div style={styles.ordersCompleted}>
      {props.cart.map((item) => {
        return (
          <div style={styles.orderCompletedDiv} key={item.name}>
            <TokenCard name={item.name} uri={item.preview_uri} width={300} />

            <div style={styles.orderConfiguration}>
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

// need to use inline styles because this will be rendered as an email
const styles = {
  ordersCompleted: {
    width: "-webkit-fill-available",
    height: "-webkit-fill-available",
  },
  orderCompletedDiv: {
    padding: "10px",
    display: "flex",
  },
  orderConfiguration: {
    marginLeft: "1rem",
    fontSize: "1.2em",
    paddingBottom: "5px",
  },
};
