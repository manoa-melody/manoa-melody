import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const Profile = ({ profile }) => (
  <Card>
    <Card.Header>
      {/* eslint-disable-next-line react/jsx-no-undef */}
      <Image src={profile.image} width={75} />
      <Card.Title>{profile.firstName} {profile.lastName}</Card.Title>
      <Card.Subtitle>{profile.email}</Card.Subtitle>
    </Card.Header>
    <Card.Body>
      <Card.Text>{profile.description}</Card.Text>
      <Link to={`/edit/${profile._id}`}>Edit</Link>
    </Card.Body>
  </Card>
);

// Require a document to be passed to this component.
Profile.propTypes = {
  profile: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default Profile;
