import React from "react";
import { TokenGrid } from "../components/TokenGrid";
import Header from "../components/Header/Header";
import { useWeb3React } from "@web3-react/core";
import { MockConfirmationEmail } from "../components/Email/";
import Image from "next/image";

export default function Home() {
  const { active } = useWeb3React();

  if (process.env.NEXT_PUBLIC_DEV_MODE === "email") {
    return MockConfirmationEmail;
  }

  return (
    <div className={"container"}>
      <Header subPage="print" />

      <main className={"main"}>
        {active ? (
          <TokenGrid />
        ) : (
          <div>
            <Image
              src="/Untitled-Artwork-off-white.jpg"
              width={800}
              height={640}
            />

            <p className={"title"}>digital art you can feel</p>
          </div>
        )}
      </main>
    </div>
  );
}
