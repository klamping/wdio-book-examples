const Generic = require('./Generic.page');

class Home extends Generic {
    constructor () {
        super('./')
    }
    get $$feedTabs () { return $$('[data-qa-id="feed-tabs"] [data-qa-type="feed-tab"]') }
    get feedTabsText () { return this.$$feedTabs.map($tab => $tab.getText().trim()); }
}

module.exports = Home;