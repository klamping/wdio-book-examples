const Component = require('./Component');

class Feed extends Component {
    get $$articles () { return this.$origin.$$('[data-qa-type="article-preview"]') }
    get $articleLoadingIndicator () { return this.$origin.$('[data-qa-id="article-loading-indicator"]') }
    waitForLoad () {
        this.$articleLoadingIndicator.waitForExist(undefined, true);
    }
}

module.exports = Feed;