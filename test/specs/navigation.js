describe('Homepage', function () {
  it('should load properly', function () {
    // load the page
    browser.url('./');

    // Get the title of the homepage, should be 'Conduit'
    console.log(browser.getTitle())

    // Click the 'Sign in' navigation link
    $('=Sign in').click();

    // Get the URL of the sign in page. It should include 'login'
    console.log(browser.getUrl())
  })
})