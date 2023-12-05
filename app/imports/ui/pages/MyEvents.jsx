import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import EventCard from '../components/EventCard';
import { Events } from '../../api/event/Event';

/* Renders a table containing all of the users events. */
const MyEvents = () => {
  const { ready, events } = useTracker(() => {
    // Gets the username logged into the website
    const user = Meteor.user();
    // Check if the user exists before accessing user().username
    const owner = user ? user.username : null;
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Profile documents.
    const subscription = Meteor.subscribe(Events.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    let eventItems;
    // Get the Event documents
    if (owner) {
      eventItems = Events.collection.find({ owner: owner }).fetch();
    }
    return {
      events: eventItems,
      ready: rdy,
    };
  }, []);

  return (ready ? (
    <Container id="myevents-page" className="py-3">
      <Row className="justify-content-center">
        <Col>
          {events.length === 0 && (
            <Col className="text-center">
              <h2>You Have No Events</h2>
              <h4 className="show-more">Want to add an event? <Link to="/add-event" id="click-here">CLICK HERE</Link></h4>
            </Col>
          )}
          {events.length > 0 && (
            <div>
              <Col className="text-center">
                <h2>My Events</h2>
              </Col>
              <Row xs={1} md={2} lg={3} className="g-4">
                {events.map((event) => (<Col className="myevent-card" key={event._id}><EventCard event={event} /></Col>))}
              </Row>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default MyEvents;
