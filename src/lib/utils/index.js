import chalk from 'chalk';
import { dateString } from './date';

export const serverLog = (string, ...args) => {
	console.log(chalk.bold(dateString() + ': ') + chalk.green(string), ...args);
};

export const namedServerLog = (name) => (string, ...args) => {
	console.log(
		chalk.bold(dateString() + ' | ' + chalk.italic(name) + ': ') + chalk.green(string),
		...args
	);
};
