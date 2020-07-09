const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js')

class DiceRoleCommand extends Command {
  constructor() {
    super('diceroll', {
      aliases: ['diceroll'],
      args: [
        {
          id: 'number',
          type: 'number',
        }
      ]
    });
  }
  
  exec(message, args) {
    let embed = new MessageEmbed()
    
    let { number } = args

    if(!number) {
      number = generateNumber()
      embed.setFooter(`You didn't select a number, so we rolled for you! You rolled a ${number}.`)
    }

    if(number > 6) {
      embed.setColor('#e74c3c')
      embed.setTitle('That\'s obsurd!')
      embed.setDescription('Come on, you are never gonna win like that. Try rolling a number between 1 - 6.')
      return message.channel.send(embed)
    }

    let random = generateNumber()

    if(number == random) {
      embed.setColor('#2ecc71')
      embed.setTitle('YOU WON!')
      embed.setDescription(`You rolled ${number} and we rolled the same! Congratulations!`)
    } else {
      embed.setColor('#e74c3c')
      embed.setTitle('YOU LOSE!')
      embed.setDescription(`You rolled ${number}, but we rolled a ${random}. Better luck next time, gambler.`)
    }

    message.channel.send(embed)
  }
}

generateNumber = () => {
  return Math.floor(Math.random() * 6) + 1
}

module.exports = DiceRoleCommand;