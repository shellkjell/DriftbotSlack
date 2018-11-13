  /*
  * To-Do
  * 
  * Refactor this into a base class,
  * make channel and name specific only for chats with those variables
  */
  export default class Admin {
  constructor(channel, name, active = false) {
    this.active = active
    this.channel = channel
    this.name = name
  }
}