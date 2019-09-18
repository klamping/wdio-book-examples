class Auth {
    get $email () { return $('input[type="email"]'); }
    get $password () { return $('input[type="password"]'); }
    get $signIn () { return $('button*=Sign in'); }
    get $errorMessages () { return $('.error-messages li'); }

    login (email, password) {
        this.$email.setValue(email);
        this.$password.setValue(password);

        this.$signIn.click();

        // wait until either the sign in button is gone or an error has appeared
        browser.waitUntil(() => {
            const signInExists = this.$signIn.isExisting();
            const errorExists = this.$errorMessages.isExisting();

            return !signInExists || errorExists;
        }, null, 'The sign in button is not gone and an error never appeared');
    }
}

module.exports = Auth;