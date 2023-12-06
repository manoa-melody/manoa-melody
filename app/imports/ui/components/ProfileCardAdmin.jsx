import React from 'react';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { Card, Image, ListGroup, Button } from 'react-bootstrap';

/** Renders ProfileCard Card for the admin */
const ProfileCardAdmin = ({ profile }) => {
  const handleDelete = () => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this profile!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          Meteor.call('profiles.delete', profile._id, (error) => {
            if (error) {
              swal('Error', error.message, 'error');
            } else {
              swal('Profile deleted!', {
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
        <Image src={profile.image} width={200} />
        <Card.Title className="mt-2">{profile.displayName}</Card.Title>
        <Card.Subtitle>
          <ListGroup horizontal className="justify-content-center align-content-center pb-1">
            {profile.genres.map((genre) => (<ListGroup.Item key={genre}>{genre}</ListGroup.Item>))}
          </ListGroup>
          <ListGroup horizontal className="justify-content-center align-content-center">
            {profile.instruments.map((instrument) => (<ListGroup.Item key={instrument}>{instrument}</ListGroup.Item>))}
          </ListGroup>
        </Card.Subtitle>
      </Card.Header>
      <Card.Body>
        <Card.Text>{profile.bio}</Card.Text>
        <Button id="profile-delete" variant="danger" onClick={handleDelete}>Delete Profile</Button>
      </Card.Body>
    </Card>
  );
};

// Require a document to be passed to this component.
ProfileCardAdmin.propTypes = {
  profile: PropTypes.shape({
    _id: PropTypes.string,
    image: PropTypes.string,
    displayName: PropTypes.string,
    bio: PropTypes.string,
    owner: PropTypes.string,
    genres: PropTypes.arrayOf(PropTypes.oneOf(['Rock', 'Pop Music', 'Hip Hop', 'Electronic', 'Jazz', 'Country', 'Alternative', 'Indie', 'Punk Rock', 'Kpop', 'N/A'])),
    instruments: PropTypes.arrayOf(PropTypes.oneOf(['Guitar', 'Piano', 'Violin', 'Flute', 'Saxophone', 'Clarinet', 'Trumpet', 'Cello', 'Bass Guitar', 'Drums', 'N/A'])),
  }).isRequired,
};

export default ProfileCardAdmin;
