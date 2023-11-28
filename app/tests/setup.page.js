import { Selector } from 'testcafe';

class SetupPage {
  constructor() {
    this.pageId = '#setup-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Setup a new profile */
  async setupNewProfile(testController) {
    await this.isDisplayed(testController);
    await testController.typeText('#setup-form-name', 'Harvey Lafradez');
    await testController.typeText('#setup-form-image', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyZci7gYK6Iz3ovw4s4aglcn9ykKFAJLKIag&usqp=CAU');

    const firstCheckbox = Selector('#setup-form-genres [type="checkbox"]');
    const firstCheckbox2 = Selector('#setup-form-instruments [type="checkbox"]');
    await testController.click(firstCheckbox.nth(0));
    await testController.click(firstCheckbox2.nth(0));

    await testController.typeText('#setup-form-bio', 'I am a musician');
    await testController.click('#setup-form-submit input.btn.btn-primary');
  }
}

export const setupPage = new SetupPage();
