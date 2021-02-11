import Head from "next/head";
import React, { ReactNode, useContext, useState } from "react";
import styles from "../styles/Home.module.css";
import { NavBar } from "../components/NavBar";
import classNames from "classnames";
import { CartContext } from "../context/CartContext";
import { TokenCard } from "../components/TokenCard";
import { Rings, useLoading } from "@agney/react-loading";
import { ConfirmButton } from "../components/ConfirmButton";
import { NextRouter, Router, useRouter } from "next/router";

interface ReviewPageProps {}

export default function Review(props: ReviewPageProps) {
  const { cart } = useContext(CartContext);
  const router: NextRouter = useRouter();

  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    indicator: <Rings width="100" />,
  });

  const rowItem = (content: ReactNode) => {
    return <td className={classNames(styles.cartRowItem)}>{content}</td>;
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Print.Fi</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar subPage="cart" />
      <main className={styles.main}>
        <div className={styles.cartTitleContainer}>
          <span className={classNames(styles.largeFont)}>
            Checkout - Review
          </span>
        </div>
        {cart.length === 0 ? (
          <div className={styles.container}>
            <section {...containerProps}>{indicatorEl}</section>
          </div>
        ) : (
          <div>
            <table className={styles.cartTable}>
              <tbody>
                <tr>
                  {["Size", "Frame", "Glass", "Space"].map((label) => {
                    return (
                      <td
                        key={label}
                        className={classNames(
                          styles.largeFont,
                          styles.cartTableHeader
                        )}
                      >
                        {label}
                      </td>
                    );
                  })}
                  <td
                    className={classNames(
                      styles.largeFont,
                      styles.cartTableHeaderCentered
                    )}
                  >
                    Image
                  </td>
                </tr>
                {cart.map((item) => {
                  return (
                    <tr key={item.name}>
                      {rowItem(item.config.size)}
                      {rowItem(item.config.frame)}
                      {rowItem(item.config.glass)}
                      {rowItem(item.config.space)}
                      {rowItem(
                        <TokenCard
                          name={item.name}
                          uri={item.uri}
                          height={100}
                          width={70}
                        />
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {cart.length === 0 ? null : (
              <div className={styles.cartConfirmButton}>
                <ConfirmButton
                  title="Next"
                  disabled={false}
                  onClick={() => {
                    router.push("/checkout");
                  }}
                />
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
