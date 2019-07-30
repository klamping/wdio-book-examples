const assert = require('assert');

describe('Homepage', function () {
  it('should load properly', function () {
    // load the page
    browser.url('./');

    // Get the title of the homepage, should be 'Conduit'
    assert.strictEqual(browser.getTitle(), 'Conduit');

    // Click the 'Sign in' navigation link
    $('=Sign in').click();

    // Get the URL of the sign in page. It should include 'login'
    assert.strictEqual(browser.getUrl(), 'https://demo.learnwebdriverio.com/login');
  })
})