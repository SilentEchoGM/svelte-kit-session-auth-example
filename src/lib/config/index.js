import * as fs from 'graceful-fs';
import { namedServerLog } from '$lib/utils';
const serverLog = namedServerLog('config/index.js');
/**
 *  @typedef {object} Config
 * @property {object} db
 */

/**
 * @type {Config}
 */
const defaultConfig = {
	db: {}
};

const configPath = 'config.json';

/**
 * initializes the default config
 * @returns {Config}
 */
const fresh = () => {
	try {
		fs.writeFileSync(configPath, JSON.stringify(defaultConfig), { encoding: 'utf-8' });
		serverLog(`Default config written to ${configPath}`, defaultConfig);
		return defaultConfig;
	} catch (err) {
		console.error(err);
	}
};

/**
 * Fetches the current config, initializes the default if none available
 * @returns {Config}
 */
const get = () => {
	try {
		const config = JSON.parse(fs.readFileSync(configPath, { encoding: 'utf-8' }));
		serverLog(`Loaded config from ${configPath}`);
		return config;
	} catch (err) {
		console.error(err);
		return fresh();
	}
};

/**
 * Merges the provided config object with the saved config state. Provided properties overwrite existing if necessary.
 * @param {Config} newConfig
 * @returns {Config}
 */
const update = (newConfig) => {
	const config = { ...get(), ...newConfig };
	try {
		fs.writeFileSync('config.json', JSON.stringify(config), { encoding: 'utf-8' });
		return config;
	} catch (err) {
		console.error(err);
	}
};

export default {
	update,
	fresh,
	get
};
