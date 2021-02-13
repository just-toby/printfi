import React from "react";
import Head from "next/head";
import HeaderActions from "./HeaderActions";
import Web3Status from "../../components/Web3Status"
function Header (props) {
    const {subPage} = props;
    return (
        <>
            <Head>
                <title>Print.Fi</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <HeaderActions subPage={subPage}/>
        </>
    )
}
export default Header