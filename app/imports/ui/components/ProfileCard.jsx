import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap';

/** Renders ProfileCard Card * */
const ProfileCard = ({ profile }) => {
  const user = Meteor.user();
  const owner = user ? user.username : null;
  return (
    <Card className="h-100">
      <Card.Header className="text-center">
        <Image src={profile.image} width={200} />
        <Card.Title className="mt-2">{profile.displayName}</Card.Title>
        <Card.Subtitle>
          <Row>
            <Col>
              <ListGroup className="justify-content-center align-content-center pb-1">
                {profile.genres.map((genre) => (<ListGroup.Item key={genre}>{genre}</ListGroup.Item>))}
              </ListGroup>
            </Col>
            <Col>
              <ListGroup className="justify-content-center align-content-center">
                {profile.instruments.map((instrument) => (<ListGroup.Item key={instrument}>{instrument}</ListGroup.Item>))}
              </ListGroup>
            </Col>
          </Row>
        </Card.Subtitle>
      </Card.Header>
      <Card.Body>
        <Card.Text>{profile.bio}</Card.Text>
        {profile.owner === owner && <Button href={`/edit-profile/${profile._id}`} variant="outline-success">Edit Profile</Button> }
      </Card.Body>
    </Card>
  );
};

// Require a document to be passed to this component.
ProfileCard.propTypes = {
  profile: PropTypes.shape({
    image: PropTypes.string,
    displayName: PropTypes.string,
    bio: PropTypes.string,
    owner: PropTypes.string,
    _id: PropTypes.string,
    genres: PropTypes.arrayOf(PropTypes.oneOf(['Rock', 'Pop Music', 'Hip Hop', 'Electronic', 'Jazz', 'Country', 'Alternative', 'Indie', 'Punk Rock', 'Kpop', 'N/A'])),
    instruments: PropTypes.arrayOf(PropTypes.oneOf(['Guitar', 'Piano', 'Violin', 'Flute', 'Saxophone', 'Clarinet', 'Trumpet', 'Cello', 'Bass Guitar', 'Drums', 'N/A'])),
  }).isRequired,
};

export default ProfileCard;
