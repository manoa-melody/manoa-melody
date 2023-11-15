import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer className="mt-auto py-3 bg-dark">
    <Container>
      <Row>
        <Col xs={6} className="text-center">
          <h1 id="title">Mānoa Melody</h1>
        </Col>
        <Col>
          Contact Us
          <br />
          About Us
          <br />
          Blog
          <br />
        </Col>
        <Col>
          Instagram
          <br />
          Twitter
          <br />
          Facebook
          <br />
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
