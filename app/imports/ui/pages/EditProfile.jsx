import React from 'react';
import swal from 'sweetalert';
// import { Navigate } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Card, Col, Container, Row } from 'react-bootstrap';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, SubmitField, TextField, SelectField, LongTextField, AutoField } from 'uniforms-bootstrap5';
import { useParams } from 'react-router';
import { Profiles } from '../../api/profile/Profiles';
import { useTracker } from '../../../.meteor/local/build/programs/server/assets/packages/react-meteor-data/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';

const bridge = new SimpleSchema2Bridge(Profiles.schema);

/**
 * EditProfile component is to edit the users profile
 */

/* Subscribe to the Profiles collection * */
const EditProfile = () => {
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

  /* Handle SignUp submission. Create user account and a profile entry, then redirect to the home page. */
  const submit = (data) => {
    const { image, displayName, bio, genres, instruments, owner } = data;
    Profiles.collection.update(_id, { $set: { image, displayName, bio, genres, instruments, owner } }, (error) => (error ?
      swal('Error', error.nessage, 'error') :
      swal('Success', 'Item updated successfully', 'success')));
  };

  /* Display the EditProfile form. Redirect to MyProfile after submit */
  return ready ? (
    <Container id="editprofile-page" className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center">
            <h2>Set Up</h2>
          </Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
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
                {/*
                {error === '' ? (
                  ''
                ) : (
                  <Alert variant="danger">
                    <Alert.Heading>Edit was not successful</Alert.Heading>
                    {error}
                  </Alert>
                )}
              */}
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default EditProfile;
