import React, { useContext, useState } from "react";
import styles from "../styles/Home.module.css";
import { TokenGrid } from "../components/TokenGrid";
import Header from "../components/Header/Header"
import { useWeb3React } from '@web3-react/core'
import WalletModal from "../components/WalletModal";


export default function Home() {
  const { active } = useWeb3React()

  return (
    <div className={styles.container}>
      <Header/>
      <main className={styles.main}>
        {/* <WalletModal/> */}

        {active ? (
          <TokenGrid />
        ) : (
          <p className={styles.title}>digital art you can feel</p>
        )}
      </main>
    </div>
  );
}
