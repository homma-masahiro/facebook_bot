import Facebook from 'facebook-node-sdk';
import Promise from 'bluebird';
import {config} from '../config';

export default class FacebookBot {

  constructor() {
    this.config   = config.facebook;
    this.facebook = Promise.promisifyAll(
      new Facebook({
        appId:  this.config.clientID,
        secret: this.config.clientSecret
      })
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
