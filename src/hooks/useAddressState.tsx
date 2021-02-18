import { useState } from "react";

export interface AddressStateConfig {
  name: string;
  setName: (val: string) => void;
  email: string;
  setEmail: (val: string) => void;
  address: string;
  setAddress: (val: string) => void;
  address2: string;
  setAddress2: (val: string) => void;
  city: string;
  setCity: (val: string) => void;
  state: string;
  setState: (val: string) => void;
  zip: string;
  setZip: (val: string) => void;
}

export default function useAddressState(): AddressStateConfig {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [address2, setAddress2] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [zip, setZip] = useState<string>("");

  return {
    name: name,
    setName: setName,
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
    zip: zip,
    setZip: setZip,
  };
}
