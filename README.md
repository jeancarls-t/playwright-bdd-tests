# Playwright BDD Tests - Tricentis Demo Web Shop + JSONPlaceholder API

## 📋 Description

Test automation framework for [Tricentis Demo Web Shop](https://demowebshop.tricentis.com) and [JSONPlaceholder API](https://jsonplaceholder.typicode.com) using:
- **Playwright** (Microsoft's modern end-to-end testing framework)
- **BDD with Cucumber (Gherkin)**
- **Page Object Model (POM)**
- **JavaScript**

## 🎯 Test Coverage (10 scenarios)

### UI Tests (Tricentis Demo Web Shop) - 5 scenarios

| Feature | Scenarios | Type |
|---------|-----------|------|
| **Register** | 2 | 1 positive (dynamic email), 1 negative (existing email) |
| **Login** | 3 | 1 positive, 2 negative (wrong password, unregistered email) |

### API Tests (JSONPlaceholder) - 5 scenarios

| Scenario | Method | Endpoint | Expected |
|----------|--------|----------|----------|
| Get a single post | GET | `/posts/1` | 200 |
| Get all posts | GET | `/posts` | 200 |
| Create a new post | POST | `/posts` | 201 |
| Update a post | PUT | `/posts/1` | 200 |
| Delete a post | DELETE | `/posts/1` | 200 |

## 🚀 Quick Start

### Prerequisites

- Node.js 20+ ([Download](https://nodejs.org/))
- npm (comes with Node.js)
- Git ([Download](https://git-scm.com/))

### Installation

```bash
# Clone the repository
git clone https://github.com/jeancarls-t/playwright-bdd-tests.git
cd playwright-bdd-tests

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install chromium

# Run Tests

# Run all tests (UI + API)
npm run test

# Run UI tests only
npx cucumber-js --tags "@ui" --config cucumber.json

# Run API tests only
npx cucumber-js --tags "@api" --config cucumber.json

# Run tests with headed mode (see browser)
npx cucumber-js --config cucumber.json --world-parameters '{"headed":"true"}'

# Generate HTML Report
# Generate unified HTML report
npm run test:full

# Open the report (Windows)
start reports/index.html

# Open the report (Mac/Linux)
open reports/index.html

# Reports
reports/index.html

# 🏗️ Project Structure
playwright-bdd-tests/
├── features/
│   ├── 01-register.feature
│   ├── 02-login.feature
│   ├── 03-jsonplaceholder-api.feature
│   ├── support/
│   │   └── world.js
│   └── step_definitions/
│       ├── common-steps.js
│       └── api-steps.js
├── fixtures/
├── reports/                     # Test reports (generated)
├── cucumber.json                # Cucumber configuration
├── generate-report.js           # HTML report generator
├── package.json
└── README.md

# 🔄 CI/CD with GitHub Actions
Runs on every push and pull_request

Executes all tests on Ubuntu

Generates HTML report

Uploads report as artifact

# 🛠️ Technology Stack
Technology	Version	Purpose
Playwright	Latest	Test automation
Cucumber	10.x	BDD / Gherkin
JavaScript	ES2022	Programming language
multiple-cucumber-html-reporter	Latest	HTML reports
GitHub Actions	-	Continuous Integration

✅ Key Features

BDD with Cucumber: Tests written in Gherkin language

Page Object Model (POM): Clean and maintainable code

Dynamic Email Generation: Avoids duplicate registration conflicts

API Testing: Complete CRUD operations with JSONPlaceholder

HTML Reports: Beautiful, detailed test reports

Cross-browser Support: Chromium, Firefox, WebKit

🧹 Cleaning

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Delete test artifacts
rm -rf reports

# 🤝 Contributing
Follow Page Object Model pattern

Write features in Gherkin language

Run npm run test locally before submitting PR

Update documentation when adding features

# 📄 License
This project is created for a technical assessment.

# ✨ Author
Jean Caro
GitHub: @jeancarls-t


Last Updated: April 2026