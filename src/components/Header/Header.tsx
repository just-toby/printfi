import React, { useState } from "react";
import Head from "next/head";
import HeaderActions, { SubPage } from "./HeaderActions";
import Web3Status from "../Web3Status";

interface HeaderProps {
  subPage: SubPage;
}

function Header(props: HeaderProps) {
  const [walletDropdown, setWalletDropdown] = useState(false);

  const toggleWalletDropdown = () => {
    setWalletDropdown(!walletDropdown);
  };

  return (
    <>
      <Head>
        <title>NiftyPrints</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderActions
        toggleWalletDropdown={toggleWalletDropdown}
        subPage={props.subPage}
      />
      <Web3Status
        walletDropdown={walletDropdown}
        toggleWalletDropdown={toggleWalletDropdown}
      />
    </>
  );
}
export default Header;
