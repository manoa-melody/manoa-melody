import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Alert, Card, Col, Container, Row } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';

/**
 * Signin page overrides the form’s submit event and call Meteor’s loginWithPassword().
 * Authentication errors modify the component’s state to be displayed
 */
const SignIn = () => {
  const [error, setError] = useState('');
  const [redirect, setRedirect] = useState(false);
  const schema = new SimpleSchema({
    email: String,
    password: String,
  });
  const bridge = new SimpleSchema2Bridge(schema);

  // Handle Signin submission using Meteor's account mechanism.
  const submit = (doc) => {
    const { email, password } = doc;
    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        setError(err.reason);
      } else {
        setRedirect(true);
      }
    });
  };

  // Render the signin form.
  // if correct authentication, redirect to page instead of login screen
  if (redirect) {
    return (<Navigate to="/" />);
  }
  // Otherwise return the Login form.
  return (
    <Container id="signin-page" className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center">
            <h2>Sign In</h2>
          </Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)}>
            <Container className="form-bg">
              <Card>
                <Card.Body>
                  <TextField id="signin-form-email" name="email" placeholder="E-mail address" />
                  <TextField id="signin-form-password" name="password" placeholder="Password" type="password" />
                  <ErrorsField />
                  <SubmitField id="signin-form-submit" />
                  <Alert variant="light" className="click-here">
                    Need an account? <Link to="/signup">SIGN UP</Link>
                  </Alert>
                  {error === '' ? (
                    ''
                  ) : (
                    <Alert variant="danger">
                      <Alert.Heading>Login was not successful</Alert.Heading>
                      {error}
                    </Alert>
                  )}
                </Card.Body>
              </Card>
            </Container>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default SignIn;
