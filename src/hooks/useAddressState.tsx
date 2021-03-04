import { useState } from "react";

export interface AddressStateConfig {
  firstName: string;
  setFirstName: (val: string) => void;
  lastName: string;
  setLastName: (val: string) => void;
  email: string;
  setEmail: (val: string) => void;
  address: string;
  setAddress: (val: string) => void;
  address2: string;
  setAddress2: (val: string) => void;
  city: string;
  setCity: (val: string) => void;
  state: string;
  setCountry: (val: string) => void;
  country: string;
  setState: (val: string) => void;
  zip: string;
  setZip: (val: string) => void;
}

export default function useAddressState(): AddressStateConfig {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [address2, setAddress2] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [zip, setZip] = useState<string>("");

  return {
    firstName: firstName,
    setFirstName: setFirstName,
    lastName: lastName,
    setLastName: setLastName,
    email: email,
    setEmail: setEmail,
    address: address,
    setAddress: setAddress,
    address2: address2,
    setAddress2: setAddress2,
    city: city,
    setCity: setCity,
    state: state,
    setState: setState,
    country: country, 
    setCountry: setCountry,
    zip: zip,
    setZip: setZip,
  };
}
