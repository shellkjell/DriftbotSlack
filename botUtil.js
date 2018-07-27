const g_activeAdmins = {}

module.exports = function () {
    this.setAdminStatusActive = function (message) {
        if (!g_activeAdmins[message.user]) 
            g_activeAdmins[message.user] = new Admin(message.channel, message.user, true)

        else g_activeAdmins[message.user].active = true
    }

    this.setAdminStatusInactive = function (message) {
        if (!g_activeAdmins[message.user]) 
            return

        g_activeAdmins[message.user].active = false
    }

    this.formatUptime = function (uptime) {
        var unit = 'second'
        if (uptime > 60) {
            uptime = uptime / 60
            unit = 'minute'
        }
        if (uptime > 60) {
            uptime = uptime / 60
            unit = 'hour'
        }
        if (uptime != 1) {
            unit = unit + 's'
        }
    
        uptime = uptime + ' ' + unit
        return uptime
    }

    this.slackNameStr = function (name) { return `<@${name}>` }

    this.Admin = class Admin {
        constructor (channel, name, active = false) {
            this.active = active
            this.channel = channel
            this.name = name
        }
    }

    this.getAdminsByStatus = function () {
        return {
            activeAdmins: Object.keys(g_activeAdmins).filter(id => g_activeAdmins[id].active), 
            inactiveAdmins: Object.keys(g_activeAdmins).filter(id => !g_activeAdmins[id].active)
        }
    }

    this.getActiveAdminStr = function () {
        let activeAdminsString = ''
        let inactiveAdminsString = ''
    
        let {activeAdmins, inactiveAdmins} = getAdminsByStatus()
    
        for (let adm of activeAdmins) {
            activeAdminsString += `${slackNameStr(g_activeAdmins[adm].name)}, `
        }
    
        for (let adm of inactiveAdmins) {
            inactiveAdminsString += `${slackNameStr(g_activeAdmins[adm].name)}, `
        }
    
        /* Remove trailing comma. Also return inactive admins if no active ones. */
        return activeAdminsString.length === 0 ? 
            `None. Inactive: ${(inactiveAdminsString.length === 0 ? 'None' : inactiveAdminsString.substr(0, inactiveAdminsString.length - 2))}` 
            : activeAdminsString.substr(0, activeAdminsString.length - 2)
    }
}