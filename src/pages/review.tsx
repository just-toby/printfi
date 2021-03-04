import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Rings, useLoading } from "@agney/react-loading";
import { NextRouter, useRouter } from "next/router";
import Header from "../components/Header/Header";
import CartDetailsTable from "../components/CartDetailsTable";
import { Button } from "@material-ui/core";

interface ReviewPageProps {}

export default function Review(props: ReviewPageProps) {
  const { cart } = useContext(CartContext);
  const router: NextRouter = useRouter();

  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    indicator: <Rings width="100" />,
  });

  return (
    <div className={"container"}>
      <Header subPage="cart" />
      <main className={"main"}>
        <div className={"cartTitleContainer"}>
          <span className={"largeFont"}>
            Checkout - Review
          </span>
        </div>
        {cart.length === 0 ? (
          <div className={"container"}>
            <section {...containerProps}>{indicatorEl}</section>
          </div>
        ) : (
          <div>
            <CartDetailsTable cart={cart} />
            {cart.length === 0 ? null : (
              <div className={"cartConfirmButton"}>
                <Button
                  className="bigButton"
                  disabled={false}
                  color="primary"
                  variant="outlined"
                  onClick={() => {
                    router.push("/checkout");
                  }}
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
