import { Meteor } from 'meteor/meteor';
import { Profiles } from '../../api/profile/Profiles';
import { Events } from '../../api/event/Event';
/* eslint-disable no-console */

// Initialize the database with a default profile document.
const addProfile = (profile) => {
  console.log(`  Adding: ${profile.firstName} ${profile.lastName} (${profile.email})`);
  Profiles.collection.insert(profile);
};

// Initialize the ProfilesCollection if empty.
if (Profiles.collection.find().count() === 0) {
  if (Meteor.settings.defaultProfiles) {
    console.log('Creating default profiles.');
    Meteor.settings.defaultProfiles.forEach(profile => addProfile(profile));
  }
}

// Initialize the database with a default event document.
const addEvent = (event) => {
  console.log(`  Adding: ${event.name} ${event.dateTime}`);
  Events.collection.insert(event);
};

// Initialize the EventsCollection if empty.
if (Events.collection.find().count() === 0) {
  if (Meteor.settings.defaultEvents) {
    console.log('Creating default events.');
    Meteor.settings.defaultEvents.forEach(event => addEvent(event));
  }
}
