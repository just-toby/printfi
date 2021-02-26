import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header/Header";
import { CartContext } from "../context/CartContext";
import { CheckoutButton } from "../components/CheckoutButton";
import { Rings, useLoading } from "@agney/react-loading";
import useCoinbaseCommerceAPI, {
  CoinbaseCommerceAPI,
} from "../hooks/useCoinbaseCommerceAPI";
import { AddressFormFields } from "../components/AddressFormFields";
import { Form } from "react-bootstrap";
import { isNullOrEmpty } from "../utils/StringUtils";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import useAddressState, { AddressStateConfig } from "../hooks/useAddressState";
import { Button } from "@material-ui/core";
import {getCountries} from 'country-state-picker'
import { getCountryFromAlpha3 } from 'iso-country-utils';

interface CheckoutPageProps {}

export default function Checkout(props: CheckoutPageProps) {
  const { cart, clearCart } = useContext(CartContext);
  const [chargeId, setChargeId] = useState("");
  const coinbase: CoinbaseCommerceAPI = useCoinbaseCommerceAPI();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [googleAddress, setGoogleAddress] = useState(null);

  const address: AddressStateConfig = useAddressState();

  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    indicator: <Rings width="100" />,
  });

  useEffect(() => {
    if(googleAddress !== null)
    {
      if(Object.keys(googleAddress).length === 0)
      {
        address.setAddress("");
        address.setCity("");
        address.setCountry("");
        address.setState("");
      }
      else 
      {
        if(googleAddress.value.terms[0] && googleAddress.value.terms[1])
          address.setAddress(googleAddress.value.terms[0].value + " " + googleAddress.value.terms[1].value)
        if(googleAddress.value.terms[2])
          address.setCity(googleAddress.value.terms[2].value)
        if(googleAddress.value.terms[3])
          address.setState(googleAddress.value.terms[3].value)
        if(googleAddress.value.terms[4])
        {
          let country = getCountryFromAlpha3(googleAddress.value.terms[4].value);
          address.setCountry(country.name);
        }
      }
    }

  }, [googleAddress])

  const onSubmit = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    const addressJson = {
      name: address.firstName + address.lastName,
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
      address.firstName,
      address.lastName,
      address.email,
      address.address,
      address.city,
      address.state,
      address.zip,
    ];
    if(!address.email.includes("@") || !address.email.includes(".")) return false;
    return vals.filter((value) => isNullOrEmpty(value)).length === 0;
  };

  return (
    <div className="container">
      <Header subPage="cart" />
      <main className="main">

        <div className="cartTitleContainer">
          <span className="largeFont">
            Contact Information
          </span>
        </div>

        <div className="subInputBox">
            <Form.Control
              style={{height: "37px"}}
              type="Name"
              placeholder="Email"
              required={true}
              onChange={e => address.setEmail(e.target.value)}
              disabled={loading}
            />
          </div>

        <div className="cartTitleContainer">
          <span className="largeFont">
            Shipping Information
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
                setFirstname={address.setFirstName}
                setEmail={address.setEmail}
                setAddress={address.setAddress}
                setAddress2={address.setAddress2}
                setCity={address.setCity}
                setState={address.setState}

                setGoogleAddress={setGoogleAddress}
                googleAddress={googleAddress}
                setZip={address.setZip}
                loading={loading}
                address={address}
              />
              <div className={"cartConfirmButton"}>
                {isNullOrEmpty(chargeId) ? (
                  <Button
                    color="primary"
                    variant="outlined"
                    onClick={null}
                    disabled={!hasValidAddress()}
                    type="submit"
                    className="bigButton"
                  >
                    Submit
                  </Button>
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
