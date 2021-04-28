import stringHash from 'string-hash';

import * as cookie from 'cookie';

import { v4 as uuidv4 } from 'uuid';

import initDB from '$lib/db';
import error from '$lib/error';
import message from '$lib/message';
import { namedServerLog } from '$lib/utils';

const serverLog = namedServerLog('register.js');

export const post = async (request) => {
	serverLog('register', request);
	const db = await initDB();
	const { body } = request;
	const user = await db.get(body.email);
	serverLog('db response (register)', user);
	if (user)
		return {
			status: 409,
			body: {
				error: error.S92
			}
		};

	try {
		await db.put(
			body.email,
			JSON.stringify({
				email: body.email,
				password: stringHash(body.password),
				username: body.username
			})
		);

		const cookieId = uuidv4();
		await db.put(cookieId, body.email);

		serverLog(`registered user ${body.email} and session created.`);

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
	} catch (err) {
		console.error(err, request);
		return {
			status: 500,
			body: {
				error: error.S91,
				err
			}
		};
	}
};
