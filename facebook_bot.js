import moment from 'moment';
import FacebookBot from './lib/FacebookBot';
import FacebookFeed from './lib/FacebookFeed';
import Slack from './lib/Slack';
import {config} from './config';

async function main() {
  try {
    let now = moment();
    let since = now.clone()
          .add(-config.repeate.interval, config.repeate.unit)
          .minutes(0)
          .seconds(0)
          .milliseconds(0)
          .unix();
    let until = now.clone()
          .minutes(0)
          .seconds(0)
          .milliseconds(0)
          .unix();

    let res = await new FacebookBot().requestFeed(since, until);

    let messages = [];
    res.feed.data.forEach(jsonFeed => {
      messages.push(new FacebookFeed(jsonFeed).json2message());
    });

    new Slack().postMessage(messages.reverse().join('\n----------\n'));
  } catch(e) {
    console.error(e);
  }
}

main();
