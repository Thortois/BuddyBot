const fs = require('fs');
const Discord = require('discord.js');
const { prefix } = require('../config.json');

module.exports = (client) => {
    var commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

    for (var file of commandFiles) {
        const command = require(`../commands/${file}`);
        client.commands.set(command.name, command);
    }   

    const cooldowns = new Discord.Collection();

    client.on('message', (message) => {
        if (!message.content.startsWith(prefix) || message.author.bot) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        if (command.guildOnly && message.channel.type === 'dm') {
            return message.reply('I can\'t execute that command inside DMs!');
        }
        
        
        if (command.permissions) {
            const authorPerms = message.channel.permissionsFor(message.author);
            if (!authorPerms || !authorPerms.has(command.permissions)) {
                let reason = 'You do not have permission to use this';
                return ErrorEmbed(reason);
            }
        }

        if (command.args && !args.length) {
            let reason = `You didn't provide any arguments, ${message.author}!`;

            if (command.usage) {
                reason += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
            }
            return ErrorEmbed(reason);
        }

        if (!cooldowns.has(command.name)) {
            cooldowns.set(command.name, new Discord.Collection());
        }

        const now = Date.now();
        const timestamps = cooldowns.get(command.name);
        const cooldownAmount = (command.cooldown || 3) * 1000;

        if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                return ErrorEmbed(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
            }
        }

        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

        
        try {
            command.execute(message, args);
        } catch (error) {
            console.error(error);
            ErrorEmbed('There was an error trying to execute that command!');
        }
        
        function ErrorEmbed(description) {
            const errorEmbed = new Discord.MessageEmbed()
                .setAuthor(`Error!`, ("https://cdn.discordapp.com/attachments/447558366076731394/447839283437371392/false-2061131_960_720.png"))
                .setColor(`#ff0000`)
                .setTimestamp()
                .setDescription(description)
        
            message.channel.send(errorEmbed)
        }
})

};
