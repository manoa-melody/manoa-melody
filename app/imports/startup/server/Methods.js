import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Profiles } from '../../api/profile/Profiles';
import { Events } from '../../api/event/Event';

Meteor.methods({
  'profiles.delete'(_id) {
    check(_id, String);
    if (!this.userId) {
      throw new Meteor.Error('Not Authorized', 'You are not authorized to perform this action');
    }

    // Optional: Additional checks, e.g., if the user owns the profile or if the user is an admin

    // Perform the deletion
    return Profiles.collection.remove({ _id });
  },

  'event.delete'(_id) {
    check(_id, String);
    if (!this.userId) {
      throw new Meteor.Error('Not Authorized', 'You are not authorized to perform this action');
    }

    // Optional: Additional checks, e.g., if the user owns the profile or if the user is an admin

    // Perform the deletion
    return Events.collection.remove({ _id });
  },
});
