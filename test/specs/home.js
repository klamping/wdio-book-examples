const expect = require('chai').expect;
const Home = require('../pageObjects/Home.page');
const Auth = require('../pageObjects/Auth.page');
const { user1 } = require('../fixtures/users');

const home = new Home();
const auth = new Auth();

describe('Homepage', function () {

    describe('Logged In', function () {
        before(function () {
            auth.load();
            auth.login(user1);

            home.load();
        });

        it('should show both feed tabs', function () {
            expect(home.feedTabsText).to.deep.equal(['Your Feed', 'Global Feed']);
        });

        after(function () {
            auth.clearSession();
        });
    });
    describe('Anonymous', function () {
        before(function () {
            // load the page
            home.load();
        });

        it('should load properly', function () {
            // check that top nav/footer exist
            expect(home.$siteHeader.isExisting(), 'Site Header').to.be.true;
            expect(home.$siteFooter.isExisting(), 'Site Footer').to.be.true;
            expect(home.$siteNav.isExisting(), 'Site Nav').to.be.true;
        });

        it('should only show the global feed tab', function () {
            expect(home.feedTabsText).to.deep.equal(['Global Feed']);
        });
    })
})

