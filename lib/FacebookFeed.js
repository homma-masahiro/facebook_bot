const POST_URL_BASE = "https://www.facebook.com/adways.engineer/posts/";

export default class FacebookFeed {

  constructor(jsonFeed) {
    this.jsonFeed = jsonFeed;
  }

  json2message() {
    let post_url = `${POST_URL_BASE}${this.jsonFeed.id.split(/_/)[1]}`;
    let message  = this.jsonFeed.message;

    return `${post_url}\n${message}`;
  }
}
