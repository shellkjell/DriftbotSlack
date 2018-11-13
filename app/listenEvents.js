import SlackUtil from './models/SlackUtil';

export default function applyListenEvents (bot) {
    bot.addEventListener('rtm_close', (me) => {
        console.dir(`Lost connection to Slack. Bot should automatically reconnect.`);
    })

    // Reply to a direct mention - @bot hello
    bot.addEventListener('direct_mention', (me, message) => {
        me.reply(message, `Hello ${SlackUtil.slackNameStr(message.user)}! ` +
            `:wink:\n\nWrite me a private message if you want to pass ` +
            `something on to the admins, and know who\'s on call.`
        );
    }
    )

    // Reply to a direct message and forward to admin
    bot.addEventListener('direct_message', (me, message) => {
        if (message.user) {
            let reply = `Hello ${
                SlackUtil.slackNameStr(message.user)
            }. Active admins: ${
                bot.getActiveAdminStr()
            }. I've sent them your message :techbuddy:`

            me.say({ 
                channel: process.env.DRIFTCHANNEL_ID, 
                text: `${SlackUtil.slackNameStr(message.user)} said: "${message.text}".` 
            });

            me.reply(message, reply);
        }

        else {
            me.reply(message, `Can't see your username. Please manually contact the admin team.`)
        }
    })
}