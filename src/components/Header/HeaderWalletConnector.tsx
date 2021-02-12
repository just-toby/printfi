import styles from "../../styles/Home.module.css";
import * as React from "react";
import { Web3ModalContext } from "../../context/Web3ModalContext";
import { useContext } from "react";
import Link from "next/link";
import { Button } from '@material-ui/core';

function HeaderWalletConnector () {
    const { connected, address, connect, disconnect } = useContext(
        Web3ModalContext
    );
    
    const formatAddress: (address: string) => string = (address) => {
        return address.slice(0, 6) + "..." + address.slice(address.length - 4);
    };
    if(connected)
        return (
            <Button 
                href="/"
                onClick={disconnect}
                color="primary"
                variant="outlined">
                {formatAddress(address)}
            </Button>
        )
    else 
        return (
            <Button
                href="#"
                onClick={connect}
                color="primary"
                variant="outlined"
            >
            Connect to a Wallet
            </Button>

        )
}

export default HeaderWalletConnector