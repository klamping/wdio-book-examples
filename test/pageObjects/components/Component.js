/*
 * This is the most basic form of a component. There isn't much to it, but the
 * point of keeping it around is to have consistency in the
 * `selector` and `container` properties.
 */

class Component {
    // 'origin' is the main element that all other selectors for that component are based upon.
    // This can be the main container element, or an input element that has a specific id
    // 'origin' can be either a selector, or a wdio element
    // The $origin element can be used to move up via xpath:
    // const $originParent = this.$origin.$('..');
    constructor (selector) {
        this.selector = selector;
    }

    get $origin () {
        return (typeof this.selector === 'string') ? $(this.selector) : this.selector;
    }
}

module.exports = Component;