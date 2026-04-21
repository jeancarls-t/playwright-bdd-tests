const reporter = require('multiple-cucumber-html-reporter');
const path = require('path');

reporter.generate({
  jsonDir: path.join(__dirname, 'reports'),
  reportPath: path.join(__dirname, 'reports'),
  displayDuration: true,
  durationInMS: true,
  metadata: {
    browser: {
      name: 'chromium',
      version: 'latest'
    },
    device: 'Local Machine',
    platform: {
      name: process.platform,
      version: 'latest'
    }
  },
  customData: {
    title: 'Playwright BDD Test Report',
    data: [
      { label: 'Project', value: 'Playwright BDD Tests' },
      { label: 'Environment', value: 'QA' },
      { label: 'Execution Date', value: new Date().toLocaleString() }
    ]
  }
});