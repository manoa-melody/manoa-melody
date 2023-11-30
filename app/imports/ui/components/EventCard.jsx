import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image, ListGroup } from 'react-bootstrap';

/** Renders EventCard Card * */
const EventCard = ({ event }) => (
  <Card className="h-100">
    <Card.Header className="text-center">
      <Image src={event.image} width={200} />
      <Card.Title className="mt-2">{event.name}</Card.Title>
      <Card.Subtitle>
        {event.location}
        <br />
        {event.dateTime.toDateString('en-US')} at {event.dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' })}
        <ListGroup horizontal className="justify-content-center align-content-center pb-1">
          {event.genres.map((genre) => (<ListGroup.Item key={genre}>{genre}</ListGroup.Item>))}
        </ListGroup>
        <ListGroup horizontal className="justify-content-center align-content-center">
          {event.instruments.map((instrument) => (<ListGroup.Item key={instrument}>{instrument}</ListGroup.Item>))}
        </ListGroup>
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
    dateTime: PropTypes.instanceOf(Date),
    image: PropTypes.string,
    owner: PropTypes.string,
    genres: PropTypes.arrayOf(PropTypes.oneOf(['Rock', 'Pop Music', 'Hip Hop', 'Electronic', 'Jazz', 'Country', 'Alternative', 'Indie', 'Punk Rock', 'Kpop', 'N/A'])),
    instruments: PropTypes.arrayOf(PropTypes.oneOf(['Guitar', 'Piano', 'Violin', 'Flute', 'Saxophone', 'Clarinet', 'Trumpet', 'Cello', 'Bass Guitar', 'Drums', 'N/A'])),
  }).isRequired,
};

export default EventCard;
