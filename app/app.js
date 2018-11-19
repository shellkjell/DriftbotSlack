/** 
 * @author Simon Haak <simon@haak-it.se, simon.haak@techbuddy.se>
 * @version 1.0.1
 * 
 */

if (!process.env.TOKEN || !process.env.ACTIVE_ADMIN_PASSWORD || !process.env.DRIFTCHANNEL_ID) {
    console.log('Error: Specify slack bot token as TOKEN, desired password as ACTIVE_ADMIN_PASSWORD and DRIFTCHANNEL_ID in the environment please.')
    process.exit(1)
}

import Bot from './models/Bot';

const bot = new Bot();

import applyListenEvents from './listenEvents';
import applyListenWords from './listenWords';

applyListenEvents(bot);
applyListenWords(bot);