import { Selector } from 'testcafe';

class AddEventPage {
  constructor() {
    this.pageId = '#mm-landing-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
  /** tests if adding an event works */
  async addEvent(testController) {
    const name = 'Campus Jam';
    const location = 'UH Mānoa Campus Center';
    const description = 'Campus Jam on Campus';
    const image = 'https://manoa.hawaii.edu/studentlife/wp-content/uploads/IMG_8520-scaled.jpg';
    const dateTime = new Date('2023-12-01T17:00:00');

    await this.isDisplayed(testController);
  }
}

export const addEventPage = new AddEventPage();
