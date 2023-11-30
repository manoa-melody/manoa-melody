import { Selector } from 'testcafe';

class EventsPage {
  constructor() {
    this.pageId = '#events-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const eventsPage = new EventsPage();
