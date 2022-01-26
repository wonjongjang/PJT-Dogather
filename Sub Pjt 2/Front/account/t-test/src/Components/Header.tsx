import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  width: 100%;
  top: 0;
  background-color: gray;
  height: 80px;
  font-size: 14px;
`;
const Col = styled.div`
  display: flex;
  align-items: center;
`;
const Logo = styled.svg`
  margin-right: 50px;
`;
const Items = styled.ul`
  display: flex;
  align-items: center;
`;
const Item = styled.li`
  margin-right: 20px;
`;
const Search = styled.span`
  color: white;
  svg {
    height: 25px;
  }
`;

function Header() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <Nav>
      <Col>
        <Logo />
        <Items>
          <Item>
            <Link to="/">Home</Link>
          </Item>
          <Item>
            <Link to="/login">Login</Link>
          </Item>
          <Item>
            <Link to="/signup">Signup</Link>
          </Item>
        </Items>
      </Col>
      <Col>
        <Search>
          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </svg>
        </Search>
      </Col>
    </Nav>
  );
}

export default Header;
