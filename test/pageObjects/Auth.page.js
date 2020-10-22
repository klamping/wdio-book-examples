const Generic = require('./Generic.page');

class Auth extends Generic {
    constructor () {
        super('./login')
    }

    get $email () { return $('input[type="email"]'); }
    get $password () { return $('input[type="password"]'); }
    get $signIn () { return $('button*=Sign in'); }
    get $errorMessages () { return $('.error-messages li'); }

    login ({ email, password }) {
        this.load();

        this.$email.setValue(email);
        this.$password.setValue(password);

        this.$signIn.click();

        // wait until either the sign in button is gone or an error appears
        browser.waitUntil(() => {
            const signInExists = this.$signIn.isExisting();
            const errorExists = this.$errorMessages.isExisting();

            return !signInExists || errorExists;
        }, { timoutMsg: 'The "Sign in" button still exists and an error never appeared' });
    }

    clearSession() {
        browser.execute(() => {
            window.localStorage.clear();
        });
    }
}

module.exports = Auth;