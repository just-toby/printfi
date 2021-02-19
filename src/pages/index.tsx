import React from "react";
import styles from "../styles/Home.module.css";
import { TokenGrid } from "../components/TokenGrid";
import Header from "../components/Header/Header";
import { useWeb3React } from "@web3-react/core";
import { MockConfirmationEmail } from "../components/Email/";

export default function Home() {
  const { active } = useWeb3React();

  if (process.env.NEXT_PUBLIC_DEV_MODE === "email") {
    return MockConfirmationEmail;
  }

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
