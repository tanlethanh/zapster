import { SSTConfig } from 'sst';
import { web } from './tools/stacks/web';
import { api } from './tools/stacks/api';

export default {
	config() {
		return {
			name: 'zapster',
			region: 'ap-south-1',
		};
	},
	stacks(app) {
		app.stack(web);
		app.stack(api);
	},
} satisfies SSTConfig;
