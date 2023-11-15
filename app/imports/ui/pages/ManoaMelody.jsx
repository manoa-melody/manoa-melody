import React from 'react';
import { Container } from 'react-bootstrap';
import About from '../components/About';

/* A home landing page for new users. */
const ManoaMelody = () => (
  <Container fluid className="py-3">
    <About />
  </Container>
);

export default ManoaMelody;
