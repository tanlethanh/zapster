import { NextjsSite, StackContext } from 'sst/constructs';
import { baseDomain, hostedZone } from './shared';

export const web = ({ stack }: StackContext) => {
	const web = new NextjsSite(stack, 'web', {
		path: 'web',
		customDomain: {
			domainName: baseDomain,
			hostedZone,
		},
	});

	stack.addOutputs({
		url: web.url,
		customDomain: web.customDomainUrl,
	});
};
