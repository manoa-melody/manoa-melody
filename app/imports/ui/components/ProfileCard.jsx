import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image } from 'react-bootstrap';

/** Renders ProfileCard Card * */
const ProfileCard = ({ profile }) => (
  <Card className="h-100">
    <Card.Header className="text-center">
      <Image src={profile.image} width={200} />
      <Card.Title className="mt-2">{profile.displayName}</Card.Title>
      <Card.Subtitle>Insert interests here :P</Card.Subtitle>
    </Card.Header>
    <Card.Body>
      <Card.Text>{profile.bio}</Card.Text>
    </Card.Body>
  </Card>
);

// Require a document to be passed to this component.
ProfileCard.propTypes = {
  profile: PropTypes.shape({
    displayName: PropTypes.string,
    image: PropTypes.string,
    bio: PropTypes.string,
    genres: PropTypes.arrayOf(PropTypes.oneOf(['Rock', 'Pop Music', 'Hip Hop', 'Electronic', 'Jazz', 'Country', 'Alternative', 'Indie', 'Punk Rock', 'Kpop'])),
    instruments: PropTypes.arrayOf(PropTypes.oneOf(['Guitar', 'Piano', 'Violin', 'Flute', 'Saxophone', 'Clarinet', 'Trumpet', 'Cello', 'Bass Guitar', 'Drums'])),
  }).isRequired,
};

export default ProfileCard;
