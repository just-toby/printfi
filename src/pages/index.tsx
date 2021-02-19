import React from "react";
import styles from "../styles/Home.module.css";
import { TokenGrid } from "../components/TokenGrid";
import Header from "../components/Header/Header";
import { useWeb3React } from "@web3-react/core";
import { ConfirmationEmail, MockConfirmationEmail } from "../components/Email/";

export default function Home() {
  type Address = {
    name: string;
    email: string;
    address: string;
    address2: string;
    city: string;
    state: string;
    zip: string;
  };
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
