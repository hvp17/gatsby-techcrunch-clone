import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import github from "../img/github-icon.svg";
import logo from "../img/logo.png";

const StyledContainer = styled.nav`
  display: flex;
  flex-direction: column;
  left: 0;
  margin: 25px;
  position: fixed;
  z-index: 2;
`;

const NavigationContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const NavigationItem = styled(Link)`
  padding: 0.2em 0;
  color: #777;
  font-size: 1.525rem;
  line-height: 1.3;
  font-weight: 200;
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 100px;
`;

const Navbar = class extends React.Component {
  render() {
    return (
      <StyledContainer className="container">
        <LogoContainer>
          <Link to="/" className="navbar-item" title="Logo">
            <img src={logo} alt="Kaldi" style={{ width: "88px" }} />
          </Link>
        </LogoContainer>
        <NavigationContainer className="navbar-start has-text-centered">
          <NavigationItem className="navbar-item" to="/about">
            About
          </NavigationItem>
          <NavigationItem className="navbar-item" to="/products">
            Products
          </NavigationItem>
          <NavigationItem className="navbar-item" to="/contact">
            Contact
          </NavigationItem>
          <NavigationItem className="navbar-item" to="/contact/examples">
            Form Examples
          </NavigationItem>
        </NavigationContainer>
      </StyledContainer>
    );
  }
};

export default Navbar;
