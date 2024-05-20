import {
	channels,
	createGithubActivityMessage,
	sendEmbedToChannel,
} from '@zapster/discord';
import type { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { verifySignature } from './secret';
import { WebhookEvent } from '@octokit/webhooks-types';

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
	const signature = event.headers['x-hub-signature-256'];
	if (!signature || !event.body) {
		return {
			statusCode: 400,
			body: JSON.stringify({
				message: 'invalid request, require signature and body',
			}),
		};
	}

	if (!verifySignature(signature, event.body)) {
		return {
			statusCode: 400,
			body: JSON.stringify({
				message: 'invalid request, can not verify',
			}),
		};
	}

	const webhookEvent = JSON.parse(event.body) as unknown as WebhookEvent;
	console.log('handle event', webhookEvent);

	if ('pusher' in webhookEvent) {
		const refs = webhookEvent.ref.split('/');
		const branch = refs[refs.length - 1];
		const commitsCount = webhookEvent.commits.length;
		await sendEmbedToChannel(
			createGithubActivityMessage({
				title: `[${webhookEvent.repository.name}:${branch}] ${webhookEvent.forced ? ' FORCED' : ''} ${commitsCount} new ${commitsCount > 1 ? 'commits' : 'commit'}`,
				url: webhookEvent.compare,
				status: webhookEvent.forced ? 'warning' : 'success',
				author: {
					name: webhookEvent.sender.name || webhookEvent.pusher.name,
					iconURL: webhookEvent.sender.avatar_url,
					url: webhookEvent.sender.html_url,
				},
				messages: webhookEvent.commits.map((c) => {
					return `[${c.id.slice(0, 7)}](${c.url}) ${c.message} - ${c.author.username || c.author.name}`;
				}),
			}),
			channels().GITHUB,
		);
	}

	return {
		statusCode: 200,
		body: JSON.stringify({
			message: 'pong',
		}),
	};
};
