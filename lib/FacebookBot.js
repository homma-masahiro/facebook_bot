import {remote} from 'webdriverio';
import buildUrl from 'build-url';
import request from 'request';
import Promise from 'bluebird';

const options = {
  desiredCapabilities: {
    browserName: 'phantomjs'
  }
};

const GRAPH_API_URL = 'https://graph.facebook.com';
const API_VERSION   = 'v2.7';

export default class FacebookBot {
  
  constructor(config) {
    this.config      = config;
    this.client      = remote(options).init();
    this.request     = Promise.promisifyAll(request);
    this.accessToken = undefined;
  }

  login() {
    return this.client
    .url(this.config.loginURL)
    .setValue('input[name=email]', this.config.email)
    .setValue('input[name=pass]' , this.config.password)
    .click('#loginbutton');
  }

  async requestAccessToken() {
    try {
      return this.accessToken =
        await this.login()
        .getHTML('body', false);
    } finally {
      this.client.end();
    }
  }

  async requestGourmetClubFeed(since, until) {
    if ( this.accessToken === undefined )
      await requestAccessToken();

    return await this.request.getAsync({
      url: buildUrl(GRAPH_API_URL, {
        path: [API_VERSION, this.config.user_id].join('/'),
        queryParams: {
          fields: `feed.since(${since}).until(${until}){id,message}`,
          access_token: this.accessToken
        }
      }),
      json: true
    });
  }
}
