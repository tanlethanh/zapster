import type { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { verifySignature } from './secret';

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

	return {
		statusCode: 200,
		body: JSON.stringify({
			message: 'pong',
		}),
	};
};
