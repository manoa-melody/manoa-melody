import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image, ListGroup, Button } from 'react-bootstrap';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';

/** Renders EventCardAdmin Card * */
const EventCardAdmin = ({ event }) => {
  const handleDelete = () => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this event!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          Meteor.call('event.delete', event._id, (error) => {
            if (error) {
              swal('Error', error.message, 'error');
            } else {
              swal('Event deleted!', {
                icon: 'success',
              });
              // Here, you might want to implement additional logic
              // like redirecting the user or updating the parent component's state
            }
          });
        }
      });
  };

  return (
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
        <footer className="blockquote-footer">{event.owner}</footer>
        <Button variant="danger" onClick={handleDelete}>Delete Event</Button>
      </Card.Body>
    </Card>
  );
};

// Require a document to be passed to this component.
EventCardAdmin.propTypes = {
  event: PropTypes.shape({
    _id: PropTypes.string,
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

export default EventCardAdmin;
