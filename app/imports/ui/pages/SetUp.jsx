import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Alert, Card, Col, Container, Row } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, SubmitField, TextField, SelectField, LongTextField, AutoField } from 'uniforms-bootstrap5';
import { Profiles } from '../../api/profile/Profiles';

const schema = new SimpleSchema({
  image: String,
  displayName: String,
  bio: String,
  genres: {
    type: Array,
    custom() {
      const { value } = this;
      if (!value || value.length === 0) {
        return 'At least one genre is required';
      }
      return undefined;
    },
  },
  'genres.$': {
    type: String,
    allowedValues: ['Rock', 'Pop Music', 'Hip Hop', 'Electronic', 'Jazz', 'Country', 'Alternative', 'Indie', 'Punk Rock', 'Kpop', 'N/A'],
  },

  instruments: {
    type: Array,
    custom() {
      const { value } = this;
      if (!value || value.length === 0) {
        return 'At least one instrument is required';
      }
      return undefined;
    },
  },
  'instruments.$': {
    type: String,
    allowedValues: ['Guitar', 'Piano', 'Violin', 'Flute', 'Saxophone', 'Clarinet', 'Trumpet', 'Cello', 'Bass Guitar', 'Drums', 'N/A'],
  },
});

const bridge = new SimpleSchema2Bridge(schema);

/**
 * SetUp component is to set up the users profile
 */
const SetUp = ({ location }) => {
  const [error, setError] = useState('');
  const [redirectToReferer, setRedirectToRef] = useState(false);

  /* Handle SignUp submission. Create user account and a profile entry, then redirect to the home page. */
  const submit = (doc) => {
    const { image, displayName, bio, genres, instruments } = doc;
    const owner = Meteor.user().username;
    Profiles.collection.insert(
      { image, displayName, bio, genres, instruments, owner },
      (err) => {
        if (err) {
          setError(err.reason);
        } else {
          setError('');
          setRedirectToRef(true);
        }
      },
    );
  };

  /* Display the signup form. Redirect to add page after successful registration and login. */
  const { from } = location?.state || { from: { pathname: '/my-profile' } };
  // if correct authentication, redirect to from: page instead of signup screen
  if (redirectToReferer) {
    return <Navigate to={from} />;
  }
  return (
    <Container id="signup-page" className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center">
            <h2>Set Up</h2>
          </Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)}>
            <Card>
              <Card.Body>
                <Row className="justify-content-center">
                  <Col>
                    <TextField name="displayName" placeholder="username" />
                  </Col>
                  <Col>
                    <TextField name="image" placeholder="image url" />
                  </Col>
                </Row>
                <Row className="justify-content-center">
                  <Col>
                    <SelectField name="genres" checkboxes />
                  </Col>
                  <Col>
                    <AutoField name="instruments" checkboxes />
                  </Col>
                </Row>
                <LongTextField name="bio" />
                <ErrorsField />
                <SubmitField />
                {error === '' ? (
                  ''
                ) : (
                  <Alert variant="danger">
                    <Alert.Heading>Set Up was not successful</Alert.Heading>
                    {error}
                  </Alert>
                )}
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

/* Ensure that the React Router location object is available in case we need to redirect. */
SetUp.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.string,
  }),
};

SetUp.defaultProps = {
  location: { state: '' },
};

export default SetUp;
