const expect = require('chai').expect;
const Auth = require('../pageObjects/Auth.page');
const Editor = require('../pageObjects/Editor.page');
const Article = require('../pageObjects/Article.page');
const { user1 } = require('../fixtures/users');

const auth = new Auth();
const editor = new Editor();
const article = new Article();

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
            title: global.chance.sentence({ words: 3 }),
            description: global.chance.sentence({ words: 7 }),
            body: global.chance.paragraph({ sentences: 4 }),
            tags: [global.chance.word(), global.chance.word()]
        };

        editor.submitArticle(articleDetails);

        article.waitForLoad();

        expect(article.$title.getText(), 'Title').to.equal(articleDetails.title);
        expect(article.$body.getText(), 'Body').to.equal(articleDetails.body);
        expect(article.tags, 'Tags').to.deep.equal(articleDetails.tags);

        // to avoid making a ton of articles, let's just click the delete button to clean ourselves up
        // We'll talk about a better way to clean later on
        article.$delete.click()
    });

    describe('"Unsaved Changes" alerts', function () {
        beforeEach(function () {
            editor.$title.setValue('Unsaved Change');
        });

        it('should alert you when using browser navigation', function () {
            // try refreshing the page
            browser.refresh();

            // validate alert is showing
            expect(() => browser.acceptAlert()).to.not.throw();
        });

        it('should warn you when trying to change URL', function () {
            // try going to the homepage
            $('=Home').click();

            const alertText = browser.getAlertText();

            expect(alertText).to.contain('Do you really want to leave? You have unsaved changes!');

            // accept the alert to avoid it from preventing further tests from executing
            browser.acceptAlert();
        });
    });
});


