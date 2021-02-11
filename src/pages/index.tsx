import Head from "next/head";
import React, { useContext, useState } from "react";
import styles from "../styles/Home.module.css";
import { NavBar } from "../components/NavBar";
import { TokenGrid } from "../components/TokenGrid";
import { Web3ModalContext } from "../context/Web3ModalContext";

export default function Home() {
  const { connected } = useContext(Web3ModalContext);

  return (
    <div className={styles.container}>
      <Head>
        <title>Print.Fi</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar subPage="print" />
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
