import React, { ReactNode, useContext } from "react";
import styles from "../styles/Home.module.css";
import classNames from "classnames";
import { CartContext } from "../context/CartContext";
import { TokenCard } from "../components/TokenCard";
import { Rings, useLoading } from "@agney/react-loading";
import { ConfirmButton } from "../components/ConfirmButton";
import { NextRouter, useRouter } from "next/router";
import Header from "../components/Header/Header";

interface ReviewPageProps {}

export default function Review() {
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
      <Header subPage="cart" />
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
                          uri={item.preview_uri}
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
