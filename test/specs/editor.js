const expect = require('chai').expect;
const Auth = require('../pageObjects/Auth.page');
const Editor = require('../pageObjects/Editor.page');
const { user1 } = require('../fixtures/users');

const auth = new Auth();
const editor = new Editor();

// Load Chance
const Chance = require('chance');

// Instantiate Chance so it can be used
const chance = new Chance();

describe('Post Editor', function () {
    before(function () {
        auth.load();
        auth.login(user1);
    });
    beforeEach(function () {
        editor.load();
    });
    it('should load page properly', function () {
        expect(browser.getUrl()).to.equal(editor.url.href);
        expect(editor.$title.isExisting(), 'Title').to.be.true;
        expect(editor.$description.isExisting(), 'Description').to.be.true;
        expect(editor.$body.isExisting(), 'Body').to.be.true;
        expect(editor.$tags.isExisting(), 'Tags').to.be.true;
        expect(editor.$publish.isExisting(), 'Publish').to.be.true;
    });
    it.only('should let you publish a new post', function () {
        const articleDetails = {
            title: chance.sentence({ words: 3 }),
            description: chance.sentence({ words: 7 }),
            body: chance.paragraph({ sentences: 4 }),
            tags: [chance.word(), chance.word()]
        };

        editor.submitArticle(articleDetails);

        $('.article-page').waitForExist()

        const slug = articleDetails.title.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');

        // expect to be on new article page
        expect(browser.getUrl()).to.include(`articles/${slug}`);

        // to avoid making a ton of articles, let's just click the delete button to clean ourselves up
        // We'll talk about a better way to clean later on
        $('button*=Delete Article').click()
    })
});