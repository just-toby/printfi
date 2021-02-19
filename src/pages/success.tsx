import React from "react";
import Header from "../components/Header/Header";
import classNames from "classnames";
import Image from "next/image";

export default function Success() {
  return (
    <div className={"container"}>
      <Header subPage="cart" />
      <main className={"main"}>
        <Image src="/succes_image.jpg" width={500} height={400} />
        <div className={"cartTitleContainer"}>
          <span className={classNames("largeFont")}>Success!</span>
        </div>
        <div>
          <span className={"mediumFont"}>
            We've received your payment. Look out for an email confirming the
            details!
          </span>
        </div>
      </main>
    </div>
  );
}
