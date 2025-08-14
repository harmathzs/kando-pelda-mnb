import "bootstrap/dist/css/bootstrap.min.css";

import { useState } from "react";

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Stack from 'react-bootstrap/Stack';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import Home from "./Home";
import Mnb from "./Mnb";

import './App2.css';

function App() {
  const [showHome, setShowHome] = useState(true);
  const [showMnb, setShowMnb] = useState(false);

  const handleHomeNavClick = e => {
    console.log('handleHomeNavClick e', e);
    setShowMnb(false);
    setShowHome(true);
  }
  const handleMnbNavClick = e => {
    console.log('handleMnbNavClick e', e);
    setShowHome(false);
    setShowMnb(true);
  }  

  return <div>
    <Navbar bg="dark" variant="dark" fixed="top">
      <Container>
        <Navbar.Brand href="#home" onClick={handleHomeNavClick}>React-Bootstrap</Navbar.Brand>
        <Navbar.Collapse>
          <Nav>
            <Nav.Link href="#home" onClick={handleHomeNavClick}>Home</Nav.Link>
            <Nav.Link href="#mnb" onClick={handleMnbNavClick}>MNB</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>    
    <Container id="content-container" style={{marginTop: '56px'}}>
      {showHome && <Home />}
      {showMnb && <Mnb />}
    </Container>
  </div>
}

export default App;