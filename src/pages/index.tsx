import React, { useState } from "react";
import styles from "../styles/Home.module.css";
import { TokenGrid } from "../components/TokenGrid";
import Header from "../components/Header/Header";
import { useWeb3React } from "@web3-react/core";

export default function Home() {
  const { active } = useWeb3React();

  return (
    <div className={styles.container}>
      <Header subPage="print" />

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
