const expect = require('chai').expect;
const Auth = require('../pageObjects/Auth.page');
const Editor = require('../pageObjects/Editor.page');
const { user1 } = require('../fixtures/users');

const auth = new Auth();
const editor = new Editor();

describe('Post Editor', function () {
    before(function () {
        browser.url('./login')
        auth.login(user1);
    })
    beforeEach(function () {
        browser.url('./editor')
    })
    it('should load page properly', function () {
        expect(browser.getUrl()).to.include('editor');
        expect(editor.$title.isExisting(), 'Title').to.be.true;
        expect(editor.$description.isExisting(), 'Description').to.be.true;
        expect(editor.$body.isExisting(), 'Body').to.be.true;
        expect(editor.$tags.isExisting(), 'Tags').to.be.true;
        expect(editor.$publish.isExisting(), 'Publish').to.be.true;
    })
})