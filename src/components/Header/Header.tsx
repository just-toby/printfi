import React from "react";
import Head from "next/head";
import HeaderActions from "./HeaderActions";
import Web3Status from "../../components/Web3Status"
function Header (props) {
    const {subPage, toggleWalletDropdown} = props;
    return (
        <>
            <Head>
                <title>Print.Fi</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <HeaderActions toggleWalletDropdown={toggleWalletDropdown} subPage={subPage}/>
        </>
    )
}
export default Header