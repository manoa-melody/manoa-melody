import { Selector } from 'testcafe';

class MyEventsPage {
  constructor() {
    this.pageId = '#myevents-page';
    this.pageSelector = Selector(this.pageId);
    this.addEventLink = Selector('a').withText('CLICK HERE');
    this.eventCards = Selector('.myevent-card');
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Clicks the 'CLICK HERE' if the user does not have any events */
  async toAddEventPage(testController) {
    await testController.click(this.addEventLink);
  }

  /** Tests to see if there are events in the my events page */
  async hasEvents(testController) {
    await testController.expect(this.eventCards.count).gt(0);
  }

  /** Tests to see if the delete event button works */
  async deleteEvent(testController) {
    await testController.click('.btn-danger');
    await testController.click('.swal-button--danger');
    await testController.expect(this.eventCards.count).eql(0);
  }
}

export const myEventsPage = new MyEventsPage();
