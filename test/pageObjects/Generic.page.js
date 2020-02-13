const { URL } = require('url');

class Generic {
    constructor (path) {
        this.path = path;

        // store the url by combining specific page path with WDIO base url
        // using the NodeJS URL utility
        this.url = new URL(path, browser.options.baseUrl);
    }
    load() {
        browser.url(this.path);
    }
    get $siteHeader () { return $('[data-qa-id="site-header"]'); }
    get $siteNav () { return $('[data-qa-id="site-nav"]'); }
    get $siteFooter () { return $('[data-qa-id="site-footer"]'); }
}

module.exports = Generic;