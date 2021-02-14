import React, { useState } from "react";
import styles from "../styles/Home.module.css";
import { TokenGrid } from "../components/TokenGrid";
import Header from "../components/Header/Header"
import { useWeb3React } from '@web3-react/core'
import Web3Status from "../components/Web3Status";

export default function Home() {
  const { active } = useWeb3React()

  const [walletDropdown, setWalletDropdown] = useState(false);

  const toggleWalletDropdown = () => { 
    setWalletDropdown(!walletDropdown);  
  }

  return (
    <div className={styles.container}>
      <Header toggleWalletDropdown={toggleWalletDropdown}/>
      <Web3Status walletDropdown={walletDropdown} toggleWalletDropdown={toggleWalletDropdown}/>
      <main className={styles.main}>
        {active ? (
          <TokenGrid />
        ) : (
          <p className={styles.title}>digital art you can feel</p>
        )}
      </main>
    </div>
  );
}
