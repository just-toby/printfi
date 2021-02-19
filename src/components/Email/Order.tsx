import { TokenCard } from "../TokenCard";
import { CartItem } from "../../hooks/useCart";

export interface CartDetailsTableProps {
  cart: Array<CartItem>;
}

export default function Order(props: CartDetailsTableProps) {
  return (
    <div className="ordersCompleted">
      {props.cart.map((item) => {
        return (
          <div className="orderCompletedDiv" key={item.name}>
            {item.collection_slug === "avastar" ? (
              <TokenCard name={item.name} uri={item.preview_uri} width={300} />
            ) : (
              <img
                src={`data:image/svg+xml;utf8,${item.high_quality_image}`}
                alt=""
                width={300}
              />
            )}

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
