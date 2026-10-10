import { Page, Locator } from '@playwright/test';

export class OrderConfirmationPage {
  readonly page: Page;
  readonly confirmationHeading: Locator;
  readonly confirmationMessage: Locator;
  readonly backHomeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.confirmationHeading = page.locator('[data-test="complete-header"]');
    this.confirmationMessage = page.locator('[data-test="complete-text"]');
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
  }
  async getConfirmationHeading(): Promise<string> {
  return (
    (await this.confirmationHeading.textContent())?.trim() ?? ''
  );
}

async getConfirmationMessage(): Promise<string> {
  return (
    (await this.confirmationMessage.textContent())?.trim() ?? ''
  );
}
async backHome(): Promise<void> {
  await this.backHomeButton.click();
}
}