const { Command } = require('discord-akairo')
const { MessageEmbed } = require('discord.js')

class ServerCommand extends Command {
  constructor() {
    super('server', {
      aliases: ['server'] 
    });
  }
  
  exec(message) {
    let embed = new MessageEmbed()
    embed.setColor('#00FFFF')
    embed.setTitle(message.guild.name)
    embed.addField('Member Count', message.guild.memberCount, true)

    return message.channel.send(embed)
  }
}

module.exports = ServerCommand;