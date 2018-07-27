require('./botUtil')()

module.exports = function (controller) {
    // Set active admin status with password
    controller.hears([
        /* Does this make the abstraction to env var useless? */
        process.env.ACTIVE_ADMIN_PASSWORD 
        ],    
        'direct_message', function(bot, message) 
        {
            setAdminStatusActive(message)

            bot.reply(message, ':robot_face: Added you to active admin list :zap:')
        }
    )

    // Set inactive admin status
    controller.hears(['SILENCE', 'silence', 'Silence'],
        'direct_message', function(bot, message) 
        {
            setAdminStatusInactive(message)

            bot.reply(message, ':robot_face: Removed you from active admin list :zap:')
        }
    )

    controller.hears(['uptime', 'identify yourself', 'who are you', 'what is your name'],
        'direct_message,direct_mention,mention', function(bot, message) {

            var hostname = os.hostname()
            var uptime = formatUptime(process.uptime())

            bot.reply(message,
                `:robot_face: I am a bot named ${slackNameStr(bot.identity.name)}.` +
                `\n\nI will be answering your prayers and forwarding messages to responsible admins.\n\n`
                )

        }
    )
}