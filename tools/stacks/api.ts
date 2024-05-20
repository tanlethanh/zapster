import type { StackContext } from 'sst/constructs';
import { Api, Function } from 'sst/constructs';
import { baseDomain, hostedZone } from './shared';

export const api = ({ stack }: StackContext) => {
	const github = new Function(stack, 'github', {
		handler: 'github/index.handler',
		runtime: 'nodejs20.x',
		environment: {
			GITHUB_WEBHOOKS_SECRET: process.env.GITHUB_WEBHOOKS_SECRET as string,
		},
		timeout: '5 minutes',
	});

	const domainName = `api.${baseDomain}`;
	const api = new Api(stack, 'api', {
		cors: {
			allowOrigins: ['*'],
			allowHeaders: ['Content-Type', 'Authorization'],
			allowMethods: ['GET', 'POST'],
		},
		routes: {
			'POST /github': {
				function: github,
			},
		},
		customDomain: {
			hostedZone,
			domainName,
		},
	});

	stack.addOutputs({
		url: api.url,
		domain: api.customDomainUrl,
	});
};
