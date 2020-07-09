const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js')

const Axios = require('axios')

class PokemonCommand extends Command {
  constructor() {
    super('pokemon', {
      aliases: ['pokemon', 'pokedex'],
      args: [
        {
          id: 'name',
          type: 'string',
        }
      ] 
    });
  }

  exec(message, args) {
    let embed = new MessageEmbed()
    
    let { name } = args

    let abilities = []
    let stats = []
    let types = []

    Axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then(response => {
      embed.setColor('#DC0A2D')
      embed.setTitle(`Pokédex: ${capitalise(response.data.name)} (#${response.data.id})`)
      embed.setThumbnail(response.data.sprites.front_default)

      response.data.types.map(x => {
        types.push(capitalise(x.type.name))
      }).join(',')

      response.data.stats.map(x => {
        stats.push(capitalise(x.stat.name + ': ' + x.base_stat))
      }).join(',')

      response.data.abilities.map(x => {
        abilities.push(capitalise(x.ability.name))
      }).join(',')

      embed.addField('Pokedex #', response.data.id, true)
      embed.addField('Height', response.data.height, true)
      embed.addField('Weight', response.data.weight, true)
      embed.addField('Abilities', abilities, true)
      embed.addField('Stats', stats, true)
      embed.addField('Type(s)', types, true)
      
      embed.setFooter(`You searched the Pokédex for ${capitalise(response.data.name)} - ID #${response.data.id}`)
    })
    .catch(error => {
      console.error(error)
      
      embed.setColor('#DC0A2D')
      embed.setTitle('Pokédex search failed!')
      embed.setDescription('This occurs when a Pokémon cannot be found.')
    })
    .then(() => message.channel.send(embed))
  }
}

capitalise = (s) => {
  return s.charAt(0).toUpperCase() + s.slice(1) 
}

module.exports = PokemonCommand;