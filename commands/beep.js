module.exports = {
	name: 'beep',
	description: 'Beep lol',
	execute(message, args) {
		message.channel.send('Boop.');
	},
};