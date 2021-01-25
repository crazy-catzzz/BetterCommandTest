module.exports = {
	name: 'help',
	description: 'ask for help',
	execute(message, args) {
		message.channel.send('* but nobody came...');
	},
};