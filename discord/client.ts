import { Client, GatewayIntentBits, TextBasedChannel } from 'discord.js';

const config = () => {
	return {
		DISCORD_BOT_TOKEN: process.env.DISCORD_BOT_TOKEN as string,
		GITHUB_DISCORD_CHANNEL_ID: process.env.GITHUB_DISCORD_CHANNEL_ID as string,
	};
};

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

export const clientPromise = async () => {
	await client.login(config().DISCORD_BOT_TOKEN);

	return client;
};

export const sendMessageToGithubChannel = async (message: string) => {
	const client = await clientPromise();
	const channel = (await client.channels.fetch(
		config().GITHUB_DISCORD_CHANNEL_ID,
	)) as TextBasedChannel;

	return await channel.send(message);
};

export const closeConnection = () => {};
