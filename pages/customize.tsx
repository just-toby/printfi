import Head from "next/head";
import React, { useContext } from "react";
import styles from "../styles/Home.module.css";
import { NavBar } from "../components/NavBar";
import { useRouter } from "next/router";
import { AssetsContext } from "../context/AssetsContext";
import { Asset } from "../hooks/useAssets";
import { Rings, useLoading } from "@agney/react-loading";

interface CustomizePageProps {}

export default function Customize(props: CustomizePageProps) {
  const router = useRouter();
  const { assets } = useContext(AssetsContext);
  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    indicator: <Rings width="50" />,
  });

  const { index } = router.query;
  const item: Asset = assets[Number(index)];

  return (
    <div className={styles.container}>
      <Head>
        <title>Print.Fi</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar subPage="print" />
      <main className={styles.main}>
        {item == null ? (
          <section {...containerProps}>{indicatorEl}</section>
        ) : (
          <div>
            <p>{item.name}</p>
            <p>{item.image_url}</p>
          </div>
        )}
      </main>
    </div>
  );
}
