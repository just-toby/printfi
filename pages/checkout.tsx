import Head from "next/head";
import React from "react";
import styles from "../styles/Home.module.css";
import { NavBar } from "../components/NavBar";

interface CheckoutPageProps {}

export default function Checkout(props: CheckoutPageProps) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Print.Fi</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar subPage="cart" />
      <main className={styles.main}>
        {/* TODO: BUILD THIS UI */}
        <p>multi-screen flow for:</p>
        <p>1 view cart list</p>
        <p>2 enter shipping info</p>
        <p>3 payment / confirmation</p>
      </main>
    </div>
  );
}
