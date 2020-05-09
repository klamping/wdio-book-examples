const got = require('got');

class Api {
    constructor (prefixUrl) {
        this.client = got.extend({
            prefixUrl,
            responseType: 'json'
        })
    }

    getAuthToken ({email, password}) {
        return this.client
            .post('/users/login', {
                json: { user: {email, password} }
            })
            .then(response => response.body.user.token);
    }

    async createArticle(user, details) {
        const token = await this.getAuthToken(user);
        const response = await this.client
            .post(
                'articles',
                {
                    json : {
                        article: details
                    },
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                }
            );
        return response.body.article;
    }

    async deleteArticle(user, slug) {
        const token = await this.getAuthToken(user);
        return this.client.delete(`articles/${slug}`, { headers: { 'Authorization': `Token ${token}` }});
    }
}

module.exports = Api;