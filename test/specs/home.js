const expect = require('chai').expect;
const Home = require('../pageObjects/Home.page');
const Auth = require('../pageObjects/Auth.page');
const { user1 } = require('../fixtures/users');
const Api = require('../../utils/Api');

const home = new Home();
const auth = new Auth();

describe('Homepage', function () {
    describe('Logged In', function () {
        before(function () {
            browser.loginViaApi(user1);

            home.load();
        })

        it('should show both feed tabs', function () {
            expect(home.feedTabsText).to.deep.equal(['Your Feed', 'Global Feed']);
        });

        it('should default to showing the global feed', function () {
            // get all tabs with an 'active' class, check that only one returns with correct text
            expect(home.activeFeedTabText).to.deep.equal(['Global Feed']);
        })

        it('should let you switch between global and personal feeds', function () {
            // click on 'Your feed' tab
            home.clickTab('Your Feed');
            // validate 'active' tabs are correct
            expect(home.activeFeedTabText).to.deep.equal(['Your Feed']);
            // click 'Global' tab
            home.clickTab('Global Feed');
            // validate again
            expect(home.activeFeedTabText).to.deep.equal(['Global Feed']);
            // click on 'Your feed' tab
            home.clickTab('Your Feed');
            // validate 'active' tabs are correct
            expect(home.activeFeedTabText).to.deep.equal(['Your Feed']);
        });

        describe('Personal Feed', function () {
            before(function () {
                // ensure we're on the personal feed tab
                if (home.activeFeedTabText !== 'Your Feed') {
                    home.clickTab('Your Feed');
                }
            })

            it('should show most recent articles from people you follow', function () {
                expect(home.currentFeed.$$articles).to.have.length(1);
            })
        })

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

