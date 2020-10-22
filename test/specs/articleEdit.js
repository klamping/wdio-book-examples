const Auth = require('../pageObjects/Auth.page');
const Editor = require('../pageObjects/Editor.page');
const Article = require('../pageObjects/Article.page');
const { user1 } = require('../fixtures/users');

const auth = new Auth();
const editor = new Editor();
const article = new Article();

describe('Existing Article Editor', function () {
    let articleDetails;

    before(function () {
        auth.login(user1);

        // create an article for editing
        editor.load();

        articleDetails = {
            title: global.chance.sentence({ words: 1 }),
            description: global.chance.sentence({ words: 2 }),
            body: global.chance.paragraph({ sentences: 1 }),
            tags: [global.chance.word(), global.chance.word()]
        };

        editor.submitArticle(articleDetails);
        article.waitForLoad();

        article.$edit.click();
        editor.$title.waitForDisplayed();
    });

    it('should populate fields with article details', function () {
        expect(browser).toHaveUrl('editor', { containing: true });
        expect(editor.$title).toHaveValue(articleDetails.title);
        expect(editor.$description).toHaveValue(articleDetails.description);
        expect(editor.$body).toHaveValue(articleDetails.body);
        expect(editor.tagsListItems).toEqual(articleDetails.tags);
    });

    it('should update article after editing', function () {
        const updatedDetails = {
            title: global.chance.sentence({ words: 1 }),
            description: global.chance.sentence({ words: 2 }),
            body: global.chance.paragraph({ sentences: 1 }),
            tags: [] // don't add any new tags
        };

        editor.submitArticle(updatedDetails);

        article.waitForLoad();

        expect(article.$title).toHaveText(updatedDetails.title);
        expect(article.$body).toHaveText(updatedDetails.body);

        // tags should be same since we didn't change them
        expect(article.tags).toEqual(articleDetails.tags);
    });
});


