import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image } from 'react-bootstrap';

/** Renders EventCard Card * */
const EventCard = ({ event }) => (
  <Card className="h-100">
    <Card.Header className="text-center">
      <Image src={event.image} width={200} />
      <Card.Title className="mt-2">{event.name}</Card.Title>
      <Card.Subtitle>
        {event.location}
        <br />
        {event.dateTime.toLocaleDateString('en-US')} at {event.dateTime.toLocaleTimeString('en-US')}
      </Card.Subtitle>
    </Card.Header>
    <Card.Body>
      <Card.Text>{event.description}</Card.Text>
    </Card.Body>
  </Card>
);

// Require a document to be passed to this component.
EventCard.propTypes = {
  event: PropTypes.shape({
    name: PropTypes.string,
    location: PropTypes.string,
    description: PropTypes.string,
    dateTime: PropTypes.string,
    image: PropTypes.string,
    owner: PropTypes.string,
  }).isRequired,
};

export default EventCard;


