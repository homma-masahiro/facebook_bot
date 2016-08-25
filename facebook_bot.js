import fs from 'fs';
import moment from 'moment';
import FacebookBot from './lib/FacebookBot';
import FacebookFeed from './lib/FacebookFeed';
import Slack from './lib/Slack';

async function main() {
  try {
    let config  = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

    let facebookBot = new FacebookBot(config);
    let accessToken = await facebookBot.requestAccessToken();

    let now = moment();
    let since = now.clone()
          .add(-1, 'hours')
          .minutes(0)
          .seconds(0)
          .milliseconds(0)
          .unix();
    let until = now.clone()
          .minutes(0)
          .seconds(0)
          .milliseconds(0)
          .unix();
    let response = await facebookBot.requestGourmetClubFeed(since, until);

    let messages = [];
    response.body.feed.data.forEach(jsonFeed => {
      messages.push(new FacebookFeed(jsonFeed).json2message());
    });

    new Slack(config).postMessage(messages.join('\n----------\n'));
  } catch(e) {
    console.error(e);
  }
}

main();
