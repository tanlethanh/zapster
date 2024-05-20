import {
	APIEmbed,
	Client,
	GatewayIntentBits,
	JSONEncodable,
	MessageCreateOptions,
	MessagePayload,
	TextBasedChannel,
} from 'discord.js';

const config = () => ({
	DISCORD_BOT_TOKEN: process.env.DISCORD_BOT_TOKEN as string,
});

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

export const clientPromise = async () => {
	await client.login(config().DISCORD_BOT_TOKEN);

	return client;
};

export const channels = () => ({
	GITHUB: process.env.GITHUB_DISCORD_CHANNEL_ID as string,
});

export const sendToChannel = async (
	options: string | MessagePayload | MessageCreateOptions,
	channelId: string,
) => {
	const client = await clientPromise();
	const channel = (await client.channels.fetch(channelId)) as TextBasedChannel;

	return await channel.send(options);
};

export const sendEmbedToChannel = async (
	embed: JSONEncodable<APIEmbed> | APIEmbed,
	channelId: string,
) => {
	const client = await clientPromise();
	const channel = (await client.channels.fetch(channelId)) as TextBasedChannel;

	return await channel.send({ embeds: [embed] });
};
