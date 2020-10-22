const Generic = require('./Generic.page');

class Register extends Generic {
    constructor () {
        super('./register')
    }

    get $username () { return $('input[placeholder="Username"]'); }
    get $email () { return $('input[placeholder="Email"]'); }
    get $password () { return $('input[placeholder="Password"]'); }
    get $signUpButton () { return $('button*=Sign up'); }
    get $errorMessages () { return $('.error-messages li'); }

    submitForm ({ username, email, password }) {
        this.$username.setValue(username);
        this.$email.setValue(email);
        this.$password.setValue(password);

        this.$signUpButton.click();

        // wait until either the register button is gone or an error has appeared
        browser.waitUntil(() => {
            const buttonExists = this.$signUpButton.isExisting();
            const errorExists = this.$errorMessages.isExisting();

            return !buttonExists || errorExists;
        }, {
            timeoutMsg: 'The "Sign Up" button is not gone and an error never appeared'
        });
    }
}

module.exports = Register;