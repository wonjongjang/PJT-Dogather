import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Btn = styled.button`
  background-color: black;
  color: white;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const H1 = styled.h1`
  font-size: 100px;
`;

function Home() {
  return (
    <div>
      <div>
        <H1>Home</H1>
        <H1>Home</H1>
        <H1>Home</H1>
        <H1>Home</H1>
        <H1>Home</H1>
        <H1>Home</H1>
        <H1>Home</H1>
        <H1>Home</H1>
        <H1>Home</H1>
        <H1>Home</H1>
        <H1>Home</H1>
        <H1>Home</H1>
        <H1>Home</H1>
        <H1>Home</H1>
      </div>
    </div>
  );
}

export default Home;
