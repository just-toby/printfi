import React, {} from 'react'
import WalletModal from '../WalletModal'

export default function Web3Status(props) {
  const { walletDropdown , toggleWalletDropdown} = props;
  return (
    <>
      <WalletModal walletDropdown={walletDropdown} toggleWalletDropdown={toggleWalletDropdown}/>
    </>
  )
}