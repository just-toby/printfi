import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { SUPPORTED_WALLETS } from '../../utils/constants'

import Modal from '../Modal'
import Option from './Option'
import PendingView from './PendingReview'
import { Button } from '@material-ui/core';

const CloseIcon = styled.div`
  position: absolute;
  right: 1rem;
  top: 14px;
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
`
const UpperSection = styled.div`
  position: relative;

  h5 {
    margin: 0;
    margin-bottom: 0.5rem;
    font-size: 1rem;
    font-weight: 400;
  }

  h5:last-child {
    margin-bottom: 0px;
  }

  h4 {
    margin-top: 0;
    font-weight: 500;
  }
`
const HoverText = styled.div`
  :hover {
    cursor: pointer;
  }
`

const WALLET_VIEWS = {
  OPTIONS: 'options',
  OPTIONS_SECONDARY: 'options_secondary',
  ACCOUNT: 'account',
  PENDING: 'pending'
}

console.log("WalletModal");

export default function WalletModal(props)
{
  // important that these are destructed from the account-specific web3-react context
  const { active, account, connector, activate, error } = useWeb3React()
  // const [walletView, setWalletView] = useState(WALLET_VIEWS.ACCOUNT)
  const [walletDropdown, setWalletDropdown] = useState(false);

  const openWalletModal = () => { 
    console.log("OpenWalletModal: ", openWalletModal);
    setWalletDropdown(true);  
  }

  const formatAddress: (address: string) => string = (address) => {
    return address.slice(0, 6) + "..." + address.slice(address.length - 4);
  };

  // get wallets user can switch too, depending on device/browser
  function getOptions() {
    return Object.keys(SUPPORTED_WALLETS).map(key => {
      const option = SUPPORTED_WALLETS[key];
      return (
          <Option
            id={`connect-${key}`}
            key={key}
            active={option.connector && option.connector === connector}
            color={option.color}
            link={option.href}
            header={option.name}
            subheader={null}
            icon={'../../assets/images/metamask.png'}
          />
      )
    })
  }

  function getModalContent() {
    console.log("walletDropDown: ", walletDropdown);
    console.log("account: ", account);
    return (
      <div>
        {account ? (
            <Button 
                // href="/"
                onClick={openWalletModal}
                color="primary"
                variant="outlined">
                {formatAddress(account)}
            </Button>
        ) : (
            <HoverText>Connect to a wallet</HoverText>
        )}
        {walletDropdown && <div>{getOptions()}</div>}
          
      </div>
    )
  }
    return (
      // <Modal isOpen={null} onDismiss={null} minHeight={false} maxHeight={90}>
        getModalContent()
      // </Modal>
    )  
}