describe('Login Page', function () {
    it('should let you log in', function () {
        browser.url('./login');

        $('input[type="email"]').setValue('demo@learnwebdriverio.com');
        // $('input[type="password"]').setValue('wdiodemo');

        $('button=Sign in').click();

        browser.pause(1000);

        expect($('.error-messages li')).not.toBeExisting();
    });
});