const Auth = require('../pageObjects/Auth.page');
const { user1 } = require('../fixtures/users');

const auth = new Auth();

describe('Login Form', function () {
    it.only('should let you log in', function () {
        auth.login(user1);

        expect($('.error-messages li')).not.toBeExisting();
    });

    it('should error with a missing email', function () {
        auth.login({
            email: '',
            password: user1.password
        });

        expect(auth.$errorMessages).toHaveText(`email can't be blank`);
    });

    it('should error with a missing password', function () {
        auth.login({
            email: user1.email,
            password: ''
        });

        expect(auth.$errorMessages).toHaveText(`password can't be blank`);
    });
});