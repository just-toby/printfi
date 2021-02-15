import React from "react";
import styles from "../styles/Home.module.css";
import Header from "../components/Header/Header";
import classNames from "classnames";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

interface SuccessPageProps {}

export default function Success(props: SuccessPageProps) {
  return (
    <div className={styles.container}>
      <Header subPage="cart" />
      <main className={styles.main}>
        <div className={styles.cartTitleContainer}>
          <span className={classNames(styles.largeFont)}>Success!</span>
        </div>
        <div>
          <span className={styles.mediumFont}>
            We've received your payment. Look out for an email confirming the details!
          </span>
        </div>
        <Image src="/succes_image.jpg" width={500} height={400} />

        <ToastContainer />
      </main>
    </div>
  );
}
