const expect = require('chai').expect;

describe('Login Page', function () {
    it('should let you log in', function () {
        browser.url('./login');

        $('input[type="email"]').setValue('demowdio@example.com');
        $('input[type="password"]').setValue('wdiodemo');

        const $signIn = $('button*=Sign in');
        $signIn.click();

        $signIn.waitForExist(undefined, true);

        expect(browser.getUrl()).to.not.include('/login');
    });
});