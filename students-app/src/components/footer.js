import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
//import  from "react-bootstrap/Container";

class Footer extends Component {
  render() {
    return (
      <Navbar bg="light" expand="lg" fixed="bottom">
        <Navbar.Brand href="#home">Students App</Navbar.Brand>

        <p className="mt-4 mb-4">Copyright @2020 Studens.Inc</p>

        <Nav className="mr-auto ml-4">
          <Nav.Link href="https://www.google.co.cr/">Privacy Policy</Nav.Link>
        </Nav>
      </Navbar>
    );
  }
}

export default Footer;
