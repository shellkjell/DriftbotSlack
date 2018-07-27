/** 
 * @author Simon Haak <simon@haak-it.se, simon.haak@techbuddy.se>
 * @version 1.0.1
 * 
 */

if (!process.env.TOKEN || !process.env.ACTIVE_ADMIN_PASSWORD || !process.env.DRIFTCHANNEL_ID) {
    console.log('Error: Specify slack bot token as TOKEN, desired password as ACTIVE_ADMIN_PASSWORD and DRIFTCHANNEL_ID in the environment please.')
    process.exit(1)
}

var Botkit = require('botkit')
var os = require('os')

var controller = Botkit.slackbot({
    debug: false,
    require_delivery: true
})

var bot = controller.spawn({
    token: process.env.TOKEN
}).startRTM()

require('./listenEvents')(controller)
require('./listenWords')(controller)
