import React, { useContext, useState } from "react";
import Head from "next/head";
import HeaderActions from "./HeaderActions";

function Header () {
    return (
        <>
            <Head>
                <title>Print.Fi</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <HeaderActions/>
        </>
    )
}
export default Header