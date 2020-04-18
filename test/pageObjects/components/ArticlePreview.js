const Component = require('./Component');

class ArticlePreview extends Component {
    get $author () { return this.$origin.$('[data-qa-type="author-name"]') }
    get $date () { return this.$origin.$('[data-qa-type="article-date"]') }
    get $title () { return this.$origin.$('[data-qa-type="preview-title"]') }
    get $description () { return this.$origin.$('[data-qa-type="preview-description"]') }
    get $readMoreLink () { return this.$origin.$('[data-qa-type="preview-link"]') }
    get $favorite () { return this.$origin.$('[data-qa-type="article-favorite"]') }
    get $$tags () { return this.$origin.$$('[data-qa-type="tag-list"] li') }

    getDetails() {
        // this is important, because `getText` will return an empty string if the article preview is outside the browser's viewport
        this.$origin.scrollIntoView(true);
        return {
            author: this.$author.getText().trim(),
            date: this.$date.getText().trim(),
            title: this.$title.getText().trim(),
            description: this.$description.getText().trim(),
            tags: this.$$tags.map($tag => $tag.getText().trim())
        }
    }
}

module.exports = ArticlePreview;