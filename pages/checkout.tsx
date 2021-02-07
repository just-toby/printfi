import Head from "next/head";
import React, { ReactNode, useContext } from "react";
import styles from "../styles/Home.module.css";
import { NavBar } from "../components/NavBar";
import classNames from "classnames";
import { CartContext } from "../context/CartContext";
import { TokenCard } from "../components/TokenCard";
import { ConfirmButton } from "../components/ConfirmButton";

interface CheckoutPageProps {}

export default function Checkout(props: CheckoutPageProps) {
  const { cart } = useContext(CartContext);

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

        <div>
          <table className={styles.cartTable}>
            <tr>
              {["Size", "Frame", "Glass", "Space"].map((label) => {
                return (
                  <td
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
                <tr>
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
          </table>
          <div className={styles.cartConfirmButton}>
            <ConfirmButton
              disabled={false}
              title="Continue"
              onClick={() => {
                // TODO: continue to stripe checkout with current cart.
              }}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
