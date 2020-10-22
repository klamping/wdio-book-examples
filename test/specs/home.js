const Home = require('../pageObjects/Home.page');
const Auth = require('../pageObjects/Auth.page');
const { user1 } = require('../fixtures/users');

const home = new Home();
const auth = new Auth();

describe('Homepage', function () {
    describe('Logged In', function () {
        before(function () {
            browser.loginViaApi(user1);

            home.load();
        });

        it('should show both feed tabs', function () {
            expect(home.feeds.feedTabsText).toEqual(['Your Feed', 'Global Feed']);
        });

        it('should default to showing the global feed', function () {
            // get all tabs with an 'active' class, check that only one returns with correct text
            expect(home.feeds.activeFeedTabText).toEqual(['Global Feed']);
        });

        it('should let you switch between global and personal feeds', function () {
            // click on 'Your feed' tab
            home.feeds.clickTab('Your Feed');
            // validate 'active' tabs are correct
            expect(home.feeds.activeFeedTabText).toEqual(['Your Feed']);
            // click 'Global' tab
            home.feeds.clickTab('Global Feed');
            // validate again
            expect(home.feeds.activeFeedTabText).toEqual(['Global Feed']);
            // click on 'Your feed' tab
            home.feeds.clickTab('Your Feed');
            // validate 'active' tabs are correct
            expect(home.feeds.activeFeedTabText).toEqual(['Your Feed']);
        });

        describe('Personal Feed', function () {
            before(function () {
                // ensure we're on the personal feed tab
                if (home.feeds.activeFeedTabText !== 'Your Feed') {
                    home.feeds.clickTab('Your Feed');
                }
            });

            it.only('should show most recent articles from people you follow', function () {
                expect(home.feeds.currentFeed.$$articles).toHaveChildren(1);
            });

            it('should show most recent article first', function () {
                const firstArticleDetails = home.feeds.currentFeed.articles[0].getDetails();
                expect(firstArticleDetails).toMatchObject({
                    author: 'singlearticleuser',
                    'date': 'May 1, 2020',
                    title: 'An Article',
                    description: 'A Single Article',
                    tags: []
                })
            });
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
            expect(home.$siteHeader).toBeExisting();
            expect(home.$siteFooter).toBeExisting();
            expect(home.$siteNav).toBeExisting();
        });

        it('should only show the global feed tab', function () {
            expect(home.feeds.feedTabsText).toEqual(['Global Feed']);
        });

        it('should show "Popular Tags"', function () {
            // get the tags that should exist from the API
            const apiTags = browser.call(() => {
                return global.api.getTags();
            });

            expect(home.popularTags).toEqual(apiTags);
        });
    });
});
