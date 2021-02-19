import { TokenCard } from "../TokenCard";
import { CartItem } from "../../hooks/useCart";

export type HighQualityImages = { [id: string]: string } | null;
export interface CartDetailsTableProps {
  cart: Array<CartItem>;
  // map token id to local filepath
  highQualityImages?: HighQualityImages;
}

export default function Order(props: CartDetailsTableProps) {
  const getImage = (item: CartItem, highQualityImages: HighQualityImages) => {
    if (highQualityImages == null || highQualityImages[item.token_id] == null) {
      return <TokenCard name={item.name} uri={item.preview_uri} width={300} />;
    } else {
      return <img src={highQualityImages[item.token_id]} alt="" width={300} />;
    }
  };

  return (
    <div className="ordersCompleted">
      {props.cart.map((item) => {
        return (
          <div className="orderCompletedDiv" key={item.name}>
            {getImage(item, props.highQualityImages)}

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
