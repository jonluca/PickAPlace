const BASE_URL = 'https://api.yelp.com/v3/';

class YelpClient {
    constructor(options) {
        this.appId = options.app_id;
        this.appSecret = options.app_secret;
        this.accessToken = undefined;
    }

    async getAccessToken() {
        const response = await fetch('https://api.yelp.com/oauth2/token', {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: new URLSearchParams({
                client_id: this.appId,
                client_secret: this.appSecret,
                grant_type: 'client_credentials'
            })
        });
        if (!response.ok) {
            throw new Error(`Yelp token request failed with status ${response.status}`);
        }
        const data = await response.json();
        this.accessToken = data.access_token;
        return data;
    }

    async search(params) {
        if (!this.accessToken) {
            await this.getAccessToken();
        }
        const url = new URL('businesses/search', BASE_URL);
        for (const [key, value] of Object.entries(params)) {
            url.searchParams.set(key, String(value));
        }
        const response = await fetch(url, {
            headers: {Authorization: `Bearer ${this.accessToken}`}
        });
        if (!response.ok) {
            throw new Error(`Yelp search failed with status ${response.status}`);
        }
        return response.text();
    }
}

module.exports = YelpClient;
