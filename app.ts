import { Client, Message } from 'discord.js';
import { TOKEN } from './credentials';

const client = new Client({
    intents: ['GuildMessages', 'Guilds']
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user?.tag}`);
});

client.on('messageCreate', async (message: Message) => {
    if (message.author.bot || !message.guild) {
        return;
    }

    const member = await message.guild.members.fetch(message.author.id);
    const userRoles = member.roles.cache.map(role => role.name).filter(role => role !== "@everyone");

    if (message.reference) {
        const reference = await message.fetchReference().catch();
        if (reference.author.id !== client.user?.id) {
            message.reply("standard message");
            return
        }

        if (userRoles.includes("QA")) {
            message.reply("Thanks for the response, QA person!");
        } else {
            message.reply("Who the heck do you think you are!?!?!?");
        }
    }
});

client.login(TOKEN);