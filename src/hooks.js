import * as cookie from 'cookie';

import initDB from '$lib/db';
import { namedServerLog } from '$lib/utils';

const serverLog = namedServerLog('hooks.js');

export const getContext = async ({ headers }) => {
	const db = await initDB();
	const cookies = cookie.parse(headers.cookie || '');

	if (!cookies.session_id) {
		serverLog('no session found');
		return {
			authenticated: false
		};
	}

	serverLog('fetching user session in hooks.js', cookies.session_id);
	const { value } = await db.get(cookies.session_id);

	serverLog('fetched user session in hooks.js', value);

	if (value) {
		serverLog('userSession:', value);
		return {
			authenticated: true,
			email: value
		};
	} else {
		serverLog('no session found:', value);
		return {
			authenticated: false
		};
	}
};

export const getSession = ({ context }) => {
	serverLog('getSession', context);
	if (!context.authenticated) {
		return {
			authenticated: context.authenticated
		};
	}

	return {
		authenticated: context.authenticated,
		email: context.email
	};
};
