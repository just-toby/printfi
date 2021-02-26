import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import Select from 'react-select';
import {getCountries, getStates} from 'country-state-picker'
import { getCountryFromName } from 'iso-country-utils';

const AddressFormFields = (props) => {
  const {googleAddress, setGoogleAddress, address} = props;
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);

  useEffect(() => {
    if(Object.keys(address).length !== 0 && address.country !== "")
    {
      let alpha2 = getCountryFromName(address.country).alpha2.toLowerCase();

      let newStates = getStates(alpha2).map(state => { 
        return {value: state, label: state}
      })
      setStates(newStates);
    }
  }, [address.country])

  useEffect(() => {
    let baseCountries = getCountries();

    let newCountries = baseCountries.map(country => 
    {

      return {value: country.code, label: country.name}
    })


    setCountries(newCountries);
  }, [])

  const handleGoogleAddressChange = (value, action) => {
    if(action.action === "clear")
    {
      setGoogleAddress({})
    }
    else 
    setGoogleAddress(value);
  }

  const addressChange = (key) => {
    if(key !== null && key !== "")
      address.setAddress(key);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>

      <div style={{ display: "flex", flexDirection: "row" }}>

          <div className="halfInputBox1">
            <Form.Control
              type="Name"
              style={{height: "37px"}}
              placeholder="First Name"
              required={true}
              onChange={e => address.setFirstName(e.target.value)}
              disabled={props.loading}
            />
          </div>

          <div className="halfInputBox2">
            <Form.Control
              style={{height: "37px"}}
              type="Name"
              placeholder="Last Name"
              required={true}
              onChange={e => address.setLastName(e.target.value)}
              disabled={props.loading}
            />
          </div>
      </div>

      <GooglePlacesAutocomplete
        apiKey="AIzaSyB587mOW5-3gNFOSPJeGuJhqf0FUj910uM"
        selectProps={{
          onInputChange: (key) => addressChange(key),
          onChange: (value, action) => handleGoogleAddressChange(value, action),
          backspaceRemovesValue: true,
          placeholder: "Address",
          isClearable: true,
          noOptionsMessage: () => null,
          components: { DropdownIndicator:() => null, IndicatorSeparator:() => null },
          value: address.address === "" ? null : {value: address.address, label: address.address},
          className:"inputBox"
        }}
      /> 

      <div className="inputBox">
        <Form.Control
          style={{height: "37px"}}
          type="Name"
          placeholder="Apartment, suite, etc. (optional)"
          onChange={e => address.setAddress2(e.target.value)}
          disabled={props.loading}
        />
      </div>

      <div className="inputBox">
        <Form.Control
          style={{height: "37px"}}
          type="Name"
          placeholder="City"
          required={true}
          onChange={e => address.setCity(e.target.value)}
          disabled={props.loading}
          value={address.city}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Select
          options={countries}
          placeholder={"Country"}
          noOptionsMessage= {() => null}
          value={address.country === "" ? null: {value: address.country, label: address.country}}
          onChange={e => address.setCountry(e.label)}
          className="thirdInputBox"
        />

        <Select
          placeholder={"State"}
          options={states}
          noOptionsMessage= {() => null}
          value={address.state === "" ? null: {value: address.state, label: address.state}}
          onChange={e => address.setState(e.value)}
          className="thirdInputBox"
        />

        <div className="thirdInputBoxEnd">
          <Form.Control
            style={{height: "37px"}}
            type="Name"
            placeholder="Zip Code"
            required={true}
            onChange={e => address.setZip(e.target.value)}
            disabled={props.loading}
            value={address.zip}
          />
        </div>
      </div>
    </div>
  );
};

export { AddressFormFields };
