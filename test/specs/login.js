const expect = require('chai').expect;
const Auth = require('../pageObjects/Auth.page');

const auth = new Auth();

describe('Login Form', function () {
    beforeEach(function () {
        browser.url('./login');
    })

    it('should let you log in', function () {
        auth.login('demowdio@example.com', 'wdiodemo');

        // Get the URL of the page, which should no longer include 'login'
        expect(browser.getUrl()).to.not.include('/login');
    });

    it('should error with a missing username', function () {
        auth.login('', 'wdiodemo');

        expect(auth.$errorMessages.getText()).to.equal(`email can't be blank`);
    });

    it('should error with a missing password', function () {
        auth.login('demowdio@example.com', '');

        expect(auth.$errorMessages.getText()).to.equal(`password can't be blank`);
    });
});