import React from 'react';
import { Container, Col, Row, Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom';
import classes from '../css/NavBar.module.css';

function NavBar() {
  return (
    <Row>
      <Col>
        <Navbar expand="sm" className={classes.NavbarDesign}>
          <Container>
            <Navbar.Brand>
              <h1 className={classes.logo}>UserDashBoard</h1>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="my-nav" />
            <Navbar.Collapse id="my-nav">
              <Nav className="ms-auto">
                <NavLink className={classes.link} to="/">Home</NavLink>
                <NavLink className={classes.link} to="/about">About</NavLink>
                <NavLink className={classes.link} to="/contact">Contact</NavLink>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Col>
    </Row>
  );
}

export default NavBar;
