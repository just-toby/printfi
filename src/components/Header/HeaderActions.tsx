import * as React from "react";
import { useContext } from "react";
import Link from "next/link";
import { CartContext } from "../../context/CartContext";
import HeaderWalletConnector from "./HeaderWalletConnector"

export type SubPage = "print" | "cart";

function HeaderActions (props) {
  const { cart } = useContext(CartContext);

  
  return (
    <div className="headerDiv">
        <div className="navPadding">
            <Link href="/">
                <a className="navigationLinks siteTitleLink">
                Print.Fi
                </a>
            </Link>
            <Link href="/">
            <a className="navigationLinks">
                Print
            </a>
            </Link>
            <Link href="/review">
            <a className="navigationLinks">
                {cart.length > 0 ? "Cart (" + cart.length + ")" : "Cart"}
            </a>
            </Link>
        </div>

        <div className="flexStretch"/>

        <div className="navPadding"> 
            <HeaderWalletConnector/>
        </div>

    </div>
  );
};

export default HeaderActions;