import { SSTConfig } from 'sst';
import { web } from './tools/stacks/web';

export default {
	config() {
		return {
			name: 'zapster',
			region: 'ap-south-1',
		};
	},
	stacks(app) {
		app.stack(web);
	},
} satisfies SSTConfig;
