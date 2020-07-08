require('dotenv').config()

const { AkairoClient, CommandHandler } = require('discord-akairo')

class Client extends AkairoClient {
  constructor() {
    super({
      ownerID: '471841188341743616'
    }, {
      
    })
    
    this.commandHandler = new CommandHandler(this, {
      directory: './commands/',
      prefix: '$'
    })

    this.commandHandler.loadAll()
  }
}

const client = new Client()

client.login(process.env.TOKEN)