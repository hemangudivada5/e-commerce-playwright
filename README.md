
# E-Commerce E2E Automation Framework

## Overview

An end-to-end test automation framework built with Playwright and TypeScript to validate essential shopping journeys on the SauceDemo web application.

The project demonstrates maintainable test automation using the Page Object Model (POM), reusable components, custom Playwright fixtures, centralized test data, and automated test reporting.

## Technology Stack

- Playwright
- TypeScript
- Node.js and npm
- Playwright Test Runner
- Git and GitHub

## Key Features

### Login Testing
- Validate successful login with valid credentials.
- Verify error handling for invalid credentials.

### Product Testing
- Verify product names, descriptions, and prices.
- Test sorting by price from low to high and high to low.
- Test sorting by product name from A to Z and Z to A.

### Shopping Cart
- Add products to the cart.
- Verify cart contents and quantities.
- Remove products and verify the updated cart.
- Validate continue-shopping and checkout navigation.

### Checkout and Order Placement
- Verify validation errors for missing checkout information.
- Validate navigation to the checkout overview.
- Verify products, subtotal, tax, and total.
- Complete an order and verify the confirmation message.

### Framework Design
- Page Object Model for page-level interactions.
- Reusable `ProductCard` component.
- Custom Playwright fixtures for sharing Page Objects.
- Centralized login test data.
- Shared login setup using `beforeEach` in product and checkout test suites.
- Chromium-based test execution.
- HTML reporting and failure-focused debugging artifacts.

## Project Structure

```text
e-commerce-playwright/
├── components/
│   └── ProductCard.ts
├── fixtures/
│   └── test-fixtures.ts
├── pages/
│   ├── LoginPage.ts
│   ├── ProductsPage.ts
│   ├── ProductDetailsPage.ts
│   ├── CartPage.ts
│   ├── CheckoutPage.ts
│   ├── CheckoutOverviewPage.ts
│   └── OrderConfirmationPage.ts
├── test-data/
│   └── users.ts
├── tests/
│   └── ui/
│       ├── login.spec.ts
│       ├── products.spec.ts
│       └── checkout.spec.ts
├── playwright.config.ts
├── package.json
└── README.md
```

## Prerequisites

- Node.js and npm
- Git
- Internet access to the SauceDemo application

## Installation

Clone the GitHub repository:

```bash
git clone https://github.com/hemangudivada5/e-commerce-playwright
cd e-commerce-playwright
```

Install dependencies:

```bash
npm install
```

Install the Chromium browser:

```bash
npx playwright install chromium
```

## Run Tests

Run the complete test suite:

```bash
npx playwright test --project=chromium
```

Run login tests only:

```bash
npx playwright test tests/ui/login.spec.ts --project=chromium
```

Run product tests only:

```bash
npx playwright test tests/ui/products.spec.ts --project=chromium
```

Run checkout tests only:

```bash
npx playwright test tests/ui/checkout.spec.ts --project=chromium
```

## Test Reports

Generate the report by running the test suite:

```bash
npx playwright test --project=chromium
```

Open the HTML report:

```bash
npx playwright show-report
```

Screenshots, traces, and videos can help investigate failures according to the project's Playwright configuration.

## Application Under Test

[SauceDemo](https://www.saucedemo.com/)

## Future Enhancements

- API-based test data setup.
- Additional negative and edge-case scenarios.
- Cross-browser automation.
- CI/CD integration.
- Accessibility and visual testing.
