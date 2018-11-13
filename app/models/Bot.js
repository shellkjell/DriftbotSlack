import SlackUtil from './SlackUtil';
import Admin from './Admin';

import Botkit from 'botkit';

export default class Bot {
  constructor() {
    this._activeAdmins = {};

    this._controller = Botkit.slackbot({      
      debug: false,
      require_delivery: true
    });

    this._slackBot = this._controller.spawn({
      token: process.env.TOKEN,
      retry: true
    }).startRTM();
  }

  setAdminStatusActive(messageObj) {
    if (!this._activeAdmins[messageObj.user])
      this._activeAdmins[messageObj.user] = new Admin(messageObj.channel, messageObj.user, true);

    else this._activeAdmins[messageObj.user].active = true;
  }

  setAdminStatusInactive(messageObj) {
    if (this._activeAdmins[messageObj.user])
      this._activeAdmins[messageObj.user].active = false;
  }

  getAdminsByStatus() {
    return {
      activeAdmins: Object.keys(this._activeAdmins).filter(id => this._activeAdmins[id].active),
      inactiveAdmins: Object.keys(this._activeAdmins).filter(id => !this._activeAdmins[id].active)
    };
  }

  getActiveAdminStr() {
    let activeAdminsString = '';
    let inactiveAdminsString = '';

    const { activeAdmins, inactiveAdmins } = this.getAdminsByStatus();

    for (let adm of activeAdmins) {
      activeAdminsString += `${SlackUtil.slackNameStr(this._activeAdmins[adm].name)}, `;
    }

    for (let adm of inactiveAdmins) {
      inactiveAdminsString += `${SlackUtil.slackNameStr(this._activeAdmins[adm].name)}, `;
    }

    /* Remove trailing comma. Also return inactive admins if no active ones. */
    return activeAdminsString.length === 0 ?
      `None. Inactive: ${(inactiveAdminsString.length === 0 ? 'None' : inactiveAdminsString.substr(0, inactiveAdminsString.length - 2))}`
      : activeAdminsString.substr(0, activeAdminsString.length - 2);
  }

  addEventListener (eventsString, handler) {
    this._controller.on(eventsString, handler);
  }

  addWordsListener (wordsArray, typeMessage, handler) {
    this._controller.hears(wordsArray, typeMessage, handler);
  }
}