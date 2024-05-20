config({ path: '../.env' });

import { config } from 'dotenv';
import { sendMessageToGithubChannel } from './client';

sendMessageToGithubChannel('Hi! I am Zapster');
