const { user1 } = require('../fixtures/users');
const Tag = require('../pageObjects/Tag.page');

describe('Tag Feed', function () {
    let articleDetails, tagName, tagPage, articleResponse;

    before(function () {

        articleDetails = {
            title: global.chance.sentence({ words: 3 }),
            description: global.chance.sentence({ words: 7 }),
            body: global.chance.paragraph({ sentences: 2 }),
            tagList: [global.chance.word({ length: 30 })]
        };

        tagName = articleDetails.tagList[0];

        // create the article we need to get the specific tag
        articleResponse = browser.call(() => {
            return global.api.createArticle(user1, articleDetails);
        });

        tagPage = new Tag(tagName);

        // load the page
        tagPage.load();
    })

    after(function () {
        browser.call(() => {
            return global.api.deleteArticle(user1, articleResponse.slug);
        });
    });

    it('should have tag tab', function () {

        browser.setNetworkConditions({
            latency: 1000,
            throughput: 450*1024
        });
        // check that we're on the tag tab
        expect(tagPage.feeds.$$activeFeedTabs[0]).toHaveText(tagName, { trim: true })
    });
    it('should load only articles for that tag', function () {
        expect(tagPage.feeds.currentFeed.$$articles).toHaveLength(1);
    });
    it('should load correct article preview details', function () {
        const firstArticleDetails = tagPage.feeds.currentFeed.articles[0].getDetails();

        expect(firstArticleDetails).toMatchObject({
            title: articleDetails.title,
            description: articleDetails.description
        });
    });
});