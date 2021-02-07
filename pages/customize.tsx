import Head from "next/head";
import React from "react";
import styles from "../styles/Home.module.css";
import { NavBar } from "../components/NavBar";

interface CustomizePageProps {}

export default function Customize(props: CustomizePageProps) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Print.Fi</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar subPage="print" />
      <main className={styles.main}>
        {/* TODO: BUILD THIS UI */}
        <p>customization screen</p>
        <p>choose size, frame, glass, and spacing</p>
        <p>"add to cart" button</p>
      </main>
    </div>
  );
}
