import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {useFirebase} from '../context/Firebase';
import {NavLink} from "react-router-dom";

const NavbarComponent=()=>{
  const firebase=useFirebase();
  const handleLogout=()=>{
    firebase.logout();
  }

  return (
     <Navbar bg="dark" data-bs-theme="dark" expand="lg" className='mb-5 shadow-sm'>
        <Container>
          <Navbar.Brand as={NavLink} to="/" className='fw-bold text-primary'>BOOKIFY</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className='ms-auto gap-3'>
               <Nav.Link as={NavLink} to="/">Home</Nav.Link>
               <Nav.Link as={NavLink} to="/book/list">Add Listing</Nav.Link>
               <Nav.Link as={NavLink} to="/book/orders">Orders</Nav.Link>
               <Nav.Link onClick={handleLogout}>Logout</Nav.Link>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
     
  )
}
export default NavbarComponent;