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
	if ('action' in webhookEvent && webhookEvent.action === 'push') {
		console.log('handle push event', webhookEvent);
		sendEmbedToChannel(
			createGithubActivityMessage({
				title: `[${webhookEvent.repository.full_name}:${webhookEvent.branch}] new push event`,
				url: webhookEvent.repository.url,
				status: 'success',
				author: {
					name: webhookEvent.sender.name || 'Unknown',
					iconURL: webhookEvent.sender.avatar_url,
				},
				messages: [],
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
