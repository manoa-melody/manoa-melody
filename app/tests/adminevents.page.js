import { Selector } from 'testcafe';

class AdminEventsPage {
  constructor() {
    this.pageId = '#admin-events';
    this.pageSelector = Selector(this.pageId);
    this.deleteButton = Selector('#event-delete');
    this.numEvents = Selector('.admin-events-card');
    this.confirmDelete = Selector('button').withText('OK');
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Delete an event */
  async deleteEvent(testController) {
    await testController.click(this.deleteButton());
  }

  /** Check if the event is deleted */
  async checkNumEvents(testController) {
    await testController.expect(this.numEvents.count).lt(4);
  }

  async clickSwalConfirm(testController) {
    await testController.click(this.confirmDelete);
  }
}

export const adminEventsPage = new AdminEventsPage();
