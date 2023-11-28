import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Col, Container, Row } from 'react-bootstrap';
import LoadingSpinner from '../components/LoadingSpinner';
import { Events } from '../../api/event/Event';
import EventCard from '../components/EventCard';

/* Renders a table containing all of the Event documents. Use <EventItemAdmin> to render each row. */
const ListEventsAdmin = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, events } = useTracker(() => {
    // Get access to Event documents.
    const subscription = Meteor.subscribe(Events.adminPublicationName);
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

export default ListEventsAdmin;