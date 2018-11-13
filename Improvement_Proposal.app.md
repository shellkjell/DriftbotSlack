## Improvement proposal for DriftbotSlack

* OOP structure with sensible strategy patterns
* Independence of which type of bot (Slack, Facebook, etc.) is run, any type of bot can answer the same inquiries and has more or less the same functionality. This is the way Botkit is intended to be used
* Adaptor to Google Calendar as to constantly show who is supposedly working right now
* A MOTD can be set by admins with the password
* The bot will eventually do panic SMS as a redundancy to the SMS itself