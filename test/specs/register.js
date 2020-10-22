const Register = require('../pageObjects/Register.page');

const register = new Register();

const username = 'newuser';
const email = 'newuser@learnwebdriverio.com';
const password = 'hunter2';

describe('Register Page', function() {
    beforeEach(function () {
        register.load();
    })

    it('should let you register', function () {
        // use a timestamp to generate "unique" username/email every test run
        const uniqueUsername = username + Date.now();

        register.submitForm({
            username: uniqueUsername,
            email: uniqueUsername + '@learnwebdriverio.com',
            password
        });

        // Get the URL of the page, which should no longer include 'register'
        expect(browser).not.toHaveUrl(register.url.href);
    });

    it('should error with a missing username', function () {
        register.submitForm({
            username: '',
            email,
            password
        });

        expect(register.$errorMessages).toHaveText(`username can't be blank`);
    });

    it('should error with an already registered username', function () {
        register.submitForm({
            username: 'demouser',
            email,
            password
        });

        expect(register.$errorMessages).toHaveText(`username is already taken.`);
    });

    it('should error with a missing email', function () {
        register.submitForm({
            username,
            email: '',
            password
        });

        expect(register.$errorMessages).toHaveText(`email can't be blank`);
    });

    it('should error with an already registered email', function () {
        register.submitForm({
            username,
            email: 'demo@learnwebdriverio.com',
            password
        });

        expect(register.$errorMessages).toHaveText(`email is already taken.`);
    });

    it('should error with an invalid email', function () {
        register.submitForm({
            username,
            email: 'invalid',
            password
        });

        expect(register.$errorMessages).toHaveText(`email is invalid`);
    });

    // uh-oh, this test fails because there's a bug on the register page!
    it.skip('should error with a missing password', function () {
        register.submitForm({
            username,
            email,
            password: ''
        });

        expect(register.$errorMessages).toHaveText(`password can't be blank`);
    });
});