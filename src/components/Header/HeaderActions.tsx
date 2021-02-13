import * as React from "react";
import { useContext } from "react";
import Link from "next/link";
import { CartContext } from "../../context/CartContext";
// import HeaderWalletConnector from "./HeaderWalletConnector"
import Web3Status from "../../components/Web3Status"
import { Button } from '@material-ui/core';
// import { useActiveWeb3React } from '../../hooks' ERASE THIS

import WalletModal from "../WalletModal"

import { useWeb3React } from '@web3-react/core'


export type SubPage = "print" | "cart";

function HeaderActions (props) {
    const {subPage, toggleWalletDropdown} = props;
    const { cart } = useContext(CartContext);
    const { account } = useWeb3React()

    const formatAddress: (address: string) => string = (address) => {
        console.log("account: ")
        return address.slice(0, 6) + "..." + address.slice(address.length - 4);
      };

    console.log("Header Action rendering");

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
                    <div>Connect to a wallet</div>
                )}
        </div>

    </div>
  );
};

export default HeaderActions;