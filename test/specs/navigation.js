describe('Homepage', function () {
  it('should load properly', function () {
    // load the page
    browser.url('./');

    // Get the title of the homepage, should be 'Conduit'
    if (browser.getTitle() !== 'The wrong title') {
       // throw an error explaining what went wrong
       throw new Error('Title of the homepage should be "Conduit"')
    }

    // Click the 'Sign in' navigation link
    $('=Sign in').click();

    // Get the URL of the sign in page. It should include 'login'
    if (browser.getUrl() !== 'https://demo.learnwebdriverio.com/login') {
      throw new Error('URL of "login" page should be correct')
    }
  })
})