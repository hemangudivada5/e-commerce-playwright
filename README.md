
# E-Commerce E2E Automation Framework

## Overview


An end-to-end automation framework built with Playwright and TypeScript. It validates shopping journeys on SauceDemo and product discovery workflows on Automation Exercise.

The project demonstrates maintainable test automation using the Page Object Model (POM), reusable components, custom Playwright fixtures, centralized test data, product search, category and brand navigation, checkout validation, and automated test reporting.


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
- Verify that a locked-out user cannot log in and receives the expected error message.


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

### Product Discovery — Automation Exercise
- Search for products by name and validate matching results.
- Navigate to the Dress category and verify displayed products.
- Select the Polo brand and verify brand-specific products.
- Use a dedicated `ProductDiscoveryPage` Page Object.
- Keep product-discovery tests separate from the SauceDemo shopping workflows.
- Verify that a search with no matching products returns an empty product list.

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
|-- components/
|   `-- ProductCard.ts
|-- config/
|-- fixtures/
|   `-- test-fixtures.ts
|-- pages/
|   |-- LoginPage.ts
|   |-- ProductsPage.ts
|   |-- ProductDetailsPage.ts
|   |-- CartPage.ts
|   |-- CheckoutPage.ts
|   |-- CheckoutOverviewPage.ts
|   |-- OrderConfirmationPage.ts
|   `-- ProductDiscoveryPage.ts
|-- test-data/
|   `-- users.ts
|-- tests/
|   `-- ui/
|       |-- login.spec.ts
|       |-- products.spec.ts
|       |-- checkout.spec.ts
|       `-- product-discovery.spec.ts
|-- utils/
|-- reports/
|-- scripts/
|-- playwright.config.ts
|-- package.json
|-- package-lock.json
`-- README.md
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

### Run Product Discovery Tests

Tests product search, category selection, and brand selection on Automation Exercise.

```bash
npx playwright test tests/ui/product-discovery.spec.ts --project=chromium
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


## Applications Under Test

- [SauceDemo](https://www.saucedemo.com/) — login, product details, cart, checkout, and order placement.
- [Automation Exercise](https://www.automationexercise.com/products) — product search, category navigation, and brand selection.



## Future Enhancements

- API-based test data setup.
- Additional negative and edge-case scenarios.
- Cross-browser automation.
- CI/CD integration.
- Accessibility and visual testing.
