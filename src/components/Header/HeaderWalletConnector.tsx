import * as React from "react";
import { Button } from '@material-ui/core';
import { useWalletModalToggle } from '../../state/application/hooks';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'

function HeaderWalletConnector () {
    const { account, connector, error } = useWeb3React()
    const toggleWalletModal = useWalletModalToggle();

    const formatAddress: (address: string) => string = (address) => {
        return address.slice(0, 6) + "..." + address.slice(address.length - 4);
    };
    
    if(account)
        return (
            <Button 
                href="/"
                onClick={() => toggleWalletModal}
                color="primary"
                variant="outlined">
                {formatAddress(account)}
            </Button>
        )
    else 
        return (
            <Button
                href="#"
                onClick={() => useWalletModalToggle()}
                color="primary"
                variant="outlined"
            >
            Connect to a Wallet
            </Button>

        )
}

export default HeaderWalletConnector