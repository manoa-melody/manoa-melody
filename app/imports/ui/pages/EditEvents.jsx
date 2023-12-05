import React, { useState } from 'react';
import swal from 'sweetalert';
import { Navigate } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Card, Col, Container, Row } from 'react-bootstrap';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, SubmitField, TextField, SelectField, LongTextField, HiddenField, DateField } from 'uniforms-bootstrap5';
import { useParams } from 'react-router';
import { useTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import LoadingSpinner from '../components/LoadingSpinner';
import { Events } from '../../api/event/Event';

const bridge = new SimpleSchema2Bridge(Events.schema);

/**
 * EditProfile component is to edit the users profile
 */
const EditEvents = ({ location }) => {
  const { _id } = useParams();
  const { doc, ready } = useTracker(() => {
    const subscription = Meteor.subscribe(Events.userPublicationName);
    const rdy = subscription.ready();
    const document = Events.collection.findOne(_id);
    return {
      doc: document,
      ready: rdy,
    };
  }, [_id]);
  const [redirectToReferer, setRedirectToRef] = useState(false);

  /* Handle SignUp submission. Create user account and a profile entry, then redirect to the home page. */
  const submit = (data) => {
    const { name, locations, description, dateTime, image, genres, instruments } = data;
    Events.collection.update(_id, { $set: { name, locations, description, dateTime, image, genres, instruments } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      setRedirectToRef(true)));
  };

  /* Display the signup form. Redirect to add page after successful registration and login. */
  const { from } = location?.state || { from: { pathname: '/my-events' } };
  // if correct authentication, redirect to from: page instead of signup screen
  if (redirectToReferer) {
    return <Navigate to={from} />;
  }
  /* Display the EditProfile form. Redirect to MyProfile after submit */
  return ready ? (
    <Container id="add-event-page" className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Edit Event</h2></Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
            <Card>
              <Card.Body>
                <TextField id="form-name" name="name" placeholder="Event Name" />
                <Row>
                  <Col>
                    <TextField id="form-location" name="location" placeholder="Event Location" />
                  </Col>
                  <Col>
                    <DateField id="form-dateTime" name="dateTime" label="Date and Time" />
                  </Col>
                </Row>
                <LongTextField id="form-description" name="description" placeholder="Event Description" />
                <TextField id="form-image" name="image" placeholder="Image URL" />
                <Row>
                  <Col>
                    <SelectField id="form-genres" name="genres" />
                  </Col>
                  <Col>
                    <SelectField id="form-instruments" name="instruments" />
                  </Col>
                </Row>
                <SubmitField value="Submit" />
                <ErrorsField />
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
EditEvents.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.string,
  }),
};

EditEvents.defaultProps = {
  location: { state: '' },
};

export default EditEvents;
