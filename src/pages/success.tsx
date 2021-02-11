import Head from "next/head";
import React, { useContext, useRef, useState } from "react";
import styles from "../styles/Home.module.css";
import { NavBar } from "../components/NavBar";
import classNames from "classnames";
import { CartContext } from "../context/CartContext";
import { CheckoutButton } from "../components/CheckoutButton";
import { Rings, useLoading } from "@agney/react-loading";
import { ConfirmButton } from "../components/ConfirmButton";
import useCoinbaseCommerceAPI, {
  CoinbaseCommerceAPI,
} from "../hooks/useCoinbaseCommerceAPI";
import { AddressFormFields } from "../components/AddressFormFields";
import { Form } from "react-bootstrap";
import { isNullOrEmpty } from "../utils/StringUtils";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ReviewPageProps {}

export default function Review(props: ReviewPageProps) {
  const { cart, clearCart } = useContext(CartContext);

  return (
    <div className={styles.container}>
      <Head>
        <title>Print.Fi</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar subPage="cart" />
      <main className={styles.main}>
        <div className={styles.cartTitleContainer}>
          <span className={classNames(styles.largeFont)}>Success!</span>
        </div>
        <div>
          <span className={styles.mediumFont}>
            We've received your payment and will be sending you an email with
            order details shortly.
          </span>
        </div>
        <ToastContainer />
      </main>
    </div>
  );
}
