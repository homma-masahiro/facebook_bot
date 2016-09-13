import SlackApi from 'slack-api';
import {config} from '../config';

export default class Slack {
  constructor() {
    this.config = config.slack;
    this.slack = SlackApi.promisify();
  }

  async postMessage (text, channel=this.config.channel) {
    await this.slack.chat.postMessage({
      token: this.config.token,
      channel: channel,
      text: text,
      username: this.config.username,
      icon_url: this.config.icon_url
    });
  }
}
