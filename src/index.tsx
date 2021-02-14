import React, { useContext, useState } from "react";
import styles from "../styles/Home.module.css";
import { TokenGrid } from "./components/TokenGrid";
import { Web3ModalContext } from "./context/Web3ModalContext";
import Header from "./components/Header/Header"

export default function Home() {
  const { connected } = useContext(Web3ModalContext);

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        {connected ? (
          <TokenGrid />
        ) : (
          <p className={styles.title}>digital art you can feel</p>
        )}
      </main>
    </div>
  );
}