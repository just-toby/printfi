import React, { useContext, useState } from "react";
import Header from "../components/Header/Header";
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
import useAddressState, { AddressStateConfig } from "../hooks/useAddressState";

interface CheckoutPageProps {}

export default function Checkout(props: CheckoutPageProps) {
  const { cart, clearCart } = useContext(CartContext);
  const [chargeId, setChargeId] = useState("");
  const coinbase: CoinbaseCommerceAPI = useCoinbaseCommerceAPI();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const address: AddressStateConfig = useAddressState();

  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    indicator: <Rings width="100" />,
  });

  const onSubmit = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    const addressJson = {
      name: address.name,
      email: address.email,
      address: address.address,
      address2: address.address2,
      city: address.city,
      state: address.state,
      zip: address.zip,
    };
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
      .catch(() => {
        setLoading(false);
      });
    return false;
  };

  const hasValidAddress = () => {
    const vals = [
      address.name,
      address.email,
      address.address,
      address.city,
      address.state,
      address.zip,
    ];
    return vals.filter((value) => isNullOrEmpty(value)).length === 0;
  };

  return (
    <div className="container">
      <Header subPage="cart" />
      <main className="main">
        <div className="cartTitleContainer">
          <span className="largeFont">
            Checkout - Payment
          </span>
        </div>
        {cart.length === 0 ? (
          <div className="container">
            <section {...containerProps}>{indicatorEl}</section>
          </div>
        ) : (
          <div>
            <Form onSubmit={onSubmit}>
              <AddressFormFields
                setName={address.setName}
                setEmail={address.setEmail}
                setAddress={address.setAddress}
                setAddress2={address.setAddress2}
                setCity={address.setCity}
                setState={address.setState}
                setZip={address.setZip}
                loading={loading}
              />
              <div className={"cartConfirmButton"}>
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
