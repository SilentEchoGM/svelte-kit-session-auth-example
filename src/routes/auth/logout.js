import message from '$lib/message';
import { namedServerLog } from '$lib/utils';
import * as cookie from 'cookie';

import initDB from '$lib/db';

const serverLog = namedServerLog('logout.js');

export const get = async ({ context, headers }) => {
	serverLog('logout request', context, headers);

	if (context.authenticated) {
		const db = await initDB();
		serverLog('fetched db');
		const cookies = cookie.parse(headers.cookie || '');
		serverLog('cookies', cookies);
		db.put(cookies.session_id, null);

		return {
			status: 302,
			redirect: '/',
			headers: {
				'Set-Cookie': cookie.serialize('session_id', cookies.session_id, {
					httpOnly: true,
					maxAge: 0,
					sameSite: 'lax',
					path: '/'
				})
			},
			body: {
				message: message.S53
			}
		};
	}
};
