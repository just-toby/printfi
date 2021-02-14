import * as React from "react";
import { useContext } from "react";
import Link from "next/link";
import { CartContext } from "../../context/CartContext";
import { Button } from '@material-ui/core';
import { useWeb3React } from '@web3-react/core'

export type SubPage = "print" | "cart";

function HeaderActions (props) {
    const {subPage, toggleWalletDropdown} = props;
    const { cart } = useContext(CartContext);
    const { account } = useWeb3React()

    const formatAddress: (address: string) => string = (address) => {
        return address.slice(0, 6) + "..." + address.slice(address.length - 4);
      };

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
            {account ? (
                <Button 
                    // href="/"
                    onClick={toggleWalletDropdown}
                    color="primary"
                    variant="outlined">
                    {formatAddress(account)}
                </Button>
                ) : (
                    <Button 
                        // href="/"
                        onClick={toggleWalletDropdown}
                        color="primary"
                        variant="outlined">
                        {"Connect to a wallet"}
                    </Button>
                )}
        </div>

    </div>
  );
};

export default HeaderActions;