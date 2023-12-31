import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, LongTextField, DateField, SubmitField, TextField, SelectField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Events } from '../../api/event/Event';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  name: String,
  location: String,
  description: String,
  dateTime: Date,
  image: String,
  genres: {
    type: Array,
    custom() {
      const { value } = this;
      if (!value || value.length === 0) {
        return 'At least one genre is required';
      }
      return undefined;
    },
  },
  'genres.$': {
    type: String,
    allowedValues: ['Rock', 'Pop Music', 'Hip Hop', 'Electronic', 'Jazz', 'Country', 'Alternative', 'Indie', 'Punk Rock', 'Kpop', 'N/A'],
  },

  instruments: {
    type: Array,
    custom() {
      const { value } = this;
      if (!value || value.length === 0) {
        return 'At least one instrument is required';
      }
      return undefined;
    },
  },
  'instruments.$': {
    type: String,
    allowedValues: ['Guitar', 'Piano', 'Violin', 'Flute', 'Saxophone', 'Clarinet', 'Trumpet', 'Cello', 'Bass Guitar', 'Drums', 'N/A'],
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddEvent page for adding a document. */
const AddEvent = () => {

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { name, location, description, dateTime, image, genres, instruments } = data;
    const owner = Meteor.user().username;
    Events.collection.insert(
      { name, location, description, dateTime, image, genres, instruments, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Event added successfully', 'success');
          formRef.reset();
        }
      },
    );
  };

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;
  return (
    <Container id="add-event-page" className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Add Event</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <TextField id="form-name" name="name" placeholder="Event Name" />
                <Row>
                  <Col>
                    <TextField id="form-location" name="location" placeholder="Event Location" />
                  </Col>
                  <Col>
                    <DateField id="form-dateTime" name="dateTime" label="Date and Time" />
                  </Col>
                </Row>
                <LongTextField id="form-description" name="description" placeholder="Event Description" />
                <TextField id="form-image" name="image" placeholder="Image URL" />
                <Row>
                  <Col>
                    <SelectField id="form-genres" name="genres" />
                  </Col>
                  <Col>
                    <SelectField id="form-instruments" name="instruments" />
                  </Col>
                </Row>
                <SubmitField id="form-submit" value="Submit" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default AddEvent;
