import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * The EventsCollection. It encapsulates state and variable values for event.
 */
class EventsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'EventsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      name: String,
      location: String,
      description: String,
      dateTime: Date,
      image: String,
      genres: {
        type: Array,
      },
      'genres.$': {
        type: String,
        allowedValues: ['Rock', 'Pop Music', 'Hip Hop', 'Electronic', 'Jazz', 'Country', 'Alternative', 'Indie', 'Punk Rock', 'Kpop', 'N/A'],
      },
      instruments: {
        type: Array,
      },
      'instruments.$': {
        type: String,
        allowedValues: ['Guitar', 'Piano', 'Violin', 'Flute', 'Saxophone', 'Clarinet', 'Trumpet', 'Cello', 'Bass Guitar', 'Drums', 'N/A'],
      },
      owner: String,
    });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the StuffsCollection.
 * @type {EventsCollection}
 */
export const Events = new EventsCollection();
