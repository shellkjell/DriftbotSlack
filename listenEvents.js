require('./botUtil')()

let reconnectIntervalID = undefined
let amtRetries = 0

let reconnect = function (bot) {
    reconnectIntervalID = setInterval(() => {
        console.dir(`Retrying (${++amtRetries})`)

        bot.startRTM((e, bot, payload) => {
            if (!e) {
                console.dir('Successfully reconnected.')
                clearInterval(reconnectIntervalID)
                amtRetries = 0
            } else {
                console.dir('Error reconnecting.. Trying again in 5s.')
                console.dir(e)
            }
        })
    }, 5e3)
}

module.exports = function (controller) {
    controller.on('rtm_close', function (bot) {
        console.dir(`Lost connection to Slack.`)
        reconnect(bot)
    })

    // Reply to a direct mention - @bot hello
    controller.on('direct_mention', function(bot,message) {
        bot.reply(message, `Hello ${slackNameStr(message.user)}! ` + 
            `:wink:\n\nWrite me a private message if you want to pass ` +
            `something on to the admins, and know who\'s on call.`
        )}
    )

    // Reply to a direct message and forward to admin
    controller.on('direct_message', function(bot,message) {
        if (message.user) {
            let reply = `Hello ${
                slackNameStr(message.user)
            }. Active admins: ${
                getActiveAdminStr()
            }. I've sent them your message :techbuddy:`

            bot.say({channel: process.env.DRIFTCHANNEL_ID, text: `${slackNameStr(message.user)} said: "${message.text}".`})
            bot.reply(message, reply)            
        }

        else
        {
            bot.reply(message, `Can't see your username. Please manually contact the admin team.`)
        }
    })
}