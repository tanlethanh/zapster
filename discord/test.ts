config({ path: '../.env' });

import { config } from 'dotenv';
import { channels, sendToChannel } from './client';
import { createGithubActivityMessage } from './templates';

sendToChannel('Hi! I am Zapster', channels().GITHUB);
sendToChannel(
	{
		embeds: [
			createGithubActivityMessage({
				title: '[peakee:main] 2 new commits',
				status: 'success',
				url: 'https://github.com/zenonian-labs/peakee/pull/2',
				author: {
					name: 'Tan Le',
					iconURL:
						'https://avatars.githubusercontent.com/u/104194494?s=400&u=8983e4b7060b9cb9e869326e6497b82db6468d8f&v=4',
				},
				messages: [
					'`87cac65`: chore: experimental dynamic size for translate box - tanlethanh',
				],
			}),
		],
	},
	channels().GITHUB,
);
