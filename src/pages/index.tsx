import React from "react";
import Header from "../components/Header/Header";
import { MockConfirmationEmail } from "../components/Email/";
import Body from "./body"
export default function Home() {

  if (process.env.NEXT_PUBLIC_DEV_MODE === "email") {
    return MockConfirmationEmail;
  }

  return (
    <div className="container">
      <Header subPage="print" />
      <div className="main">
        <Body/>
      </div>
    </div>
  );
}
