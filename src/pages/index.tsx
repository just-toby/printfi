import React from "react";
import styles from "../styles/Home.module.css";
import { TokenGrid } from "../components/TokenGrid";
import Header from "../components/Header/Header";
import { useWeb3React } from "@web3-react/core";
import { ConfirmationEmail } from "../components/Email/";

export default function Home() {
  type Address = {
    name: string;
    email: string;
    address: string;
    address2: string;
    city: string;
    state: string;
    zip: string;
  };
  const { active } = useWeb3React();

  if (process.env.NEXT_PUBLIC_DEV_MODE === "email") {
    return (
      <ConfirmationEmail
        orderId={"1234"}
        mailingAddress={{
          name: "Just Toby",
          email: "ejd4@protonmail.com",
          address: "1234 Pine Street",
          address2: "Apt 2222",
          city: "Seattle",
          state: "WA",
          zip: "98101",
        }}
        cartItems={[
          {
            name: "first NFT",
            basic_uri:
              "https://lh3.googleusercontent.com/OPktDZrm80U-Mcza8Kwiqrq8t7cEX7BFdKgOUN0SlMTZhQt1yBNkJyuF6n5l7oPAKH5wEjeyALWWnZi7MbHP4955mtiOO3BEvoAp",
            original_uri:
              "https://lh3.googleusercontent.com/OPktDZrm80U-Mcza8Kwiqrq8t7cEX7BFdKgOUN0SlMTZhQt1yBNkJyuF6n5l7oPAKH5wEjeyALWWnZi7MbHP4955mtiOO3BEvoAp",
            preview_uri:
              "https://lh3.googleusercontent.com/OPktDZrm80U-Mcza8Kwiqrq8t7cEX7BFdKgOUN0SlMTZhQt1yBNkJyuF6n5l7oPAKH5wEjeyALWWnZi7MbHP4955mtiOO3BEvoAp",
            config: {
              size: "big",
              frame: "White",
              glass: "matte",
              space: "0",
            },
          },
          {
            name: "second NFT",
            basic_uri:
              "https://lh3.googleusercontent.com/9JRYIfFOyY66aeL2QpVySKVjwgaoz33FCwhvko_IIXN35EDY4AD97pGgBNNbbLiffW2rl8QgW9vBJ-hfhNOuWE7FssUgYwL0bDlKWQ",
            original_uri:
              "https://lh3.googleusercontent.com/9JRYIfFOyY66aeL2QpVySKVjwgaoz33FCwhvko_IIXN35EDY4AD97pGgBNNbbLiffW2rl8QgW9vBJ-hfhNOuWE7FssUgYwL0bDlKWQ",
            preview_uri:
              "https://lh3.googleusercontent.com/9JRYIfFOyY66aeL2QpVySKVjwgaoz33FCwhvko_IIXN35EDY4AD97pGgBNNbbLiffW2rl8QgW9vBJ-hfhNOuWE7FssUgYwL0bDlKWQ",
            config: {
              size: "small",
              frame: "Black",
              glass: "glossy",
              space: "3",
            },
          },
        ]}
      />
    )
  }

  return (
    <div className={styles.container}>
      <Header subPage="print" />

      <main className={styles.main}>
        {active ? (
          <TokenGrid />
        ) : (
          <p className={styles.title}>digital art you can feel</p>
        )}
      </main>
    </div>
  );
}
