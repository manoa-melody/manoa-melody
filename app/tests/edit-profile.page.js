import { Selector } from 'testcafe';

class EditProfilePage {
  constructor() {
    this.pageId = '#edit-profile';
    this.pageSelector = Selector(this.pageId);
    this.editBtn = Selector('a').withText('Edit Profile');
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Clicks the edit profile button in the my profile page */
  async clickEditButton(testController) {
    await testController.click(this.editBtn);
  }

  async changeProfile(testController) {
    await this.isDisplayed(testController); // Checks to see if the edit profile page is displayed
    await testController.typeText('#edit-displayName', 'Harvey');
    await testController.typeText('#edit-image', 'https://i.pinimg.com/736x/95/f1/e4/95f1e476a615e28f8b74bc93c248ea3c.jpg');

    const firstCheckbox = Selector('#edit-genres [type="checkbox"]');
    const firstCheckbox2 = Selector('#edit-instruments [type="checkbox"]');
    await testController.click(firstCheckbox.nth(1));
    await testController.click(firstCheckbox2.nth(1));

    await testController.typeText('#edit-bio', 'I am a musician wooohooo :))');
    await testController.click('#edit-submit-btn input.btn.btn-primary');
  }
}

export const editProfilePage = new EditProfilePage();
