import { Page, Locator } from '@playwright/test';

export class CheckoutOverviewPage {
  readonly page: Page;
  readonly summaryItems: Locator;
  readonly subtotal: Locator;
  readonly tax: Locator;
  readonly total: Locator;
  readonly cancelButton: Locator;
  readonly finishButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.summaryItems = page.locator('[data-test="inventory-item"]');
    this.subtotal = page.locator('[data-test="subtotal-label"]');
    this.tax = page.locator('[data-test="tax-label"]');
    this.total = page.locator('[data-test="total-label"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.finishButton = page.locator('[data-test="finish"]');
  }
  private async readAmount(locator: Locator): Promise<number> {
  const text = await locator.textContent();
  const amount = text?.match(/\$([\d.]+)/)?.[1];

  if (!amount) {
    throw new Error(`Could not read a monetary amount from: ${text}`);
  }

  return Number(amount);
}

async getSubtotal(): Promise<number> {
  return this.readAmount(this.subtotal);
}

async getTax(): Promise<number> {
  return this.readAmount(this.tax);
}

async getTotal(): Promise<number> {
  return this.readAmount(this.total);
}
async getProductNames(): Promise<string[]> {
  const names = await this.summaryItems
    .locator('[data-test="inventory-item-name"]')
    .allTextContents();

  return names.map(name => name.trim());
}
async finishOrder(): Promise<void> {
  await this.finishButton.click();
}
}