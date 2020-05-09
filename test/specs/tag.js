const expect = require('chai').expect;
const { user1 } = require('../fixtures/users');
const Tag = require('../pageObjects/Tag.page');

describe('Tag Feed', function () {
    let articleDetails, tagName, tagPage, articleResponse;

    before(function () {
        articleDetails = {
            title: chance.sentence({ words: 3 }),
            description: chance.sentence({ words: 7 }),
            body: chance.paragraph({ sentences: 2 }),
            tagList: [chance.word({ length: 30 })]
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
    })

    it('should have tag tab', function () {
        // check that we're on the tag tab
        expect(tagPage.activeFeedTabText).to.deep.equal([tagName]);
    })
    it('should load only articles for that tag', function () {
        expect(tagPage.currentFeed.$$articles).to.have.length(1);
    })
    it('should load correct article preview details', function () {
        const firstArticleDetails = tagPage.currentFeed.articles[0].getDetails();

        expect(firstArticleDetails).to.deep.include({
            title: articleDetails.title,
            description: articleDetails.description
        });
    })
})