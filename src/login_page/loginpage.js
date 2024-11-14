import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/accountSlice";
import { Title, Heading, Wrapper, Input, TextArea, Section, Button } from '../styled_components';

const LoginPage = props => {
  const dispatch = useDispatch();

  const [contact, setContact] = useState({
    name: '',
    email: '',
    password: ''
  });

  function userLoginHandler() {
    dispatch(login({
      name: contact.name,
      email: contact.email,
      password: contact.password
    }));
    console.log("Clicked");
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setContact((previnfo) => {
      return {
        ...previnfo,
        [name]: value
      };
    });
  }


  return (
    <Section >
      <Wrapper>
        <Title>
          Welcome, {contact.name}
        </Title>
        <Heading>
          Please login below
        </Heading>
      </Wrapper>
      <Input
        name="name"
        type="text"
        placeholder="Enter Name"
        onChange={(event) => setContact((prev) => {
          return {
            ...prev,
            [event.target.name]: event.target.value
          };
        })
        }
        value={contact.name}
        autoComplete="off"
      />
      <Input
        name="email"
        type="text"
        placeholder="Enter Email"
        onChange={handleChange}
        value={contact.email}
        autoComplete="off"
      />
      <Input
        name="password"
        placeholder="Password"
        type="password"
        onChange={handleChange}
        value={contact.password}
        autoComplete="off"
      />
      <Button
        onClick={userLoginHandler}
      > Login
      </Button>
    </Section>
  );
}

export default LoginPage;