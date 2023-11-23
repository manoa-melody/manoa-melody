import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image, ListGroup } from 'react-bootstrap';

/** Renders ProfileCard Card * */
const ProfileCard = ({ profile }) => (
  <Card className="h-100">
    <Card.Header className="text-center">
      <Image src={profile.image} width={200} />
      <Card.Title className="mt-2">{profile.displayName}</Card.Title>
      <Card.Subtitle>
        <ListGroup horizontal className="justify-content-center">
          {profile.genres.map((genre) => (<ListGroup.Item key={genre}>{genre}</ListGroup.Item>))}
        </ListGroup>
        <ListGroup horizontal className="justify-content-center">
          {profile.instruments.map((instrument) => (<ListGroup.Item key={instrument}>{instrument}</ListGroup.Item>))}
        </ListGroup>
      </Card.Subtitle>
    </Card.Header>
    <Card.Body>
      <Card.Text>{profile.bio}</Card.Text>
    </Card.Body>
  </Card>
);

// Require a document to be passed to this component.
ProfileCard.propTypes = {
  profile: PropTypes.shape({
    image: PropTypes.string,
    displayName: PropTypes.string,
    bio: PropTypes.string,
    owner: PropTypes.string,
    genres: PropTypes.arrayOf(PropTypes.oneOf(['Rock', 'Pop Music', 'Hip Hop', 'Electronic', 'Jazz', 'Country', 'Alternative', 'Indie', 'Punk Rock', 'Kpop', 'N/A'])),
    instruments: PropTypes.arrayOf(PropTypes.oneOf(['Guitar', 'Piano', 'Violin', 'Flute', 'Saxophone', 'Clarinet', 'Trumpet', 'Cello', 'Bass Guitar', 'Drums', 'N/A'])),
  }).isRequired,
};

export default ProfileCard;
