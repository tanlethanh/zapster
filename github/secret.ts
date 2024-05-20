import * as crypto from 'crypto';

const GITHUB_WEBHOOKS_SECRET: string = process.env
	.GITHUB_WEBHOOKS_SECRET as string;

export const verifySignature = (sig: string, body: string) => {
	const signature = crypto
		.createHmac('sha256', GITHUB_WEBHOOKS_SECRET)
		.update(body)
		.digest('hex');
	const trusted = Buffer.from(`sha256=${signature}`, 'ascii');
	const untrusted = Buffer.from(sig, 'ascii');

	return crypto.timingSafeEqual(trusted, untrusted);
};
