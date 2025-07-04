
# Book Search Testing Demo

This project demonstrates how to combine **UI testing** and **performance testing** in a single repository using:

- Playwright for end-to-end UI testing
- Artillery for browser-based performance testing
- Artillery Cloud for performance result visualization
- GitHub Actions for CI workflows

---

## UI Testing with Playwright

- Located in `tests/ui/`
- Uses page objects from `pages/`
- Validates search functionality and book detail navigation

### Example Test Flow

1. Navigate to the home page
2. Type a book title into the search bar
3. Click on a search result
4. Verify the book detail page

---

## Performance Testing with Artillery

- Located in `tests/performance/`
- Uses the same Playwright page objects
- Simulates user behavior under load

### Step-by-Step Validation

Artillery uses **browser steps** to simulate and measure each user interaction. Each step is named and validated individually using **thresholds**:

- `Step_1_Landing_main_page`: Measures time to load the homepage
- `Step_2_typing_into_search_field`: Measures time to type and display search results
- `Step_3_Clicking_on_search_results`: Measures time to navigate to book detail

### Thresholds Example

ensure:
  thresholds:
    - 'vusers.failed': 2
    - 'browser.step.Step_1_Landing_main_page.p95': 10000
    - 'browser.step.Step_2_typing_into_search_field.p95': 5000
    - 'browser.step.Step_3_Clicking_on_search_results.p95': 10000
    - 'vusers.session_length.p95': 50000
These thresholds ensure that each step performs within acceptable limits, and any regression is caught early.

### CI/CD with GitHub Actions
Two workflows are included:

run-playwright-ui-tests.yml: Runs Playwright UI tests on every push
run-performance-test.yml: Runs Artillery performance tests and uploads results to Artillery Cloud

### Artillery Cloud Integration
Performance test results are visualized and tracked over time using Artillery Cloud. This helps ensure that performance regressions are caught early and trends are monitored.

📷 Screenshots of Artillery Cloud dashboards

### Benefits Demonstrated
Unified testing strategy in one repo
Reuse of Playwright page objects across test types
Continuous performance monitoring
Easy integration with CI/CD pipelines

### 🚀 Getting Started

# Install dependencies
npm install

# Run UI tests
npx playwright test

# Run performance tests
npx artillery run tests/performance/searchBook.artillery.js


## 👩‍💻 Author
Alyona Chernova
Test Engineer | Passionate about quality, automation, and clean code

