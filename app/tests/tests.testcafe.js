import { Selector } from 'testcafe';
import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';
import { profilesPage } from './profiles.page';
import { eventsPage } from './events.page';
import { addEventPage } from './add-event-page';
import { myEventsPage } from './myevents.page';
import { signupPage } from './signup.page';
import { setupPage } from './setup.page';
import { editProfilePage } from './edit-profile.page';
import { myProfilePage } from './my-profile.page';
import { adminEventsPage } from './adminevents.page';
import { adminProfilesPage } from './adminprofiles.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'john@foo.com', password: 'changeme' };
const myEventsCard = Selector('.myevent-card');
const adminCredentials = { username: 'admin@foo.com', password: 'changeme' };

/** New user credentials for signup test */
const newCredentials = { username: 'harvey@foo.com', password: 'changeme' };

fixture('meteor-application-template-react localhost test with default db')
  .page('http://localhost:3000');

/** This test works. -Harvey */
test('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});

/** This test works. -Harvey */
test('Test that signin and signout work', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

/** This test works. -Harvey */
test('Test that profiles page shows up', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoProfilesPage(testController);
  await profilesPage.isDisplayed(testController);
});

/** This test works. -Harvey */
test('Test that events page shows up', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoEventsPage(testController);
  await eventsPage.isDisplayed(testController);
});

/** This test works. -Harvey */
test('Test that signup page works and creates a profile', async (testController) => {
  await navBar.gotoSignUpPage(testController); // Go to signup page
  await signupPage.signupUser(testController, newCredentials.username, newCredentials.password); // Sign up new user
  await setupPage.setupNewProfile(testController); // Set up new profile
});

test('Test that edit my profile page works', async (testController) => {
  await navBar.gotoSignInPage(testController); // Clicks the sign in on the navbar
  /* Signs in using the credentials */
  await signinPage.signin(testController, newCredentials.username, newCredentials.password);
  await navBar.isLoggedIn(testController, newCredentials.username); // Checks to see if logged in
  await navBar.gotoMyProfilePage(testController); // Goes to my profile page
  await editProfilePage.clickEditButton(testController); // Clicks the edit profile button
  await editProfilePage.changeProfile(testController); // Change the profile
  await myProfilePage.isDisplayed(testController); // After clicking submit, should go back to my profile
});

test('Test that my profile page works', async (testController) => {
  await navBar.gotoSignInPage(testController); // Clicks the sign in on the navbar
  /* Signs in using the credentials */
  await signinPage.signin(testController, newCredentials.username, newCredentials.password);
  await navBar.isLoggedIn(testController, newCredentials.username); // Checks to see if logged in
  await navBar.gotoMyProfilePage(testController); // Goes to my profile page
  await myProfilePage.isDisplayed(testController); // My profile page should be displayed
});

test('Test that add event works', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, newCredentials.username, newCredentials.password);
  await navBar.isLoggedIn(testController, newCredentials.username);
  await navBar.gotoAddEventPage(testController);
  await addEventPage.isDisplayed(testController);
  await addEventPage.addEvent(testController);
});

test('Test that my events works', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, newCredentials.username, newCredentials.password);
  await navBar.isLoggedIn(testController, newCredentials.username);
  await navBar.gotoMyEventPage(testController);
  await myEventsPage.isDisplayed(testController);
  const eventsCount = await myEventsCard.count;
  if (eventsCount === 0) {
    await myEventsPage.toAddEventPage(testController);
    await addEventPage.isDisplayed(testController);
    await addEventPage.addEvent(testController);
    await addEventPage.clickSwalButton(testController);
    await navBar.gotoMyEventPage(testController);
  }
  await myEventsPage.hasEvents(testController);
});

test('Test that delete event works in my events', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, newCredentials.username, newCredentials.password);
  await navBar.isLoggedIn(testController, newCredentials.username);
  await navBar.gotoMyEventPage(testController);
  await myEventsPage.isDisplayed(testController);
  const eventsCount = await myEventsCard.count;
  if (eventsCount === 0) {
    await myEventsPage.toAddEventPage(testController);
    await addEventPage.isDisplayed(testController);
    await addEventPage.addEvent(testController);
    await addEventPage.clickSwalButton(testController);
    await navBar.gotoMyEventPage(testController);
  }
  await myEventsPage.hasEvents(testController);
  await myEventsPage.deleteEvent(testController);
});

test('Test that logging into admin works', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, adminCredentials.username, adminCredentials.password);
  await navBar.isLoggedIn(testController, adminCredentials.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test that delete admin event and is displayed works', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, adminCredentials.username, adminCredentials.password);
  await navBar.isLoggedIn(testController, adminCredentials.username);
  await navBar.gotoAdminEventsPage(testController);
  await adminEventsPage.isDisplayed(testController);
  await adminEventsPage.deleteEvent(testController);
  await adminEventsPage.clickSwalConfirm(testController);
  await adminEventsPage.checkNumEvents(testController);
});

test('Test that admin delete profile works', async (testController) => {
  // Sign in as admin
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, adminCredentials.username, adminCredentials.password);
  await navBar.isLoggedIn(testController, adminCredentials.username);
  // Go to profiles page
  await navBar.gotoAdminProfilesPage(testController);
  await adminProfilesPage.isDisplayed(testController);
  // Delete a profile
  await adminProfilesPage.deleteProfile(testController);
  await adminProfilesPage.clickSwalConfirm(testController);
  await adminProfilesPage.checkNumProfiles(testController);
});
