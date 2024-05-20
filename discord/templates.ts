import { EmbedBuilder } from 'discord.js';

const colorMap = {
	success: 0x22bb33,
	failed: 0xbb2124,
	warning: 0xf0ad4e,
};

type GithubActivityAction = {
	status: 'success' | 'failed' | 'warning';
	title: string;
	url: string;
	author: { name: string; iconURL: string };
	messages: string[];
};

export const createGithubActivityMessage = (action: GithubActivityAction) => {
	const { status, title, url, author, messages } = action;
	return new EmbedBuilder()
		.setColor(colorMap[status])
		.setTitle(title)
		.setURL(url)
		.setAuthor(author)
		.setDescription(messages.join('\n'));
};
