const expect = require('chai').expect;
const Auth = require('../pageObjects/Auth.page');
const Editor = require('../pageObjects/Editor.page');
const Article = require('../pageObjects/Article.page');
const { user1 } = require('../fixtures/users');

const auth = new Auth();
const editor = new Editor();
const article = new Article();

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
    it('should let you publish a new post', function () {
        const articleDetails = {
            title: chance.sentence({ words: 3 }),
            description: chance.sentence({ words: 7 }),
            body: chance.paragraph({ sentences: 4 }),
            tags: [chance.word(), chance.word()]
        };

        editor.submitArticle(articleDetails);

        article.waitForLoad();

        expect(article.$title.getText(), 'Title').to.equal(articleDetails.title);
        expect(article.$body.getText(), 'Body').to.equal(articleDetails.body);

        const tags = article.$$tags.map($tag => {
          return $tag.getText();
        });
        expect(tags).to.deep.equal(articleDetails.tags);

        // to avoid making a ton of articles, let's just click the delete button to clean ourselves up
        // We'll talk about a better way to clean later on
        article.$delete.click()
    });
});