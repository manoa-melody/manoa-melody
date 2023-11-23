import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Image, Row, Card, ListGroup, Button } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import { Profiles } from '../../api/profile/Profiles';
import { Events } from '../../api/event/Event';
import EventCard from '../components/EventCard';

/* Renders a table containing all of the Profile documents. Use <StuffItem> to render each row. */
const MyProfile = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, profiles, events } = useTracker(() => {
    // Gets the username logged into the website
    const user = Meteor.user();
    // Check if the user exists before accessing user().username
    const owner = user ? user.username : null;
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Profile documents.
    const subscription = Meteor.subscribe(Profiles.userPublicationName);
    const subscription2 = Meteor.subscribe(Events.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready() && subscription2.ready();
    // Get the Profile documents
    let profileItems;
    let eventItems;
    if (owner) {
      profileItems = Profiles.collection.find({ owner: owner }).fetch();
      eventItems = Events.collection.find({ owner: owner }).fetch();
    }
    return {
      events: eventItems,
      profiles: profileItems,
      ready: rdy,
    };
  }, []);

  return (ready ? (
    <Container id="my-profile" className="py-3">
      <Row className="justify-content-center">
        <Col>
          <Col className="text-center">
            {profiles.map((profile) => (<h2>{profile.displayName}</h2>))}
          </Col>
          <Row xs={1} lg={events.length > 0 ? 3 : 2} className="g-4">
            <Col>
              {profiles.map((profile) => (
                <Col key={profile._id}>
                  <div className="image-container">
                    <Image src={profile.image} className="profile-picture" />
                  </div>
                  <div id="edit-profile-btn">
                    <Button variant="light">Edit Profile</Button>
                  </div>
                  <div id="bio">
                    <h4>BIO</h4>
                    <p>{profile.bio}</p>
                  </div>
                </Col>
              ))}
            </Col>
            {events.length > 0 && (
              <Col>
                <Row lg={1} className="g-4">
                  {events.map((event) => (
                    <Col key={event._id}>
                      <EventCard event={event} />
                    </Col>
                  ))}
                </Row>
              </Col>
            )}
            <Col>
              <Row lg={1} className="g-4">
                {profiles.map((profile) => (
                  <Col key={profile._id}>
                    <Card className="h-100">
                      <Card.Header className="text-center">
                        <Card.Subtitle>{profile.displayName} plays the instrument(s)...</Card.Subtitle>
                      </Card.Header>
                      <Card.Body>
                        <ListGroup horizontal className="justify-content-center">
                          {profile.instruments.map((instrument) => (
                            <ListGroup.Item key={instrument}>{instrument}</ListGroup.Item>
                          ))}
                        </ListGroup>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
                {profiles.map((profile) => (
                  <Col key={profile._id}>
                    <Card className="h-100">
                      <Card.Header className="text-center">
                        <Card.Subtitle>{profile.displayName} likes the genre(s)...</Card.Subtitle>
                      </Card.Header>
                      <Card.Body>
                        <ListGroup horizontal className="justify-content-center">
                          {profile.genres.map((genre) => (
                            <ListGroup.Item key={genre}>{genre}</ListGroup.Item>
                          ))}
                        </ListGroup>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default MyProfile;
