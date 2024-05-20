import type { Handler } from 'aws-lambda';

export const handler: Handler<Event> = async (event) => {
	console.log('handle event', event);

	return {
		statusCode: 200,
		body: JSON.stringify({
			message: 'pong',
		}),
	};
};

type Event = {
	type: 'message';
	source: 'github';
};
