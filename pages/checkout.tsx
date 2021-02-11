import Head from "next/head";
import React, { useContext, useRef, useState } from "react";
import styles from "../styles/Home.module.css";
import { NavBar } from "../components/NavBar";
import classNames from "classnames";
import { CartContext } from "../context/CartContext";
import { CheckoutButton } from "../components/CheckoutButton";
import { Rings, useLoading } from "@agney/react-loading";
import { ConfirmButton } from "../components/ConfirmButton";
import useCoinbaseCommerceAPI, {
  CoinbaseCommerceAPI,
} from "../hooks/useCoinbaseCommerceAPI";
import { AddressFormFields } from "../components/AddressFormFields";
import { Form } from "react-bootstrap";
import { isNullOrEmpty } from "../utils/StringUtils";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ReviewPageProps {}

export default function Review(props: ReviewPageProps) {
  const { cart, clearCart } = useContext(CartContext);
  const [chargeId, setChargeId] = useState("");
  const coinbase: CoinbaseCommerceAPI = useCoinbaseCommerceAPI();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [address2, setAddress2] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [zip, setZip] = useState<string>("");

  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    indicator: <Rings width="100" />,
  });

  const onSubmit = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    const addressJson = JSON.stringify({
      name: name,
      email: email,
      address: address,
      address2: address2,
      city: city,
      state: state,
      zip: zip,
    });
    setLoading(true);
    coinbase
      .createCharge({
        items: cart,
        mailingAddress: addressJson,
      })
      .then((chargeId: string) => {
        setLoading(false);
        setChargeId(chargeId);
      })
      .catch((error: any) => {
        setLoading(false);
      });
    return false;
  };

  const hasValidAddress = () => {
    const vals = [name, email, address, city, state, zip];
    return vals.filter((value) => isNullOrEmpty(value)).length === 0;
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Print.Fi</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar subPage="cart" />
      <main className={styles.main}>
        <div className={styles.cartTitleContainer}>
          <span className={classNames(styles.largeFont)}>
            Checkout - Payment Details
          </span>
        </div>
        {cart.length === 0 ? (
          <div className={styles.container}>
            <section {...containerProps}>{indicatorEl}</section>
          </div>
        ) : (
          <div>
            <Form onSubmit={onSubmit}>
              <AddressFormFields
                setName={setName}
                setEmail={setEmail}
                setAddress={setAddress}
                setAddress2={setAddress2}
                setCity={setCity}
                setState={setState}
                setZip={setZip}
                loading={loading}
              />
              <div className={styles.cartConfirmButton}>
                {isNullOrEmpty(chargeId) ? (
                  <ConfirmButton
                    title="Submit"
                    loading={loading}
                    onClick={null}
                    disabled={!hasValidAddress()}
                    type="submit"
                  />
                ) : (
                  <CheckoutButton
                    chargeId={chargeId}
                    metadata={JSON.stringify({
                      cart: cart,
                      address: address,
                    })}
                    onChargeSuccess={() => {
                      clearCart();
                      router.push("/success");
                    }}
                    onChargeFailure={() => {
                      toast.error("Payment failed. Please try again.", {
                        type: "error",
                      });
                    }}
                  />
                )}
              </div>
            </Form>
          </div>
        )}
        <ToastContainer />
      </main>
    </div>
  );
}
