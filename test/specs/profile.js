const { user1 } = require('../fixtures/users');
const Profile = require('../pageObjects/Profile.page');

describe('User Profile Page', function () {
    let profile, profileResponse, articleDetails;

    before(function () {
        profile = {
            email: `test+${Date.now()}@learnwebdriverio.com`,
            password: 'testwdio',
            username: chance.word({ length: 15 })
        };

        // create the user/profile we need to for our test
        profileResponse = browser.call(() => {
            return global.api.createProfile(profile);
        });

        // create a new article for the new user
        articleDetails = {
            title: chance.sentence({ words: 3 }),
            description: chance.sentence({ words: 7 }),
            body: chance.paragraph({ sentences: 2 })
        };
        // create the article we need to get the specific tag
        articleResponse = browser.call(() => {
            return global.api.createArticle(profile, articleDetails);
        });

        browser.loginViaApi(user1);

        profilePage = new Profile(profile.username);

        // load the page
        profilePage.load();
    });

    after(function () {
        browser.call(() => {
            return global.api.deleteArticle(profile, articleResponse.slug);
        });
    });

    it('should show username at top of the page', function () {
        expect(profilePage.$username).toHaveText(profile.username);
    });

    it('should allow you to follow and unfollow the user if you are logged in', function () {
        expect(profilePage.$followToggle).toHaveText(`Follow ${profile.username}`, { trim: true });

        profilePage.$followToggle.click();

        expect(profilePage.$followToggle).toHaveText(`Unfollow ${profile.username}`, { trim: true });

        profilePage.$followToggle.click();

        expect(profilePage.$followToggle).toHaveText(`Follow ${profile.username}`, { trim: true });
    });

    it('should show "My Articles" and "Favorited Articles" tabs with correct content', function () {
        // check that the tabs are correct
        expect(profilePage.feeds.feedTabsText).toEqual(['My Articles', 'Favorited Articles']);
        expect(profilePage.feeds.activeFeedTabText).toEqual(['My Articles']);

        // // check that the content for the 'My Articles' tab is correct
        expect(profilePage.feeds.currentFeed.$$articles).toHaveChildren(1);

        const articleDetails = profilePage.feeds.currentFeed.articles[0].getDetails();

        // format created date to format of "August 1, 2020"
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const createdDate = new Date(articleResponse.createdAt);
        const formattedDate = `${months[createdDate.getMonth()]} ${createdDate.getDate()}, ${createdDate.getFullYear()}`;

        expect(articleDetails.author).toEqual(profile.username);
        expect(articleDetails.date).toEqual(formattedDate);
        expect(articleDetails.title).toEqual(articleResponse.title);
        expect(articleDetails.tags).toEqual(articleResponse.tagList);

        // switch tabs and run again
        profilePage.feeds.clickTab('Favorited Articles');

        expect(profilePage.feeds.currentFeed.$$articles).toHaveLength(0);
        expect(profilePage.feeds.currentFeed.$noArticlesText).toBeExisting();
    });
});