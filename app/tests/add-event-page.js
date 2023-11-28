import { Selector } from 'testcafe';

class AddEventPage {
  constructor() {
    this.pageId = '#add-event-page';
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
    const dateTime = '2017-11-03T05:00';

    await this.isDisplayed(testController);
    await testController.typeText('#form-name', name);
    await testController.typeText('#form-description', description);
    await testController.typeText('#form-location', location);
    await testController.typeText('#form-image', image);
    await testController.typeText('#form-dateTime', dateTime);

    const genresSelector = Selector('#form-genres');
    await testController.click(genresSelector.nth(0));

    const instrumentsSelector = Selector('#form-instruments');
    await testController.click(instrumentsSelector.nth(0));
    await testController.click('#form-submit input.btn.btn-primary');
  }
}

export const addEventPage = new AddEventPage();
