import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Col, Container, Row } from 'react-bootstrap';
import LoadingSpinner from '../components/LoadingSpinner';
import { Profiles } from '../../api/profile/Profiles';
import ProfileCardAdmin from '../components/ProfileCardAdmin';

/* Renders a table containing all of the Profile documents */
const ListProfilesAdmin = () => {
  const { ready, profiles } = useTracker(() => {
    // Get access to Profile documents.
    const subscription = Meteor.subscribe(Profiles.adminPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Profile documents
    const profileItems = Profiles.collection.find({}).fetch();
    return {
      profiles: profileItems,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container id="admin-profiles" className="py-3">
      <Row className="justify-content-center">
        <Col>
          <Col className="text-center">
            <h2>Explore Profiles</h2>
          </Col>
          <Row xs={1} md={2} lg={3} className="g-4">
            {profiles.map((profile) => (<Col className="admin-profile-card" key={profile._id}><ProfileCardAdmin profile={profile} /></Col>))}
          </Row>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ListProfilesAdmin;
