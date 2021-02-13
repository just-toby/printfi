import { useWeb3React } from '@web3-react/core'
import React, { useEffect, useState } from 'react'
import { InjectedConnector } from '@web3-react/injected-connector'
import WalletModal from '../WalletModal'

export const injectedConnector = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42]
})

export default function Web3Status() {
  const { active, account, activate } = useWeb3React()

  console.log("useWeb3React: ");

  useEffect(() => {
    activate(injectedConnector);
  }, [])

  if (!active) {
    return null
  }

  else 
  {
    return (
      <div>
        <WalletModal/>
      </div>

    )
  }
}