import SlackUtil from './models/SlackUtil';

export default function applyListenWords (bot) {
    // Set active admin status with password
    bot.addWordsListener([
        /* Does this make the abstraction to env var useless? */
        process.env.ACTIVE_ADMIN_PASSWORD 
        ],    
        'direct_message', (me, message) =>
        {
            bot.setAdminStatusActive(message)

            me.reply(message, ':robot_face: Added you to active admin list :zap:')
        }
    )

    // Set inactive admin status
    bot.addWordsListener(['SILENCE', 'silence', 'Silence'],
        'direct_message', (me, message) => 
        {
            bot.setAdminStatusInactive(message)

            me.reply(message, ':robot_face: Removed you from active admin list :zap:')
        }
    )

    bot.addWordsListener(['uptime', 'identify yourself', 'who are you', 'what is your name'],
        'direct_message,direct_mention,mention', (me, message) => {

            me.reply(message,
                `:robot_face: I am a bot named ${SlackUtil.slackNameStr(me.identity.name)}.` +
                `\n\nI will be answering your prayers and forwarding messages to responsible admins.\n\n`
                )

        }
    )
}