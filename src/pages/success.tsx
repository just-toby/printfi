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
        <Image src="/succes_image.jpg" width={500} height={400} />
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
