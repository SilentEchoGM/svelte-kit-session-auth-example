<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	let email, password, error;

	const login = async () => {
		error = undefined;

		try {
			const res = await fetch('/auth/login', {
				method: 'POST',
				body: JSON.stringify({
					email,
					password
				})
			});

			if (res.ok) {
				dispatch('success');
			} else {
				error = 'An error occurred';
			}
		} catch (err) {
			console.log(err);
			error = 'An error occurred';
		}
	};
</script>

<h2>Login</h2>

<input type="email" bind:value={email} placeholder="email" />
<input type="password" bind:value={password} placeholder="password" />

<button on:click={login}>Login</button>
