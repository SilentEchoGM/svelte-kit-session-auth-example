import initDB from '$lib/db';
import error from '$lib/error';
import { namedServerLog } from '$lib/utils';

const serverLog = namedServerLog('load.js');

export const get = async ({ context }) => {
	serverLog('fetching user', context);
	if (!context.authenticated)
		return {
			status: 401,
			body: {
				error: error.S94
			}
		};
	serverLog('fetching hyperbee');
	const db = await initDB();
	serverLog('looking up user', context);
	const result = await db.get(context.email);
	const user = JSON.parse(result.value);
	delete user.password;
	serverLog('user:', user);

	if (!user)
		return {
			status: 404,
			body: {
				error: error.S95
			}
		};

	return {
		status: 200,
		body: user
	};
};
