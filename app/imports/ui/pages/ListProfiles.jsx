import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import Profile from '../components/Profile';
import { Profiles } from '../../api/profile/Profiles';

/* Shows all user profiles */
const ListProfiles = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, profiles } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Profiles.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const profileItems = Profiles.collection.find({}).fetch();
    return {
      profiles: profileItems,
      ready: rdy,
    };
  }, []);

  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col>
          <Col className="text-center">
            <h2>List Profiles</h2>
          </Col>
          <Col>
            <Row xs={1} md={2} lg={3} className="g-4">
              {profiles.map((profile) => (<Col key={profile._id}><Profile profile={profile} /></Col>))}
            </Row>
          </Col>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ListProfiles;

/*
const ListContacts = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, contacts } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Contacts documents.
    const subscription = Meteor.subscribe(Contacts.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Contact documents
    const contactItems = Contacts.collection.find({}).fetch();
    return {
      contacts: contactItems,
      ready: rdy,
    };
  }, []);

  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col>
          <Col className="text-center">
            <h2>List Contacts</h2>
          </Col>
          <Col>
            <Row xs={1} md={2} lg={3} className="g-4">
              {contacts.map((contact) => (<Col key={contact._id}><Contact contact={contact} /></Col>))}
            </Row>
          </Col>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ListContacts;

 */
