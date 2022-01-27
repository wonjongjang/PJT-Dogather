import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Card } from '@mui/material';
import BasicCard from '../components/card';

const Btn = styled.button`
  background-color: black;
  color: white;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

function Home() {
  return (
    <div>
    <div>
      <h1>Home</h1>
      <Btn>
        <StyledLink to="/login">Login</StyledLink>
      </Btn>
      <Btn>
        <StyledLink to="/Signup">Signup</StyledLink>
      </Btn>
      </div>
      {/* <BasicCard /> */}
      </div>
  );
}

export default Home;
