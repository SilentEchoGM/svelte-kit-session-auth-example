<script>
	import { goto } from '$app/navigation';
	import { session } from '$app/stores';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	let error;

	const logout = async () => {
		error = undefined;

		try {
			const res = await fetch('/auth/logout', {
				method: 'GET'
			});
		} catch (err) {
			console.log(err);
			error = 'An error occurred';
		}
		$session.authenticated = false;
		goto('/');
	};
</script>

<h2>Logout</h2>

<button on:click={logout}>Logout</button>
