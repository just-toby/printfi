import React, { ReactNode, useContext } from "react";
import styles from "../styles/Home.module.css";
import classNames from "classnames";
import { CartContext } from "../context/CartContext";
import { Rings, useLoading } from "@agney/react-loading";
import { ConfirmButton } from "../components/ConfirmButton";
import { NextRouter, useRouter } from "next/router";
import Header from "../components/Header/Header";
import CartDetailsTable from "../components/CartDetailsTable";

interface ReviewPageProps {}

export default function Review() {
  const { cart } = useContext(CartContext);
  const router: NextRouter = useRouter();

  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    indicator: <Rings width="100" />,
  });

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
            <CartDetailsTable cart={cart} />
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
