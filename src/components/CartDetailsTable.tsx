import { ReactNode } from "react";
import { TokenCard } from "./TokenGrid/Token";
import { CartItem } from "../hooks/useCart";

export interface CartDetailsTableProps {
  cart: Array<CartItem>;
}

export default function CartDetailsTable(props: CartDetailsTableProps) {
  const rowItem = (content: ReactNode) => {
    return <td className="cartRowItem">{content}</td>;
  };

  return (
    <table className="cartTable">
      <tbody>
        <tr>
          {["Size", "Frame", "Glass", "Space"].map((label) => {
            return (
              <td
                key={label}
                className={"largeFont cartTableHeader"}
              >
                {label}
              </td>
            );
          })}
          <td
            className="largeFont cartTableHeaderCentered"
          >
            Image
          </td>
        </tr>
        {props.cart.map((item, index) => {
          return (
            <tr key={index}>
              {rowItem(item.config.size)}
              {rowItem(item.config.frame)}
              {rowItem(item.config.glass)}
              {rowItem(item.config.space)}
              {rowItem(
                <TokenCard name={item.name} uri={item.preview_uri} width={70} />
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
