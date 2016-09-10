import Facebook from 'facebook-node-sdk';
import Promise from 'bluebird';

export default class FacebookBot {

  constructor(config) {
    this.config   = config;
    this.facebook = Promise.promisifyAll(
      new Facebook({ appId: config.clientID, secret: config.clientSecret})
    );
  }

  async requestFeed(since, until) {
    return await this.facebook.apiAsync(
      `/${this.config.user_id}`,
      'GET',
      {fields: `feed.since(${since}).until(${until}){id,message}`}
    );
  }
}
