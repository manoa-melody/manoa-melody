import { Selector } from 'testcafe';

class NavBar {

  /** If someone is logged in, then log them out, otherwise do nothing. */
  async ensureLogout(testController) {
    const loggedInUser = await Selector('#navbar-current-user').exists;
    if (loggedInUser) {
      await testController.click('#navbar-current-user');
      await testController.click('#navbar-sign-out');
    }
  }

  async gotoSignInPage(testController) {
    await this.ensureLogout(testController);
    const visible = await Selector('#basic-navbar-nav').visible;
    if (!visible) {
      await testController.click('button.navbar-toggler');
    }
    await testController.click('#signup');
    await testController.click('#login');
  }

  /** Check that the specified user is currently logged in. */
  async isLoggedIn(testController, username) {
    const visible = await Selector('#basic-navbar-nav').visible;
    if (!visible) {
      await testController.click('button.navbar-toggler');
    }
    const loggedInUser = Selector('#navbar-current-user').innerText;
    await testController.expect(loggedInUser).eql(username);
  }

  /** Check that someone is logged in, then click items to logout. */
  async logout(testController) {
    const visible = await Selector('#basic-navbar-nav').visible;
    if (!visible) {
      await testController.click('button.navbar-toggler');
    }
    await testController.expect(Selector('#navbar-current-user').exists).ok();
    await testController.click('#navbar-current-user');
    await testController.click('#navbar-sign-out');
  }

  /** Pull down login menu, go to sign up page. */
  async gotoSignUpPage(testController) {
    await this.ensureLogout(testController);
    const visible = await Selector('#basic-navbar-nav').visible;
    if (!visible) {
      await testController.click('button.navbar-toggler');
    }
    await testController.click('#signup');
  }

  /** Go to profiles page. */
  async gotoProfilesPage(testController) {
    const visible = await Selector('#basic-navbar-nav').visible;
    if (!visible) {
      await testController.click('button.navbar-toggler');
    }
    await testController.click('#profiles-page');
  }

  /** Go to events page. */
  async gotoEventsPage(testController) {
    const visible = await Selector('#basic-navbar-nav').visible;
    if (!visible) {
      await testController.click('button.navbar-toggler');
    }
    await testController.click('#events-page');
  }

  /** Go to add events page. */
  async gotoAddEventPage(testController) {
    const visible = await Selector('#basic-navbar-nav').visible;
    if (!visible) {
      await testController.click('button.navbar-toggler');
    }
    await testController.click('#add-event-page');
  }

  /** Go to my events page. */
  async gotoMyEventPage(testController) {
    const visible = await Selector('#basic-navbar-nav').visible;
    if (!visible) {
      await testController.click('button.navbar-toggler');
    }
    await testController.click('#myevents-page');
  }

  /** Go to my profile page. */
  async gotoMyProfilePage(testController) {
    const visible = await Selector('#basic-navbar-nav').visible;
    if (!visible) {
      await testController.click('button.navbar-toggler');
    }
    await testController.click('#my-profile');
  }

  async gotoAdminEventsPage(testController) {
    const visible = await Selector('#basic-navbar-nav').visible;
    if (!visible) {
      await testController.click('button.navbar-toggler');
    }
    await testController.click('#amin-events-page');
  }
}

export const navBar = new NavBar();
