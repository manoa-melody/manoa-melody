import { Selector } from 'testcafe';
import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';
import { profilesPage } from './profiles.page';
import { eventsPage } from './events.page';
import { addEventPage } from './add-event-page';
import { myEventsPage } from './myevents.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'john@foo.com', password: 'changeme' };
const myEventsCard = Selector('.myevent-card');

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

test('Test that events page shows up', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoEventsPage(testController);
  await eventsPage.isDisplayed(testController);
});

test('Test that add event works', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoAddEventPage(testController);
  await addEventPage.isDisplayed(testController);
  await addEventPage.addEvent(testController);
});

/** This Test work */
test('Test that my events works', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
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
