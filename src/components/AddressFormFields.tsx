import React, { FC, RefObject } from "react";
import { Form, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

interface AddressFormFieldsProps {
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setAddress: (address: string) => void;
  setAddress2: (address2: string) => void;
  setCity: (city: string) => void;
  setState: (state: string) => void;
  setZip: (zip: string) => void;
  loading: boolean;
}

const AddressFormFields: FC<AddressFormFieldsProps> = (
  props: AddressFormFieldsProps
) => {
  return (
    <div>
      <Form.Row>
        <Form.Group as={Col} controlId="formGridName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="Name"
            placeholder="Name"
            required={true}
            onChange={(event: any) => {
              props.setName(event.target.value);
            }}
            disabled={props.loading}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            required={true}
            onChange={(event: any) => {
              props.setEmail(event.target.value);
            }}
            disabled={props.loading}
          />
        </Form.Group>
      </Form.Row>

      <Form.Group controlId="formGridAddress1">
        <Form.Label>Address</Form.Label>
        <Form.Control
          placeholder="1234 Main St"
          required={true}
          onChange={(event: any) => {
            props.setAddress(event.target.value);
          }}
          disabled={props.loading}
        />
      </Form.Group>

      <Form.Group controlId="formGridAddress2">
        <Form.Label>Address 2</Form.Label>
        <Form.Control
          placeholder="Apartment, studio, or floor"
          required={false}
          onChange={(event: any) => {
            props.setAddress2(event.target.value);
          }}
          disabled={props.loading}
        />
      </Form.Group>

      <Form.Row>
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>City</Form.Label>
          <Form.Control
            required={true}
            onChange={(event: any) => {
              props.setCity(event.target.value);
            }}
            disabled={props.loading}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>State</Form.Label>
          <Form.Control
            as="select"
            defaultValue="Choose..."
            required={true}
            onChange={(event: any) => {
              props.setState(event.target.value);
            }}
            disabled={props.loading}
          >
            <option>Choose...</option>
            <option value="AL">Alabama</option>
            <option value="AK">Alaska</option>
            <option value="AZ">Arizona</option>
            <option value="AR">Arkansas</option>
            <option value="CA">California</option>
            <option value="CO">Colorado</option>
            <option value="CT">Connecticut</option>
            <option value="DE">Delaware</option>
            <option value="DC">District Of Columbia</option>
            <option value="FL">Florida</option>
            <option value="GA">Georgia</option>
            <option value="HI">Hawaii</option>
            <option value="ID">Idaho</option>
            <option value="IL">Illinois</option>
            <option value="IN">Indiana</option>
            <option value="IA">Iowa</option>
            <option value="KS">Kansas</option>
            <option value="KY">Kentucky</option>
            <option value="LA">Louisiana</option>
            <option value="ME">Maine</option>
            <option value="MD">Maryland</option>
            <option value="MA">Massachusetts</option>
            <option value="MI">Michigan</option>
            <option value="MN">Minnesota</option>
            <option value="MS">Mississippi</option>
            <option value="MO">Missouri</option>
            <option value="MT">Montana</option>
            <option value="NE">Nebraska</option>
            <option value="NV">Nevada</option>
            <option value="NH">New Hampshire</option>
            <option value="NJ">New Jersey</option>
            <option value="NM">New Mexico</option>
            <option value="NY">New York</option>
            <option value="NC">North Carolina</option>
            <option value="ND">North Dakota</option>
            <option value="OH">Ohio</option>
            <option value="OK">Oklahoma</option>
            <option value="OR">Oregon</option>
            <option value="PA">Pennsylvania</option>
            <option value="RI">Rhode Island</option>
            <option value="SC">South Carolina</option>
            <option value="SD">South Dakota</option>
            <option value="TN">Tennessee</option>
            <option value="TX">Texas</option>
            <option value="UT">Utah</option>
            <option value="VT">Vermont</option>
            <option value="VA">Virginia</option>
            <option value="WA">Washington</option>
            <option value="WV">West Virginia</option>
            <option value="WI">Wisconsin</option>
            <option value="WY">Wyoming</option>
          </Form.Control>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>Zip</Form.Label>
          <Form.Control
            required={true}
            onChange={(event: any) => {
              props.setZip(event.target.value);
            }}
            disabled={props.loading}
          />
        </Form.Group>
      </Form.Row>
    </div>
  );
};

export { AddressFormFields };
