import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import EventCard from '../components/EventCard';
import { Events } from '../../api/event/Event';

/* Renders a table containing all of the Event Documents */
const ListEvents = () => {
  const { ready, events } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Profile documents.
    const subscription = Meteor.subscribe(Events.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Event documents
    const eventItems = Events.collection.find({}).fetch();
    return {
      events: eventItems,
      ready: rdy,
    };
  }, []);

  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col>
          <Col className="text-center">
            <h2>Explore Events</h2>
          </Col>
          <Row xs={1} md={2} lg={3} className="g-4">
            {events.map((event) => (<Col key={event._id}><EventCard event={event} /></Col>))}
          </Row>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ListEvents;
