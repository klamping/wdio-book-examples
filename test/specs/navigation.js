const chai = require('chai');
const expect = chai.expect

describe('Homepage', function () {
  it('should load properly', function () {
    // load the page
    browser.url('./');

    // Get the title of the homepage, should be 'Conduit'
    expect(browser.getTitle()).to.equal('Conduit');

    // Click the 'Sign in' navigation link
    $('=Sign in').click();

    // Get the URL of the sign in page. It should include 'login'
    expect(browser.getUrl()).to.include('/login');
  })
})