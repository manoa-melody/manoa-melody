import { Selector } from 'testcafe';

class AdminProfilesPage {
  constructor() {
    this.pageId = '#admin-profiles';
    this.pageSelector = Selector(this.pageId);
    this.deleteButton = Selector('#profile-delete');
    this.numProfiles = Selector('.admin-profile-card');
    this.confirmDelete = Selector('button').withText('OK');
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Delete an event */
  async deleteProfile(testController) {
    await testController.click(this.deleteButton());
  }

  /** Check if the event is deleted */
  async checkNumProfiles(testController) {
    await testController.expect(this.numProfiles.count).lt(4);
  }

  async clickSwalConfirm(testController) {
    await testController.click(this.confirmDelete);
  }
}

export const adminProfilesPage = new AdminProfilesPage();
