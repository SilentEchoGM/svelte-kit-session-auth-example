import stringHash from 'string-hash';

import * as cookie from 'cookie';

import { v4 as uuidv4 } from 'uuid';

import initDB from '$lib/db';

import error from '$lib/error';
import { namedServerLog } from '$lib/utils';
import message from '$lib/message';

const unauthorized = {
	status: 401,
	body: {
		error: error.S93
	}
};

const serverLog = namedServerLog('login.js');

export const post = async (request) => {
	const body = JSON.parse(request.body);
	const db = await initDB();
	serverLog('fetching user', body.email);

	const result = await db.get(body.email);
	serverLog('db response', result);
	const user = JSON.parse(result.value);

	if (!user) return unauthorized;

	if (user.password !== stringHash(body.password)) return unauthorized;

	const cookieId = uuidv4();
	await db.put(cookieId, body.email);

	serverLog(`logged in user ${body.email} and session created.`);

	return {
		status: 200,
		body: {
			message: message.S51
		},
		headers: {
			'Set-Cookie': cookie.serialize('session_id', cookieId, {
				httpOnly: true,
				maxAge: 60 * 60 * 24 * 7,
				sameSite: 'lax',
				path: '/'
			})
		}
	};
};
