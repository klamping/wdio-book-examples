/*
 * This is the most basic form of a component.
 * There isn't much to it, but it's a good starting point
 */

class Component {
    // 'origin' is the main element that all other selectors for that component are based upon.
    // This can be the main container element, or an input element that has a specific id
    // 'origin' can be either a selector, or a wdio element
    // The $origin element can be used to move up via xpath:
    // const $originParent = this.$origin.$('..');
    constructor (selector, options = {}) {
        this.selector = selector;
        this.options = options;
    }

    get $origin () {
        // allow selector to be a WDIO element
        return (typeof this.selector === 'string') ? $(this.selector) : this.selector;
    }
}

module.exports = Component;