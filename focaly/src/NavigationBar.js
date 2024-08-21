import React, { useState } from 'react';
import { Navbar, Nav, Form, FormControl, Button, Container, NavDropdown } from 'react-bootstrap';
import { Person, Cart as CartIcon, PersonCircle } from 'react-bootstrap-icons'; 
import { useNavigate } from 'react-router-dom';
import './navbar.css'; // Assurez-vous que ce fichier CSS existe et est bien importé

const NavigationBar = ({ cartItems }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?name=${searchTerm}`);
  };

  return (
    <Navbar bg="black" variant="dark" expand="lg" className="navbar-custom">
      <Container fluid>
        <Navbar.Brand href="#">
          {/* Ajoutez une image ou un texte pour le logo ici si nécessaire */}
          <span>Logo</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#">Nouveauté</Nav.Link>
            <Nav.Link href="#">Caméras Embarquées</Nav.Link>
            <Nav.Link href="#">Appareils Photos</Nav.Link>
            <Nav.Link href="#">Drones</Nav.Link>
            <Nav.Link href="#">Nous Contacter</Nav.Link>
          </Nav>
          <Form className="d-flex mx-auto" onSubmit={handleSearch}>
            <FormControl
              type="text"
              placeholder="Search"
              className="me-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="outline-light" type="submit">Search</Button>
          </Form>
          <Nav>
            <NavDropdown title={<span><PersonCircle size={20} /> Account</span>} id="account-nav-dropdown">
              <NavDropdown.Item href="/profile">
                <PersonCircle size={20} /> Profile
              </NavDropdown.Item>
              <NavDropdown.Item href="/login">
                <Person size={20} /> Login
              </NavDropdown.Item>
              <NavDropdown.Item href="/register">
                Register
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/cart">
              <CartIcon size={20} /> Panier ({cartItems.length})
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
