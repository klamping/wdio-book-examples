const expect = require('chai').expect;
const Auth = require('../pageObjects/Auth.page');
const { user1 } = require('../fixtures/users');

const auth = new Auth();

describe('Login Form', function () {
    beforeEach(function () {
        auth.load();
    })

    it('should let you log in', function () {
        auth.login(user1);

        // Get the URL of the page, which should no longer include 'login'
        expect(browser.getUrl()).to.not.equal(auth.url.href);
    });

    it('should error with a missing username', function () {
        auth.login({
            email: '',
            password: user1.password
        });

        expect(auth.$errorMessages.getText()).to.equal(`email can't be blank`);
    });

    it('should error with a missing password', function () {
        auth.login({
            email: user1.email,
            password: ''
        });

        expect(auth.$errorMessages.getText()).to.equal(`password can't be blank`);
    });
});