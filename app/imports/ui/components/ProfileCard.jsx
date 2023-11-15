import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image } from 'react-bootstrap';

/** Renders ProfileCard Card * */
const ProfileCard = ({ profile }) => (
  <Card className="h-100">
    <Card.Header>
      <Image src={profile.image} width={75} />
      <Card.Title>{profile.firstName} {profile.lastName}</Card.Title>
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
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    image: PropTypes.string,
    bio: PropTypes.string,
    instruments: PropTypes.arrayOf(PropTypes.oneOf([])),
    genres: PropTypes.arrayOf(PropTypes.oneOf([])),
    _id: PropTypes.string,
  }).isRequired,
};

export default ProfileCard;
