import { NextjsSite, StackContext } from 'sst/constructs';

export const web = ({ stack }: StackContext) => {
	const web = new NextjsSite(stack, 'web', {
		path: 'web',
		customDomain: {
			domainName: 'zapster.zenonian.com',
			hostedZone: 'zenonian.com',
		},
	});

	stack.addOutputs({
		url: web.url,
		customDomain: web.customDomainUrl,
	});
};
