const Discord = require('discord.js');

module.exports = {
    name: 'kick',
    aliases: [],
    description: 'kick a user',
    usage: '<user> <reason>',
    cooldown: 0,
    guildOnly: true,
    permissions: 'KICK_MEMBERS',
    args: true,
    execute(message, args) {
        let mention = message.mentions.users.first()
        let user = message.guild.member(mention);
        user.kick().then(() => {
            var kicked = new Discord.MessageEmbed() 
                .setAuthor(`Success!`, ("https://cdn.discordapp.com/attachments/447558366076731394/448089730073231360/unknown.png"))
                .setColor(`#15ff00`)
                .setTimestamp()
                .setDescription(`Kick successfull!`)
            const channel = message.guild.channels.cache.get('794994969017319494');    
            channel.send(kicked);
        });
    },
}