module.exports = {
    name: 'ping',
    aliases: [],
    description: 'ping',
    usage: '',
    cooldown: 3,
    guildOnly: true,
    permissions: '',
    args: false,
	execute(message) {
		message.channel.send('Pong.');
	},
};