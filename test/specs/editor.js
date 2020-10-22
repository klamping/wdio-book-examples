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
        expect(browser).toHaveUrl(editor.url.href);
        expect(editor.$title).toExist();
        expect(editor.$description).toExist();
        expect(editor.$body).toExist();
        expect(editor.$tags).toExist();
        expect(editor.$publish).toExist();
    });

    it('should let you publish a new post', function () {
        const articleDetails = {
            title: global.chance.sentence({ words: 3 }),
            description: global.chance.sentence({ words: 7 }),
            body: global.chance.paragraph({ sentences: 2 }),
            tags: [global.chance.word(), global.chance.word()]
        };

        editor.submitArticle(articleDetails);

        expect(article.$title).toHaveText(articleDetails.title);
        expect(article.$body).toHaveText(articleDetails.body);
        expect(article.tags).toEqual(articleDetails.tags);

        // to avoid making a ton of articles, let's just click the delete button to clean ourselves up
        // We'll talk about a better way to clean later on
        article.$delete.click();
    });

    describe('"Unsaved Changes" alerts', function () {
        beforeEach(function () {
            editor.$title.setValue('Unsaved Change');
        });

        it('should alert you when using browser navigation', function () {
            // try refreshing the page
            browser.refresh();

            // validate alert is showing
            expect(() => browser.acceptAlert()).not.toThrow();
        });

        it('should warn you when trying to change URL', function () {
            // try going to the homepage
            $('=Home').click();

            const alertText = browser.getAlertText();

            expect(alertText).toEqual('Do you really want to leave? You have unsaved changes!');

            // accept the alert to avoid it from preventing further tests from executing
            browser.acceptAlert();
        });
    });
});


