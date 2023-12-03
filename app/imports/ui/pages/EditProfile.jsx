import React, { useState } from 'react';
import swal from 'sweetalert';
// import { Navigate } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Card, Col, Container, Row } from 'react-bootstrap';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, SubmitField, TextField, SelectField, LongTextField, AutoField, HiddenField } from 'uniforms-bootstrap5';
import { useParams } from 'react-router';
import { useTracker } from 'meteor/react-meteor-data';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Profiles } from '../../api/profile/Profiles';
import LoadingSpinner from '../components/LoadingSpinner';

const bridge = new SimpleSchema2Bridge(Profiles.schema);

/**
 * EditProfile component is to edit the users profile
 */

/* Subscribe to the Profiles collection * */
const EditProfile = ({ location }) => {
  const { _id } = useParams();
  const { doc, ready } = useTracker(() => {
    const subscription = Meteor.subscribe(Profiles.userPublicationName);
    const rdy = subscription.ready();
    const document = Profiles.collection.findOne(_id);
    return {
      doc: document,
      ready: rdy,
    };
  }, [_id]);
  const [redirectToReferer, setRedirectToRef] = useState(false);

  /* Handle SignUp submission. Create user account and a profile entry, then redirect to the home page. */
  const submit = (data) => {
    const { image, displayName, bio, genres, instruments } = data;
    Profiles.collection.update(_id, { $set: { image, displayName, bio, genres, instruments } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      setRedirectToRef(true)));
  };

  /* Display the signup form. Redirect to add page after successful registration and login. */
  const { from } = location?.state || { from: { pathname: '/my-profile' } };
  // if correct authentication, redirect to from: page instead of signup screen
  if (redirectToReferer) {
    return <Navigate to={from} />;
  }
  /* Display the EditProfile form. Redirect to MyProfile after submit */
  return ready ? (
    <Container id="edit-profile" className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center">
            <h2>Edit My Profile</h2>
          </Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
            <Card>
              <Card.Body>
                <Row className="justify-content-center">
                  <Col>
                    <TextField id="edit-displayName" name="displayName" placeholder="username" />
                  </Col>
                  <Col>
                    <TextField id="edit-image" name="image" placeholder="image url" />
                  </Col>
                </Row>
                <Row className="justify-content-center">
                  <Col id="edit-genres">
                    <SelectField name="genres" checkboxes />
                  </Col>
                  <Col id="edit-instruments">
                    <AutoField name="instruments" checkboxes />
                  </Col>
                </Row>
                <LongTextField id="edit-bio" name="bio" />
                <ErrorsField />
                <SubmitField id="edit-submit-btn" />
                <HiddenField name="owner" />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

/* Ensure that the React Router location object is available in case we need to redirect. */
EditProfile.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.string,
  }),
};

EditProfile.defaultProps = {
  location: { state: '' },
};

export default EditProfile;
